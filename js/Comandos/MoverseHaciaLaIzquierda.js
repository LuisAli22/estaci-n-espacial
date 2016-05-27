MoverseHaciaLaIzquierda.prototype= new Comando;
MoverseHaciaLaIzquierda.prototype.constructor=MoverseHaciaLaIzquierda;
function MoverseHaciaLaIzquierda(escena){
  Comando.call(this,escena);
}
MoverseHaciaLaIzquierda.prototype.ejecutar=function(){
  this.escena.moverseHaciaLaIzquierda();
}
