out lowp vec4 color;	//Color to send to fragment shader.

void main(void){
	gl_PointSize = 25.0;
	gl_Position = u_projectionMatrix * u_viewMatrix * u_modelMatrix * vec4(POSITION, 1.0);
	color = vec4(u_colors[ int(COLORS) ], 1.0); //Using the 4th float as a color index.
}