#version 300 es
precision mediump float;

in vec4 color;
out vec4 finalColor;

void main(void){
	finalColor = vec4(color.x, color.y, color.z, 1.0);
}