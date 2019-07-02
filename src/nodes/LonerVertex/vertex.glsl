void main() {
  gl_PointSize = u_pointSize;
  gl_Position = vec4(a_position, 1.0);
}