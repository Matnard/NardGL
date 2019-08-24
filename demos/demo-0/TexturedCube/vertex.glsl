//out vec4 color;	//Color to send to fragment shader.
//out vec3 vNormal; 
out vec2 vUv;

void main() {
  vec4 modelPosition = u_modelMatrix * vec4(POSITION, 1.0);
  gl_Position = u_projectionMatrix * u_viewMatrix * modelPosition;
  vUv = TEXCOORD_0;
}