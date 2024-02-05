
uniform vec2 uFrequency;
uniform float uTime;

varying vec2 vUv;
varying float vElevation;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  float elevation = sin(modelPosition.x * uFrequency.x - uTime) * 0.1;
  elevation += cos(modelPosition.y * uFrequency.y - uTime) * 0.1;
  
  // modelPosition.z += sin(modelPosition.x * uFrequency.x - uTime) * 0.1;
  // modelPosition.z += cos(modelPosition.y * uFrequency.y - uTime) * 0.1;

  modelPosition.z += elevation;

  // modelPosition.y += uTime;

  gl_Position = projectionMatrix * viewMatrix * modelPosition;

  vUv = uv;
  vElevation = elevation;
}