MoverNaveAbajo.prototype= new Comando;
MoverNaveAbajo.prototype.constructor=MoverNaveAbajo;
function MoverNaveAbajo(nave){
    this.nave=nave;
}
MoverNaveAbajo.prototype.ejecutar=function(){
  this.nave.moverAbajo();
}
MoverNaveAbajo.prototype.soltar=function(){
  this.nave.soltarTecla(5);
}
