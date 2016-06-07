AsignarCamaraOrbital.prototype= new Comando;
AsignarCamaraOrbital.prototype.constructor=AsignarCamaraOrbital;
function AsignarCamaraOrbital(escena){
    this.escena=escena;
}
AsignarCamaraOrbital.prototype.ejecutar=function(evento){
  this.escena.asignarCamara("Orbital");
}
