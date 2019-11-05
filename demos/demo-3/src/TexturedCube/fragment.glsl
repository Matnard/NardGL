in vec3 vNormal;
out vec4 finalColor;

void main(void){
	finalColor = texture(u_texture, vNormal);
}