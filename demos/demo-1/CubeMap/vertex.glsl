out vec3 vNormal;

void main() {
  vec4 modelPosition = u_modelMatrix * vec4(POSITION, 1.0);
  gl_Position = u_projectionMatrix * u_viewMatrix * modelPosition;
  vNormal = normalize(POSITION);
  gl_PointSize = 30.0;
}