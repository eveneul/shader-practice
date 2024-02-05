varying vec2 vUv;


attribute float aRandom;


void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  // modelPosition.z += sin(modelPosition.x * 2.0);
  modelPosition.z += aRandom * 0.1;
  gl_Position = projectionMatrix * viewMatrix * modelPosition;
  vUv = uv;
}