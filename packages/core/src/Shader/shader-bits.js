export default {
  directional_light:
    "outColor.rgb *= dot(normalize(v_normal.xyz), u_reverseLightDirection) * 0.075;"
};
