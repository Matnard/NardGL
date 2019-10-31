out vec2 v_uv;

void main(void){
  v_uv = UV;
  vec4 modelPosition = u_modelMatrix * vec4(POSITION, 1.0);
  gl_Position = u_projectionMatrix * u_viewMatrix * modelPosition;
}