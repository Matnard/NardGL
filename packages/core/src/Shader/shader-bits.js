export default {
  directional_light:
    "outColor.rgb *= dot(normalize(v_normal), u_reverseLightDirection) * 0.1;"
};
