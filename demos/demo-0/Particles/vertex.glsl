void main() {
  gl_PointSize = 25.0;//u_pointSize;
  vec4 modelPosition = u_modelMatrix * vec4(POSITION, 1.0);

  gl_Position = u_projectionMatrix * u_viewMatrix * modelPosition;
  //gl_Position = modelViewPosition;
}