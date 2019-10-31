out vec4 outColor;
in vec2 v_uv;
void main() {
	outColor = texture(u_texture, vec2(v_uv.x, -v_uv.y));
}
