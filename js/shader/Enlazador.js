function Enlazador(vertexShaderObject,fragmentShaderObject){
  shaderProgram = gl.createProgram();
  this.vertexShader=vertexShaderObject;
  this.fragmentShader=fragmentShaderObject;
}
Enlazador.prototype.asignarUbicacionDeLasVariablesDelPrograma=function(){
  shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram,AVERTEXPOSITION);
  gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
  shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, ATEXTURECOORD);
  gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);
  shaderProgram.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, AVERTEXNORMAL);
  gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);
  shaderProgram.vertexTangenteAttribute = gl.getAttribLocation(shaderProgram, AVERTEXTANGENTE);
  gl.enableVertexAttribArray(shaderProgram.vertexTangenteAttribute);
  shaderProgram.vertexBinormalAttribute = gl.getAttribLocation(shaderProgram, AVERTEXBINORMAL);
  gl.enableVertexAttribArray(shaderProgram.vertexBinormalAttribute);
  shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, UPMATRIX);
  shaderProgram.ViewMatrixUniform = gl.getUniformLocation(shaderProgram,UVIEWMATRIX);
  shaderProgram.ModelMatrixUniform = gl.getUniformLocation(shaderProgram, UMODELMATRIX);
  shaderProgram.nMatrixUniform = gl.getUniformLocation(shaderProgram, UNMATRIX);
  shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, USAMPLER);
  shaderProgram.useLightingUniform = gl.getUniformLocation(shaderProgram, UUSELIGHTING);
  shaderProgram.ambientColorUniform = gl.getUniformLocation(shaderProgram, UAMBIENTCOLOR);
  shaderProgram.lightingDirectionUniform = gl.getUniformLocation(shaderProgram, ULIGHTPOSITION);
  shaderProgram.directionalColorUniform = gl.getUniformLocation(shaderProgram, UDIRECTIONALCOLOR);
}
Enlazador.prototype.comenzar=function(){
  gl.attachShader(shaderProgram, this.vertexShader);
  gl.attachShader(shaderProgram, this.fragmentShader);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS))
      throw Error(PROGRAMPARAM);
  gl.useProgram(shaderProgram);
}