AsignarCamaraCabinaNave.prototype= new Comando;
AsignarCamaraCabinaNave.prototype.constructor=AsignarCamaraCabinaNave;
function AsignarCamaraCabinaNave(escena){
    this.escena=escena;
}
AsignarCamaraCabinaNave.prototype.ejecutar=function(evento){
  this.escena.asignarCamara("CabinaNave");
}
