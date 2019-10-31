import {
  Matrix4,
  Scene,
  Mesh,
  SphereBufferGeometry,
  MeshStandardMaterial,
  WebGLRenderer,
  PerspectiveCamera,
  AmbientLight,
  DirectionalLight,
  Object3D,
  Group
} from "three";
import WEBVR from "three/examples/js/vr/WebVR.js";
import { Pool } from "./Pool";

const root = new Group();
let leftController;
let rightController;

(() => {
  document.body.style.margin = "0";
  document.body.style.lineHeight = "0";

  const renderer = new WebGLRenderer({antialias: true});
  renderer.vr.enabled = true;
  document.body.append(renderer.domElement);

  rightController = renderer.vr.getController(0);
  leftController = renderer.vr.getController(1);
  setTimeout(() => {
    rightController.addEventListener("selectstart", window.rightControllerPressed)
    rightController.addEventListener("selectend", window.rightControllerReleased)
    leftController.addEventListener("selectstart", window.leftControllerPressed)
    leftController.addEventListener("selectend", window.leftControllerReleased)
  });

  document.body.append(WEBVR.createButton(renderer));

  const scene = new Scene();
  const camera = new PerspectiveCamera();

  scene.add(root);

  function render() {
    pool.reset();
    transform.identity();
    for (let i = root.children.length - 1; i > 0; i--) {
      root.remove(root.children[i]);
    }
    window.draw();
    renderer.render(scene, camera);
  }
  renderer.setAnimationLoop(render);

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

const pool = new Pool();

const transform = new Matrix4();
const temp = new Matrix4();
let material = pool.get("material", () => new MeshStandardMaterial());

const api: API = {
  sphere: (r: number = 0.5) => {
    const geo = pool.getImmutable(
      ["sphere", r],
      () => new SphereBufferGeometry(r, 8, 8)
    );
    const sphere:Mesh = pool.get("mesh", () => {
      const mesh = new Mesh()
      mesh.matrixAutoUpdate = false;
      return mesh;
    });
    sphere.geometry = geo;
    sphere.material = material;
    sphere.matrix.copy(transform);
    root.add(sphere);
  },
  translate: (x, y, z) => {
    temp.makeTranslation(x, y, z);
    transform.multiply(temp);
  },
  fill: (color: any, g?: number, b?: number) => {
    material = pool.get("material", () => new MeshStandardMaterial());
    if (typeof color === "string") {
      material.color.set(color);
    } else {
      const r = color;
      material.color.setRGB(r / 255, g / 255, b / 255);
    }
  },
  sin: x => {
    return Math.sin(x);
  },
  random: () => {
    return Math.random();
  },
  floor: x => {
    return Math.floor(x);
  },
  resetMatrix: () => {
    transform.identity();
  },
  applyMatrix: m => {
    if (m) transform.multiply(m);
  },
  leftControllerMatrix: leftController.matrix,
  rightControllerMatrix: rightController.matrix,
  lights: () => {
    root.add(pool.get("ambientlight", () => new AmbientLight()));
    root.add(pool.get("directionallight", () => {
      const light = new DirectionalLight()
      light.position.set(2, 2, 1);
      return light;
    }));
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
