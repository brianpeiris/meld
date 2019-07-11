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
    pool.reset();
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
  private pools = {};
  private immutablePools = {};
  get(key: string, generator: Function) {
    if (!this.pools[key]) {
      this.pools[key] = { used: 0, items: [] };
    }
    const pool = this.pools[key];

    pool.used++;

    if (!pool.items[pool.used - 1]) {
      pool.items.push(generator());
    }
    return pool.items[pool.used - 1];
  }
  getImmutable(key: Array<any>, generator: Function) {
    const keyStr = key.join("-");
    if (!this.immutablePools[keyStr]) {
      this.immutablePools[keyStr] = generator();
    }
    return this.immutablePools[keyStr];
  }
  reset() {
    for (const key in this.pools) {
      this.pools[key].used = 0;
    }
  }
}

const pool = new Pool();

const transform = new Matrix4();
const temp = new Matrix4();
let material;

const api: API = {
  sphere: (r: number = 0.5) => {
    const geo = pool.getImmutable(
      ["sphere", r],
      () => new SphereBufferGeometry(r, 8, 8)
    );
    const sphere = new Mesh(geo, material);
    sphere.applyMatrix(transform);
    root.add(sphere);
  },
  translate: (x, y, z) => {
    temp.makeTranslation(x, y, z);
    transform.premultiply(temp);
  },
  fill: (color: any, g?: number, b?: number) => {
    material = pool.get("material", () => new MeshBasicMaterial());
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
