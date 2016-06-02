Alejarse.prototype= new Comando;
Alejarse.prototype.constructor=Alejarse;
function Alejarse(escena){
  this.escena=escena;
}
Alejarse.prototype.ejecutar=function(evento){
  this.escena.alejarse(evento);
}
