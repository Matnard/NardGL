out vec4 finalColor;
//in vec4 color;
in vec2 vUv;

void main(void){
	//finalColor = color;//vec4(1.0, 0.0, 0.0, 1.0);
	finalColor = texture(u_texture, vUv);
}