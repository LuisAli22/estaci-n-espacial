function Universo(esfera){
  this.esfera=esfera;
}
Universo.prototype.dibujar = function(){
  pilaMatrizDeModelado.meter();
    mat4.scale(mvMatrix, mvMatrix, [FACTORESCALAUNIVERSO, FACTORESCALAUNIVERSO, FACTORESCALAUNIVERSO]);
    this.esfera.dibujar();
  pilaMatrizDeModelado.sacar();
}
Universo.prototype.inicializarTextura=function(){
  this.esfera.inicializarTextura();
}
Universo.prototype.generarMipMap=function (){
  this.esfera.generarMipMap();
}
