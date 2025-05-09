precision mediump float;

attribute vec2 position;
attribute vec2 velocity;
attribute float size;
attribute vec3 color;
attribute float opacity;
attribute float life;

uniform float time;
uniform vec2 wind;

varying float vRemainingLife;
varying vec3 vColor;
varying float vOpacity;

void main() {
  float age = mod(time, life);

  vec2 newPosition = position + velocity * age + wind * age;
  
  vRemainingLife = 1.0 - (age / life);
  vColor = color;
  vOpacity = opacity;

  float sizeFactor = sin(age);

  gl_PointSize = max(size * sizeFactor, size);
  gl_Position = vec4(newPosition, 1, 1);
}