
uniform vec2 uFrequency;
uniform float uTime;

varying vec2 vUv;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  modelPosition.z += sin(modelPosition.x * uFrequency.x - uTime) * 0.1;
  modelPosition.z += cos(modelPosition.y * uFrequency.y - uTime) * 0.1;
  // modelPosition.y += uTime;

  gl_Position = projectionMatrix * viewMatrix * modelPosition;

  vUv = uv;
}