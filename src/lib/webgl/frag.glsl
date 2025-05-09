precision highp float;

varying float vRemainingLife;
varying vec3 vColor;
varying float vOpacity;

void main() {
  float dist = length(gl_PointCoord - vec2(0.5));
  float alpha = smoothstep(0.6, 0.0, dist) * vRemainingLife * vOpacity;
  gl_FragColor = vec4(vColor, 1.0) *  alpha;
}