MoverNaveAbajo.prototype= new Comando;
MoverNaveAbajo.prototype.constructor=MoverNaveAbajo;
function MoverNaveAbajo(escena){
    Comando.call(this,escena);
}
MoverNaveAbajo.prototype.ejecutar=function(){
  this.escena.moverNaveAbajo();
}
MoverNaveAbajo.prototype.soltar=function(){
  this.escena.soltarTeclaNave(5);
}