out vec4 finalColor;
in vec3 vNormal;

void main(void){
	finalColor = texture(u_texture, vNormal);//vec4(1.0, 0.0, 0.0, 1.0);
}