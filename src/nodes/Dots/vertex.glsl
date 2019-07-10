void main() {
  gl_PointSize = u_pointSize;
  vec4 modelViewPosition = u_modelViewMatrix * vec4(a_position, 1.0);

  gl_Position = u_projectionMatrix * modelViewPosition;
}