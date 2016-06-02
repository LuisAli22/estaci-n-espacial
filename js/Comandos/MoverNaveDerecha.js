MoverNaveDerecha.prototype= new Comando;
MoverNaveDerecha.prototype.constructor=MoverNaveDerecha;
function MoverNaveDerecha(nave){
    this.nave=nave;
}
MoverNaveDerecha.prototype.ejecutar=function(){
  this.nave.moverDerecha();
}
MoverNaveDerecha.prototype.soltar=function(){
  this.nave.soltarTeclaNave(6);
}
