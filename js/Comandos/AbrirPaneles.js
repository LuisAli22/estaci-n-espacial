AbrirPaneles.prototype= new Comando;
AbrirPaneles.prototype.constructor=AbrirPaneles;
function AbrirPaneles(paneles){
  this.paneles=paneles;
}
AbrirPaneles.prototype.ejecutar=function(){
  this.paneles.abrir();
}
