MoverNaveDerecha.prototype= new Comando;
MoverNaveDerecha.prototype.constructor=MoverNaveDerecha;
function MoverNaveDerecha(escena){
    Comando.call(this,escena);
}
MoverNaveDerecha.prototype.ejecutar=function(){
  this.escena.moverNaveDerecha();
}
MoverNaveDerecha.prototype.soltar=function(){
  this.escena.soltarTeclaNave(6);
}

