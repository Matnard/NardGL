in vec3 vNormal;
out vec4 finalColor;

void main(void){
  // finalColor = mix(texture(u_texture_day, vNormal) , vec4(1.0, 1.0, 0.0,1.0), sin(u_time *0.03)*0.5 +0.5 );
	// finalColor = texture(u_texture_night, vNormal) * texture(u_texture_day, vNormal);
	finalColor = mix(texture(u_texture_night, vNormal), texture(u_texture_day, vNormal), sin(u_time * 0.001) * 0.5 + 0.5 );
  //finalColor = mix(texture(u_texture_night, vNormal), texture(u_texture_day, vNormal), 0.9 );
}