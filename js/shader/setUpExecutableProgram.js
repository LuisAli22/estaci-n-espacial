function setUpExecutableProgram(){
  console.log("setUpProgram: Create shader program");
  shaderProgram = gl.createProgram();

}
setUpExecutableProgram.prototype.start=function(vertexShader,fragmentShader){
  console.log("attach vertex shader");
  gl.attachShader(shaderProgram, vertexShader);
  console.log("attach fragment shader")
  gl.attachShader(shaderProgram, fragmentShader);
  console.log("linking program")
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS))
      throw Error(PROGRAMPARAM);
  gl.useProgram(shaderProgram);
  console.log("poniendo la ubicacion de la variable aVertexPosition del shader de vertices");
  shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram,AVERTEXPOSITION);
  gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
  console.log("poniendo la ubicacion de la variable"+ATEXTURECOORD+"del shader de vertices");
  shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, ATEXTURECOORD);
  gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);

  shaderProgram.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, AVERTEXNORMAL);
  gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);

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
