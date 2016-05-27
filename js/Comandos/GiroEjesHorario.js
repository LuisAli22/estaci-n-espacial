GiroEjesHorario.prototype= new Comando;
GiroEjesHorario.prototype.constructor=GiroEjesHorario;
function GiroEjesHorario(escena){
    Comando.call(this,escena);
}
GiroEjesHorario.prototype.ejecutar=function(){
  this.escena.giroEjesHorario();
}
