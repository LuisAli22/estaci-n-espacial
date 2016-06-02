GiroEjesHorario.prototype= new Comando;
GiroEjesHorario.prototype.constructor=GiroEjesHorario;
function GiroEjesHorario(ejes){
  this.ejes=ejes;
}
GiroEjesHorario.prototype.ejecutar=function(){
  this.ejes.giroHorario();
}
