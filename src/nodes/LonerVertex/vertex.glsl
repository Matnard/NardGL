#version 300 es
in vec3 a_position;
uniform float u_pointSize;

void main() {
  gl_PointSize = u_pointSize;
  gl_Position = vec4(a_position, 1.0);
}