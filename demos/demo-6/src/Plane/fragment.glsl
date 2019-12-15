out vec4 outColor;
in vec2 v_uv;
in vec4 v_normal;
in vec4 v_dlight;


void main(void){
	outColor = texture(u_texture, v_uv);
	#include <directional_light>
}