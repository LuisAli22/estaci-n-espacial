GiroEjesAntihorario.prototype= new Comando;
GiroEjesAntihorario.prototype.constructor=GiroEjesAntihorario;
function GiroEjesAntihorario(escena){
    Comando.call(this,escena);
}
GiroEjesAntihorario.prototype.ejecutar=function(){
  this.escena.giroEjesAntihorario();
}
