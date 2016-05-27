CerrarPaneles.prototype= new Comando;
CerrarPaneles.prototype.constructor=CerrarPaneles;
function CerrarPaneles(escena){
    Comando.call(this,escena);
}
CerrarPaneles.prototype.ejecutar=function(){
  this.escena.cerrarPaneles();
}
