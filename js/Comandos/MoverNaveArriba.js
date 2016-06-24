MoverNaveArriba.prototype= new Comando;
MoverNaveArriba.prototype.constructor=MoverNaveArriba;
function MoverNaveArriba(nave){
    this.nave=nave;
}
MoverNaveArriba.prototype.ejecutar=function(){
	
  this.nave.moverArriba();
}
MoverNaveArriba.prototype.soltar=function(){
  this.nave.soltarTecla(4);
}
