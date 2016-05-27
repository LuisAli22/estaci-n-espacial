MoverseHaciaAdelante.prototype= new Comando;
MoverseHaciaAdelante.prototype.constructor=MoverseHaciaAdelante;
function MoverseHaciaAdelante(escena){
  Comando.call(this,escena);
}
MoverseHaciaAdelante.prototype.ejecutar=function(){
  this.escena.moverseHaciaAdelante();
}
MoverseHaciaAdelante.prototype.soltar=function(){
  this.escena.soltarTeclaNave();
}
