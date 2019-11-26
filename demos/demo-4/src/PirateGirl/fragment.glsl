out vec4 outColor;
in vec2 v_uv;
in vec3 v_normal;

void main() {
	outColor = texture(u_texture, vec2(v_uv.x, -v_uv.y));
	#include <directional_light>
}
