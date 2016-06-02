AsignarCamaraPrimeraPersona.prototype= new Comando;
AsignarCamaraPrimeraPersona.prototype.constructor=AsignarCamaraPrimeraPersona;
function AsignarCamaraPrimeraPersona(escena){
    Comando.call(this,escena);
}
AsignarCamaraPrimeraPersona.prototype.ejecutar=function(evento){
  this.escena.asignarCamara("PrimerPersonaBahia");
}
