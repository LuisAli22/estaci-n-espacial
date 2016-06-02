GiroTurbinasAntihorario.prototype= new Comando;
GiroTurbinasAntihorario.prototype.constructor=GiroTurbinasAntihorario;
function GiroTurbinasAntihorario(turbinas){
  this.turbinas=turbinas
}
GiroTurbinasAntihorario.prototype.ejecutar=function(){
  this.turbinas.giroAntiHorario();
}
