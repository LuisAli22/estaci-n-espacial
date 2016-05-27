CerrarPaneles.prototype= new Comando;
CerrarPaneles.prototype.constructor=CerrarPaneles;
function CerrarPaneles(escena){
    Comando.call(this,escena);
}
CerrarPaneles.prototype.ejecutar=function(evento){
  this.escena.cerrarPaneles();
}
