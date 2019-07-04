import {
  Matrix4,
  Scene,
  Mesh,
  SphereBufferGeometry,
  MeshBasicMaterial,
  WebGLRenderer,
  PerspectiveCamera,
  Object3D,
  Group
} from "three";
import { draw } from "./example";

const root = new Group();

(() => {
  document.body.style.margin = "0";
  document.body.style.lineHeight = "0";

  const renderer = new WebGLRenderer();
  document.body.append(renderer.domElement);

  const scene = new Scene();
  const camera = new PerspectiveCamera();
  const dolly = new Object3D();
  dolly.position.z = 3;
  dolly.add(camera);
  scene.add(dolly);

  scene.add(root);

  function render() {
    requestAnimationFrame(render);
    transform.identity();
    for (const child of root.children) {
      root.remove(child);
    }
    window.draw();
    renderer.render(scene, camera);
  }
  requestAnimationFrame(render);

  function resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    renderer.setSize(w, window.innerHeight);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener("resize", resize);
  resize();
})();

class Pool {
  private pool = [];
  get() {}
  put() {}
}

const pool = new Pool();

const transform = new Matrix4();
const temp = new Matrix4();
const material = new MeshBasicMaterial();

const api: API = {
  sphere: () => {
    const sphere = new Mesh(
      new SphereBufferGeometry(0.5, 8, 8),
      material.clone()
    );
    sphere.applyMatrix(transform);
    root.add(sphere);
  },
  translate: (x, y, z) => {
    temp.makeTranslation(x, y, z);
    transform.premultiply(temp);
  },
  fill: (color: any, g?: number, b?: number) => {
    if (typeof color === "string") {
      material.color.set(color);
    } else {
      const r = color;
      material.color.setRGB(r / 255, g / 255, b / 255);
    }
  }
};

Object.assign(window, api);

function init() {
  if (window.setup) {
    window.setup();
  } else {
    setTimeout(init);
  }
}
setTimeout(init);
