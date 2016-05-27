AbrirPaneles.prototype= new Comando;
AbrirPaneles.prototype.constructor=AbrirPaneles;
function AbrirPaneles(escena){
    Comando.call(this,escena);
}
AbrirPaneles.prototype.ejecutar=function(){
  this.escena.abrirPaneles();
}
