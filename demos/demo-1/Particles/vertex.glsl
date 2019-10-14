void main() {
  vec4 modelPosition = u_modelMatrix * vec4(POSITION, 1.0);
  vec4 position = u_projectionMatrix * u_viewMatrix * modelPosition;
  gl_Position = position;
  gl_PointSize = 200.0/position.z;
  //gl_Position = modelViewPosition;
}