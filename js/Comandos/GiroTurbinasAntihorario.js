GiroTurbinasAntihorario.prototype= new Comando;
GiroTurbinasAntihorario.prototype.constructor=GiroTurbinasAntihorario;
function GiroTurbinasAntihorario(escena){
    Comando.call(this,escena);
}
GiroTurbinasAntihorario.prototype.ejecutar=function(){
  this.escena.giroTurbinasAntihorario();
}
