MoverseHaciaLaIzquierda.prototype= new Comando;
MoverseHaciaLaIzquierda.prototype.constructor=MoverseHaciaLaIzquierda;
function MoverseHaciaLaIzquierda(escena){
  Comando.call(this,escena);
}
MoverseHaciaLaIzquierda.prototype.ejecutar=function(evento){
  this.escena.moverseHaciaLaIzquierda(evento);
}
