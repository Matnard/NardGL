out vec4 outColor;

void main() {
  float r = length(gl_PointCoord.xy - vec2(0.5));
  if(r > 0.5) {
    discard;
  } else {
    outColor = vec4(248.0, 213.0, 104.0, 255.0) / vec4(255.0);
  }
}