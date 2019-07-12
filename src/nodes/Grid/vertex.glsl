out lowp vec4 color;	//Color to send to fragment shader.

void main(void){
	vec4 modelViewPosition = u_modelViewMatrix * vec4(a_position, 1.0);
	gl_Position = u_projectionMatrix * modelViewPosition;
	color = vec4(u_colors[ int(a_colors) ], 1.0); //Using the 4th float as a color index.
}