import * as THREE from "three";
import gsap from "gsap";
import GUI from "lil-gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import vertexShader from "./shader/vertexShader.glsl?raw";
import fragmentShader from "./shader/fragmentShader.glsl?raw";

/* Canvas */

const sizes = { width: window.innerWidth, height: window.innerHeight };
const canvas = document.querySelector("canvas");
canvas.width = sizes.width;
canvas.height = sizes.height;

/* Basic Three.js Obejct */

const gui = new GUI();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  2000
);
camera.position.set(0, 0, 5);
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(sizes.width, sizes.height);
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/* Object */

const geomatry = new THREE.PlaneGeometry(3, 3, 16, 16);
console.log("🐹 ~ geomatry:", geomatry);

const count = geomatry.attributes.position.count;
const randoms = new Float32Array(count);

for (let i = 0; i < count; i++) {
  randoms[i] = Math.random();
}

geomatry.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 1));
console.log(geomatry);
const material = new THREE.ShaderMaterial({
  side: THREE.DoubleSide,
  uniforms: {
    uFrequency: { value: new THREE.Vector2(10, 5) },
    uTime: { value: 0 },
    uColor: { value: new THREE.Color("orange") },
  },
  vertexShader,
  fragmentShader,
});

gui
  .add(material.uniforms.uFrequency.value, "x")
  .min(0)
  .max(20)
  .step(0.1)
  .name("x");
gui
  .add(material.uniforms.uFrequency.value, "y")
  .min(0)
  .max(20)
  .step(0.1)
  .name("y");

const mesh = new THREE.Mesh(geomatry, material);
scene.add(mesh);

mesh.scale.y = 2 / 3;

const clock = new THREE.Clock();

const tick = () => {
  requestAnimationFrame(tick);
  const time = clock.getElapsedTime();

  // update material
  material.uniforms.uTime.value = time;

  controls.update();
  renderer.render(scene, camera);
};

tick();
