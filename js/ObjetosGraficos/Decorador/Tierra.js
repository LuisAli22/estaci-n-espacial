function Tierra(esfera){
  this.esfera=esfera;
}
Tierra.prototype.dibujar = function(){
  gl.uniform3f(shaderProgram.posicionLuzTierra, 0.0, -1.0, 0.0);
  gl.uniform3f(shaderProgram.intensidadLuzTierra, 0.02, 0.355, 0.47);
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
