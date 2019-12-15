out vec4 outColor;
in vec2 v_uv;
in vec4 v_normal;
in vec4 v_dlight;

void main() {
	outColor = texture(u_texture, vec2(v_uv.x, -v_uv.y));
	#include <directional_light>
}
