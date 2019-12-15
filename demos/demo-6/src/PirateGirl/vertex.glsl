out vec2 v_uv;
out vec4 v_normal;
out vec4 v_dlight;

void main(void){
  v_uv = UV;
  v_normal = u_worldInverseTranspose * u_modelMatrix * vec4(NORMAL, 0.0);
  v_dlight = vec4(u_reverseLightDirection, 0.0);
  vec4 modelPosition = u_modelMatrix * vec4(POSITION, 1.0);
  gl_Position = u_projectionMatrix * u_viewMatrix * modelPosition;
}