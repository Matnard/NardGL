#version 300 es
in vec4 a_position;	//Standard position data.
layout(location=4) in float a_color;	//Will hold the 4th custom position of the custom position buffer.
uniform vec3 uColor[4];	//Color Array
//uniform mat4 u_matrix;
out lowp vec4 color;	//Color to send to fragment shader.

void main(void){
	gl_Position = a_position;
  // gl_Position = u_matrix * a_position;
	color = vec4(uColor[ int(a_color) ],1.0); //Using the 4th float as a color index.
}
