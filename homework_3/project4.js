// This function takes the projection matrix, the translation, and two rotation angles (in radians) as input arguments.
// The two rotations are applied around x and y axes.
// It returns the combined 4x4 transformation matrix as an array in column-major order.
// The given projection matrix is also a 4x4 matrix stored as an array in column-major order.
// You can use the MatrixMult function defined in project4.html to multiply two 4x4 matrices in the same format.
function GetModelViewProjection( projectionMatrix, translationX, translationY, translationZ, rotationX, rotationY )
{
	// [TO-DO] Modify the code below to form the transformation matrix.
	var trans = [
		1, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 1, 0,
		translationX, translationY, translationZ, 1
	];
	var Rx = [
		1, 0, 0, 0,
		0, Math.cos(rotationX), -Math.sin(rotationX), 0,
		0, Math.sin(rotationX), Math.cos(rotationX), 0,
		0, 0, 0, 1
	];
	var Ry = [
		Math.cos(rotationY), 0, Math.sin(rotationY), 0,
		0, 1, 0, 0,
		-Math.sin(rotationY), 0, Math.cos(rotationY), 0,
		0, 0, 0, 1
	];
	var R = MatrixMult(Rx,Ry);
	var tr = MatrixMult(trans,R);
	var mvp = MatrixMult( projectionMatrix, tr);
	return mvp;
}


// [TO-DO] Complete the implementation of the following class.

class MeshDrawer
{
	// The constructor is a good place for taking care of the necessary initializations.
	constructor()
	{
		// [TO-DO] initializations
		this.numTriangles = 0;
		this.vertex_position_buffer = gl.createBuffer();
		this.text_coords_buffer = gl.createBuffer();
		this.prog = null;
		this.texture = null;
		const vs = gl.createShader(gl.VERTEX_SHADER);
		const fs = gl.createShader(gl.FRAGMENT_SHADER);;
		const vs_source = `
			attribute vec3 pos;
			attribute vec2 txc;
			uniform mat4 mvp;
			uniform bool swapYZ;
			varying vec2 texCoord;

			void main() {
				vec3 p = pos;
				if (swapYZ) {
					p = vec3(pos.x, pos.z, pos.y);
				}
				gl_Position = mvp * vec4(p, 1.0);
				texCoord = txc;
			}
			`;
		const fs_source = `
		precision mediump float;
		uniform bool useTex;
		uniform sampler2D tex;
		varying vec2 texCoord;
		
		void main() {
			if (useTex) {
				gl_FragColor = texture2D(tex, texCoord);
			} else {
				gl_FragColor = vec4(1.0, gl_FragCoord.z * gl_FragCoord.z, 0.0, 1.0);
			}
		}
		`;
		gl.shaderSource(vs, vs_source);
		gl.compileShader(vs);
		if(!gl.getShaderParameter(vs, gl.COMPILE_STATUS)){
			alert(gl.getShaderInfoLog(vs));
			gl.deleteShader(vs);
		}
		gl.shaderSource(fs, fs_source);
		gl.compileShader(fs);
		if(!gl.getShaderParameter(fs, gl.COMPILE_STATUS)){
			alert(gl.getShaderInfoLog(fs));
			gl.deleteShader(fs);
		}
		this.prog = gl.createProgram();
		gl.attachShader(this.prog, vs);
		gl.attachShader(this.prog,fs);
		gl.linkProgram(this.prog);
		if(!gl.getProgramParameter(this.prog, gl.LINK_STATUS)){
			alert(gl.getProgramInfoLog(this.prog));
		}
		gl.useProgram(this.prog);
		
		
	}
	
	// This method is called every time the user opens an OBJ file.
	// The arguments of this function is an array of 3D vertex positions
	// and an array of 2D texture coordinates.
	// Every item in these arrays is a floating point value, representing one
	// coordinate of the vertex position or texture coordinate.
	// Every three consecutive elements in the vertPos array forms one vertex
	// position and every three consecutive vertex positions form a triangle.
	// Similarly, every two consecutive elements in the texCoords array
	// form the texture coordinate of a vertex.
	// Note that this method can be called multiple times.
	setMesh( vertPos, texCoords )
	{
		// [TO-DO] Update the contents of the vertex buffer objects.
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertex_position_buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertPos), gl.STATIC_DRAW);
		gl.bindBuffer(gl.ARRAY_BUFFER, this.text_coords_buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoords), gl.STATIC_DRAW);
		this.numTriangles = vertPos.length / 3;
	}
	
	// This method is called when the user changes the state of the
	// "Swap Y-Z Axes" checkbox. 
	// The argument is a boolean that indicates if the checkbox is checked.
	swapYZ( swap )
	{
		// [TO-DO] Set the uniform parameter(s) of the vertex shader
		const loc = gl.getUniformLocation(this.prog, 'swapYZ');
		gl.useProgram(this.prog);
		gl.uniform1i(loc, swap ? 1 : 0);
	}
	
	// This method is called to draw the triangular mesh.
	// The argument is the transformation matrix, the same matrix returned
	// by the GetModelViewProjection function above.
	draw( trans )
	{
		// [TO-DO] Complete the WebGL initializations before drawing
		gl.useProgram(this.prog);
		
		var m = gl.getUniformLocation(this.prog,'mvp');
		gl.uniformMatrix4fv(m, false, trans);

		var p = gl.getAttribLocation(this.prog,'pos');
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertex_position_buffer);
		gl.vertexAttribPointer(p, 3, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(p);
		
		var t = gl.getAttribLocation(this.prog, 'txc');
		gl.bindBuffer(gl.ARRAY_BUFFER, this.text_coords_buffer);
		gl.vertexAttribPointer(t, 2, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(t);
		

		gl.drawArrays( gl.TRIANGLES, 0, this.numTriangles );
	}
	
	// This method is called to set the texture of the mesh.
	// The argument is an HTML IMG element containing the texture data.
	setTexture( img )
	{
		// [TO-DO] Bind the texture
		const mytex = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, mytex);		
		// You can set the texture image data using the following command.
		gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img );
		gl.generateMipmap(gl.TEXTURE_2D);
		// [TO-DO] Now that we have a texture, it might be a good idea to set
		// some uniform parameter(s) of the fragment shader, so that it uses the texture.
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S, gl.REPEAT);
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T, gl.REPEAT);

		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, mytex);

		var sampler = gl.getUniformLocation(this.prog, 'tex');
		gl.useProgram(this.prog);
		gl.uniform1i(sampler, 0);
		this.texture = mytex;
	}
	
	// This method is called when the user changes the state of the
	// "Show Texture" checkbox. 
	// The argument is a boolean that indicates if the checkbox is checked.
	showTexture( show )
	{
		// [TO-DO] set the uniform parameter(s) of the fragment shader to specify if it should use the texture.
		const loc = gl.getUniformLocation(this.prog, 'useTex');
		gl.useProgram(this.prog);
		gl.uniform1i(loc, show ? 1 : 0);
	}
	
}
