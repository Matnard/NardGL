export default {
  directional_light: `
  float min = 0.2;
  float max = 1.0;
  float lightAmount = clamp(dot(normalize(v_normal.xyz), v_dlight.xyz),min, max);
  outColor.rgb *= lightAmount;
    `
};
