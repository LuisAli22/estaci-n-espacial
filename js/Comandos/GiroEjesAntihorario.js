GiroEjesAntihorario.prototype= new Comando;
GiroEjesAntihorario.prototype.constructor=GiroEjesAntihorario;
function GiroEjesAntihorario(ejes){
  this.ejes = ejes;
}
GiroEjesAntihorario.prototype.ejecutar=function(){
  this.ejes.giroAntiHorario();
}
