function setUpExecutableProgram(gl){
  console.log("setUpProgram: Create shader program");
  this.shaderProgram = gl.createProgram();

}
setUpExecutableProgram.prototype.start=function(gl,vertexShader,fragmentShader){
  console.log("attach vertex shader");
  gl.attachShader(this.shaderProgram, vertexShader);
  console.log("attach fragment shader")
  gl.attachShader(this.shaderProgram, fragmentShader);
  console.log("linking program")
  gl.linkProgram(this.shaderProgram);

  if (!gl.getProgramParameter(this.shaderProgram, gl.LINK_STATUS))
      throw Error(PROGRAMPARAM);
  gl.useProgram(this.shaderProgram);
  console.log("poniendo la ubicacion de la variable aVertexPosition del shader de vertices");
  this.shaderProgram.vertexPositionAttribute = gl.getAttribLocation(this.shaderProgram,AVERTEXPOSITION);
  gl.enableVertexAttribArray(this.shaderProgram.vertexPositionAttribute);
  console.log("poniendo la ubicacion de la variable"+ATEXTURECOORD+"del shader de vertices");
  this.shaderProgram.textureCoordAttribute = gl.getAttribLocation(this.shaderProgram, ATEXTURECOORD);
  gl.enableVertexAttribArray(this.shaderProgram.textureCoordAttribute);

  this.shaderProgram.vertexNormalAttribute = gl.getAttribLocation(this.shaderProgram, AVERTEXNORMAL);
  gl.enableVertexAttribArray(this.shaderProgram.vertexNormalAttribute);

  this.shaderProgram.pMatrixUniform = gl.getUniformLocation(this.shaderProgram, UPMATRIX);
  this.shaderProgram.ViewMatrixUniform = gl.getUniformLocation(this.shaderProgram,UVIEWMATRIX);
  this.shaderProgram.ModelMatrixUniform = gl.getUniformLocation(this.shaderProgram, UMODELMATRIX);
  this.shaderProgram.nMatrixUniform = gl.getUniformLocation(this.shaderProgram, UNMATRIX);
  this.shaderProgram.samplerUniform = gl.getUniformLocation(this.shaderProgram, USAMPLER);
  this.shaderProgram.useLightingUniform = gl.getUniformLocation(this.shaderProgram, UUSELIGHTING);
  this.shaderProgram.ambientColorUniform = gl.getUniformLocation(this.shaderProgram, UAMBIENTCOLOR);
  this.shaderProgram.lightingDirectionUniform = gl.getUniformLocation(this.shaderProgram, ULIGHTPOSITION);
  this.shaderProgram.directionalColorUniform = gl.getUniformLocation(this.shaderProgram, UDIRECTIONALCOLOR);
}
setUpExecutableProgram.prototype.getShaderPogram=function(){return this.shaderProgram;}
