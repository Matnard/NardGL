out vec4 color;	//Color to send to fragment shader.
out vec3 vNormal; 
out vec2 vUv;

void main() {
  color = vec4(1.0, 0.0, 0.0, NORMAL.z);
  vNormal = NORMAL;
  vUv = TEXCOORD_0;
  gl_PointSize = 15.0;
  vec4 modelPosition = u_modelMatrix * vec4(POSITION, 1.0);
  gl_Position = u_projectionMatrix * u_viewMatrix * modelPosition;
}