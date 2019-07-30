out vec4 outColor;

void main() {
  float r = length(gl_PointCoord.xy - vec2(0.5));
  if(r > 0.5) {
    discard;
  } else {
    outColor = vec4(0.0, 0.0, 0.0, 1.0);
  }
}