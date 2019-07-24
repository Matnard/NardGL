in vec4 color;
in vec2 vUv;
out vec4 finalColor;

void main(void){

	float alpha = vUv.x + 1.0;
	finalColor = vec4(color.rgb, alpha);
}