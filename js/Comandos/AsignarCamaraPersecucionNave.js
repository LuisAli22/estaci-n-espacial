AsignarCamaraPersecucionNave.prototype= new Comando;
AsignarCamaraPersecucionNave.prototype.constructor=AsignarCamaraPersecucionNave;
function AsignarCamaraPersecucionNave(escena){
    this.escena=escena;
}
AsignarCamaraPersecucionNave.prototype.ejecutar=function(evento){
  this.escena.asignarCamara("Persecucion");
}
