function Tierra(esfera){
  this.esfera=esfera;
}
Tierra.prototype.dibujar = function(){
  //gl.uniform3f(shaderProgram.ambientColorUniform, 0.3, 0.3, 0.3 );
  //gl.uniform3f(shaderProgram.directionalColorUniform, 0.05, 0.05, 0.05);
  pilaMatrizDeModelado.meter();
    mat4.translate(mvMatrix, mvMatrix, [0, DISTANCIAYTIERRA, 0 ]);
    mat4.scale(mvMatrix, mvMatrix, [FACTORESCALATIERRA, FACTORESCALATIERRA, FACTORESCALATIERRA]);
    this.esfera.dibujar();
  pilaMatrizDeModelado.sacar();
}
Tierra.prototype.inicializarTextura=function(){
  this.esfera.inicializarTextura();
}
Tierra.prototype.generarMipMap=function (){
  this.esfera.generarMipMap();
}
