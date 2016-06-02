MoverseHaciaLaDerecha.prototype= new Comando;
MoverseHaciaLaDerecha.prototype.constructor=MoverseHaciaLaDerecha;
function MoverseHaciaLaDerecha(escena){
  this.escena=escena;
}
MoverseHaciaLaDerecha.prototype.ejecutar=function(evento){
  this.escena.moverseHaciaLaDerecha(evento);
}
