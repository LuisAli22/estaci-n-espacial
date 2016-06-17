function Universo(esfera){
  this.esfera=esfera;
}
Universo.prototype.dibujar = function(){
  gl.uniform3f(shaderProgram.ambientColorUniform, 0.3, 0.3, 0.3 );
  gl.uniform3f(shaderProgram.directionalColorUniform, 0.05, 0.05, 0.05);
  pilaMatrizDeModelado.meter();
    mat4.scale(mvMatrix, mvMatrix, [FACTORESCALAUNIVERSO, FACTORESCALAUNIVERSO, FACTORESCALAUNIVERSO]);
    this.esfera.dibujar();
  pilaMatrizDeModelado.sacar();
}
Universo.prototype.inicializarTextura=function(){
  this.esfera.inicializarTextura(this.esfera.rutaTextura);
}
Universo.prototype.generarMipMap=function (){
  this.esfera.generarMipMap();
}
