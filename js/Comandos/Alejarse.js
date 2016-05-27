Alejarse.prototype= new Comando;
Alejarse.prototype.constructor=Alejarse;
function Alejarse(escena){
  Comando.call(this,escena);
}
Alejarse.prototype.ejecutar=function(evento){
  this.escena.alejarse(evento);
}
