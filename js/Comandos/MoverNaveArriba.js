MoverNaveArriba.prototype= new Comando;
MoverNaveArriba.prototype.constructor=MoverNaveArriba;
function MoverNaveArriba(escena){
    Comando.call(this,escena);
}
MoverNaveArriba.prototype.ejecutar=function(){
  this.escena.moverNaveArriba();
}
MoverNaveArriba.prototype.soltar=function(){
  this.escena.soltarTeclaNave(4);
}