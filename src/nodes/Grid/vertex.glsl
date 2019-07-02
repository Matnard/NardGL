#version 300 es
in vec4 a_position;	//Standard position data.
in float a_colors;	//Will hold the 4th custom position of the custom position buffer.
uniform vec3 u_colors[4];	//Color Array
//uniform mat4 u_matrix;
out lowp vec4 color;	//Color to send to fragment shader.

void main(void){
	
	gl_Position = a_position;
  // gl_Position = u_matrix * a_position;
	color = vec4(u_colors[ int(a_colors) ], 1.0); //Using the 4th float as a color index.
	
}
