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
  shaderProgram.tieneReflexionEspecular = gl.getUniformLocation(shaderProgram, UTIENEESPECULAR);
  shaderProgram.brillo = gl.getUniformLocation(shaderProgram, UBRILLO);
  shaderProgram.especular = gl.getUniformLocation(shaderProgram, UESPECULAR);
  shaderProgram.tieneNormal = gl.getUniformLocation(shaderProgram, UTIENENORMAL);
  shaderProgram.samplerUniformN = gl.getUniformLocation(shaderProgram, USAMPLERN);

  shaderProgram.luzBahia1 = gl.getUniformLocation(shaderProgram, LUZBAHIA1);
  shaderProgram.luzBahia2 = gl.getUniformLocation(shaderProgram, LUZBAHIA2);
  shaderProgram.luzBahia3 = gl.getUniformLocation(shaderProgram, LUZBAHIA3);
  shaderProgram.luzBahia4 = gl.getUniformLocation(shaderProgram, LUZBAHIA4);
  shaderProgram.interiorBahia = gl.getUniformLocation(shaderProgram, INTERIORBAHIA);

  shaderProgram.intensidadLuzSolar = gl.getUniformLocation(shaderProgram, UINTENSIDADLUZSOLAR);
  shaderProgram.intensidadLuzAmbiente = gl.getUniformLocation(shaderProgram, UINTENSIDADLUZAMBIENTE);
  shaderProgram.intensidadLuzBahia = gl.getUniformLocation(shaderProgram, UINTENSIDADLUZBAHIA);
  shaderProgram.intensidadLuzAmbienteBahia = gl.getUniformLocation(shaderProgram, UINTENSIDADLUZAMBIENTEBAHIA);

  shaderProgram.posicionLuzTierra = gl.getUniformLocation(shaderProgram, UPOSICIONLUZTIERRA);
  shaderProgram.intensidadLuzTierra = gl.getUniformLocation(shaderProgram, UINTENSIDADLUZTIERRA);
  shaderProgram.iluminadoPorLaTierra = gl.getUniformLocation(shaderProgram, UILUMINADOPORLATIERRA);

  shaderProgram.samplerUniformIluminacion = gl.getUniformLocation(shaderProgram, USAMPLERILUMINACION);
  shaderProgram.iluminacionTextura = gl.getUniformLocation(shaderProgram, UILUMINACIONTEXTURA);
  shaderProgram.factorIluminacion = gl.getUniformLocation(shaderProgram, UFACTORILUMINACION);

  shaderProgram.autoiluminacion = gl.getUniformLocation(shaderProgram, UAUTOILUMINACION);

  shaderProgram.samplerUniformReflexion = gl.getUniformLocation(shaderProgram, USAMPLERREFLEXION);
  shaderProgram.tieneReflexion = gl.getUniformLocation(shaderProgram, UTIENEREFLEXION);

}
Enlazador.prototype.comenzar=function(){
  gl.attachShader(shaderProgram, this.vertexShader);
  gl.attachShader(shaderProgram, this.fragmentShader);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS))
      throw Error(PROGRAMPARAM);
  gl.useProgram(shaderProgram);
}
