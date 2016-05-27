MoverNaveIzquierda.prototype= new Comando;
MoverNaveIzquierda.prototype.constructor=MoverNaveIzquierda;
function MoverNaveIzquierda(escena){
    Comando.call(this,escena);
}
MoverNaveIzquierda.prototype.ejecutar=function(){
  this.escena.moverNaveIzquierda();
}
MoverNaveIzquierda.prototype.soltar=function(){
  this.escena.soltarTeclaNave(7);
}