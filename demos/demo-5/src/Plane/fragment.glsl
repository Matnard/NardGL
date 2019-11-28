out vec4 outColor;
//in vec4 color;
in vec2 vUv;
in vec4 v_normal;

void main(void){
	//outColor = color;//vec4(1.0, 0.0, 0.0, 1.0);
	outColor = texture(u_texture, vUv);
	#include <directional_light>
}