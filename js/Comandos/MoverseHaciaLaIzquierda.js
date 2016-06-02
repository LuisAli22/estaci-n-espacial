MoverseHaciaLaIzquierda.prototype= new Comando;
MoverseHaciaLaIzquierda.prototype.constructor=MoverseHaciaLaIzquierda;
function MoverseHaciaLaIzquierda(escena){
  this.escena=escena;
}
MoverseHaciaLaIzquierda.prototype.ejecutar=function(evento){
  this.escena.moverseHaciaLaIzquierda(evento);
}
