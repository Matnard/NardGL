void main() {
  gl_PointSize = u_pointSize;
  vec4 modelPosition = u_modelMatrix * vec4(a_position, 1.0);

  gl_Position = u_projectionMatrix * u_viewMatrix * modelPosition;
  //gl_Position = modelViewPosition;
}