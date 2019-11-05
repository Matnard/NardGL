out vec3 vNormal;

void main() {
  vec4 modelPosition = u_modelMatrix * vec4(POSITION, 1.0);
  mat4 view = u_viewMatrix;
  //view[3].xyz = vec3(0.0);
  gl_Position = u_projectionMatrix * view * modelPosition;
  vNormal = normalize(POSITION);
  gl_PointSize = 30.0;
}