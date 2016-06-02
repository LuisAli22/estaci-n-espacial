Acercarse.prototype= new Comando;
Acercarse.prototype.constructor=Acercarse;
function Acercarse(escena){
    this.escena=escena;
}
Acercarse.prototype.ejecutar=function(evento){
  this.escena.acercarse(evento);
}
