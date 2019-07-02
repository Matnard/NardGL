in vec4 color;
out vec4 finalColor;

void main(void){
	finalColor = vec4(color.rgb, 1.0);
}