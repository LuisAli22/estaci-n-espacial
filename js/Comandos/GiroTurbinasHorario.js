GiroTurbinasHorario.prototype= new Comando;
GiroTurbinasHorario.prototype.constructor=GiroTurbinasHorario;
function GiroTurbinasHorario(turbinas){
    this.turbinas=turbinas
}
GiroTurbinasHorario.prototype.ejecutar=function(){
  this.turbinas.giroHorario();
}
