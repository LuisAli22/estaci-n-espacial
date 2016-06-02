CerrarPaneles.prototype= new Comando;
CerrarPaneles.prototype.constructor=CerrarPaneles;
function CerrarPaneles(paneles){
  this.paneles=paneles;
}
CerrarPaneles.prototype.ejecutar=function(evento){
  this.paneles.cerrar();
}
