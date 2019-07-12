out lowp vec4 color;	//Color to send to fragment shader.

void main() {
  color = COLOR_0;
  gl_PointSize = 15.0;
  vec4 modelViewPosition = u_modelViewMatrix * vec4(POSITION, 1.0);
  gl_Position = u_projectionMatrix * modelViewPosition;
}