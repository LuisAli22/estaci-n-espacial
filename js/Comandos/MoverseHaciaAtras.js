MoverseHaciaAtras.prototype= new Comando;
MoverseHaciaAtras.prototype.constructor=MoverseHaciaAtras;
function MoverseHaciaAtras(escena){
  Comando.call(this,escena);
}
MoverseHaciaAtras.prototype.ejecutar=function(){
  this.escena.moverseHaciaAtras();
}
