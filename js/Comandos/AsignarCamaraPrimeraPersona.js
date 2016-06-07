AsignarCamaraPrimeraPersona.prototype= new Comando;
AsignarCamaraPrimeraPersona.prototype.constructor=AsignarCamaraPrimeraPersona;
function AsignarCamaraPrimeraPersona(escena){
    this.escena=escena;
}
AsignarCamaraPrimeraPersona.prototype.ejecutar=function(evento){
  this.escena.asignarCamara("PrimerPersonaBahia");
}
