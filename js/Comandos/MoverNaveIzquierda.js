MoverNaveIzquierda.prototype= new Comando;
MoverNaveIzquierda.prototype.constructor=MoverNaveIzquierda;
function MoverNaveIzquierda(nave){
    this.nave=nave;
}
MoverNaveIzquierda.prototype.ejecutar=function(){
  this.nave.moverIzquierda();
}
MoverNaveIzquierda.prototype.soltar=function(){
  this.nave.soltarTecla(7);
}
