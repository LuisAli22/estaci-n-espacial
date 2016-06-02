AsignarCamaraOrbital.prototype= new Comando;
AsignarCamaraOrbital.prototype.constructor=AsignarCamaraOrbital;
function AsignarCamaraOrbital(escena){
    Comando.call(this,escena);
}
AsignarCamaraOrbital.prototype.ejecutar=function(evento){
  this.escena.asignarCamara("Orbital");
}
