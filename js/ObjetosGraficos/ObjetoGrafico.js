function ObjetoGrafico(){

   this.webgl_position_buffer = null;
   this.webgl_normal_buffer = null;
   this.webgl_tangente_buffer = null;
   this.webgl_binormal_buffer = null;
   this.webgl_texture_coord_buffer = null;
   this.webgl_index_buffer = null;
   this.textura = null;
   this.rutaTextura = RUTAIMAGENMARTE;
   this.normal_buffer = [];
   this.tangente_buffer = [];
   this.binormal_buffer = [];
   this.materialAux = null;
}
ObjetoGrafico.prototype.inicializarTextura = function(){

    this.materialAux.inicializarTextura();
    
}

ObjetoGrafico.prototype.guardarMaterial=function (material){
  this.texture_coord_buffer = [];
  this.materialAux = material;
  this.texture_coord_buffer = material.texture_coord_buffer;
}

ObjetoGrafico.prototype.generarMipMap=function (){
   this.materialAux.generarMipMap();
 }
 ObjetoGrafico.prototype.completar=function (){

  for (var i = 0; i < this.normal_buffer.length; i++) {
      this.tangente_buffer.push(1.0);
      this.binormal_buffer.push(1.0);
  };

 }
 ObjetoGrafico.prototype.atarLosBuffer = function(position_buffer,normal_buffer,texture_coord_buffer,index_buffer){
    if(this.tangente_buffer.length == 0){
      this.completar();
    }
    // Creaci�n e Inicializaci�n de los buffers a nivel de OpenGL
    this.webgl_normal_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normal_buffer), gl.STATIC_DRAW);
    this.webgl_normal_buffer.itemSize = 3;
    this.webgl_normal_buffer.numItems = normal_buffer.length / 3;

    this.webgl_tangente_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_tangente_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.tangente_buffer), gl.STATIC_DRAW);
    this.webgl_tangente_buffer.itemSize = 3;
    this.webgl_tangente_buffer.numItems = this.tangente_buffer.length / 3;

    this.webgl_binormal_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_binormal_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.binormal_buffer), gl.STATIC_DRAW);
    this.webgl_binormal_buffer.itemSize = 3;
    this.webgl_binormal_buffer.numItems = this.binormal_buffer.length / 3;

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

    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_tangente_buffer);
    gl.vertexAttribPointer(shaderProgram.vertexTangenteAttribute, this.webgl_tangente_buffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_binormal_buffer);
    gl.vertexAttribPointer(shaderProgram.vertexBinormalAttribute, this.webgl_binormal_buffer.itemSize, gl.FLOAT, false, 0, 0);

    this.materialAux.configurarPropiedades();

    gl.uniformMatrix4fv(shaderProgram.ModelMatrixUniform, false, mvMatrix);
    var matrizNormal = mat3.create();
    mat3.fromMat4(matrizNormal, mvMatrix);
    mat3.invert(matrizNormal, matrizNormal);
    mat3.transpose(matrizNormal, matrizNormal);
    gl.uniformMatrix3fv(shaderProgram.nMatrixUniform, false, matrizNormal);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);
    gl.drawElements(gl.TRIANGLE_STRIP, this.webgl_index_buffer.numItems, gl.UNSIGNED_SHORT, 0);
}
