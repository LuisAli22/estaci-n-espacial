function ObjetoGrafico(matrizModelado){

   this.webgl_position_buffer = null;
   this.webgl_normal_buffer = null;
   this.webgl_texture_coord_buffer = null;
   this.webgl_index_buffer = null;
   this.textura = null;
   this.matrizModelado=matrizModelado;
}
ObjetoGrafico.prototype.inicializarTextura = function(archivoTextura){

    var texturaAuxiliar = gl.createTexture();
    this.textura = texturaAuxiliar;
    this.textura.imagen = new Image();

    this.textura.imagen.onload = function () {
           manejarTexturaCargada();
    }
    this.textura.imagen.src = archivoTextura;
}

ObjetoGrafico.prototype.generarMipMap=function (){
   gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
   gl.bindTexture(gl.TEXTURE_2D, this.textura);
   gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.textura.imagen);
   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
   gl.generateMipmap(gl.TEXTURE_2D);
   gl.bindTexture(gl.TEXTURE_2D, null);
 }
 ObjetoGrafico.prototype.atarLosBuffer = function(position_buffer,normal_buffer,texture_coord_buffer,index_buffer){


    // Creaci�n e Inicializaci�n de los buffers a nivel de OpenGL
    this.webgl_normal_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normal_buffer), gl.STATIC_DRAW);
    this.webgl_normal_buffer.itemSize = 3;
    this.webgl_normal_buffer.numItems = normal_buffer.length / 3;

    this.webgl_texture_coord_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_texture_coord_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texture_coord_buffer), gl.STATIC_DRAW);
    this.webgl_texture_coord_buffer.itemSize = 4;
    this.webgl_texture_coord_buffer.numItems = texture_coord_buffer.length / 4;

    this.webgl_position_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(position_buffer), gl.STATIC_DRAW);
    this.webgl_position_buffer.itemSize = 3;
    this.webgl_position_buffer.numItems = position_buffer.length / 3;

    this.webgl_index_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(index_buffer), gl.STATIC_DRAW);
    this.webgl_index_buffer.itemSize = 1;
    this.webgl_index_buffer.numItems = index_buffer.length;
}

ObjetoGrafico.prototype.dibujar = function(){

    // Se configuran los buffers que alimentar�n el pipeline
    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, this.webgl_position_buffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_texture_coord_buffer);
    gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, this.webgl_texture_coord_buffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
    gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, this.webgl_normal_buffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.textura);
    gl.uniform1i(shaderProgram.samplerUniform, 0);

    gl.uniformMatrix4fv(shaderProgram.ModelMatrixUniform, false, this.matrizModelado);
    var matrizNormal = mat3.create();
    mat3.fromMat4(matrizNormal, this.matrizModelado);
    mat3.invert(matrizNormal, matrizNormal);
    mat3.transpose(matrizNormal, matrizNormal);
    gl.uniformMatrix3fv(shaderProgram.nMatrixUniform, false, matrizNormal);

    gl.bindTexture(gl.TEXTURE_2D, this.textura);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);
    gl.drawElements(gl.TRIANGLE_STRIP, this.webgl_index_buffer.numItems, gl.UNSIGNED_SHORT, 0);
}