precision highp float;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

// 'attribute' são variáveis que vêm da geometria do objeto (posição de cada vértice, etc).
attribute vec3 position;
attribute vec2 uv;
attribute vec3 normal;

// "varying" é a forma de passar dados para o Fragment Shader.
varying vec2 vUv;
varying vec3 vNormal;

void main() {
  vUv = uv;
  vNormal = normal;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}