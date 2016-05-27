MoverseHaciaLaDerecha.prototype= new Comando;
MoverseHaciaLaDerecha.prototype.constructor=MoverseHaciaLaDerecha;
function MoverseHaciaLaDerecha(escena){
  Comando.call(this,escena);
}
MoverseHaciaLaDerecha.prototype.ejecutar=function(evento){
  this.escena.moverseHaciaLaDerecha(evento);
}
