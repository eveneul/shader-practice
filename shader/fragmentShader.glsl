varying vec2 vUv;
uniform vec3 uColor;
uniform sampler2D uTexture;
varying float vElevation;



void main() {
  vec4 tex = texture2D(uTexture, vUv);
  tex.rgb *= vElevation * 2.0 + 0.5;
  gl_FragColor = tex;
}