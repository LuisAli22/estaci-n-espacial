GiroTurbinasHorario.prototype= new Comando;
GiroTurbinasHorario.prototype.constructor=GiroTurbinasHorario;
function GiroTurbinasHorario(escena){
    Comando.call(this,escena);
}
GiroTurbinasHorario.prototype.ejecutar=function(){
  this.escena.giroTurbinasHorario();
}
