CerrarTrenNave.prototype= new Comando;
CerrarTrenNave.prototype.constructor=CerrarTrenNave;
function CerrarTrenNave(escena){
    Comando.call(this,escena);
}
CerrarTrenNave.prototype.ejecutar=function(){
  this.escena.cerrarTrenNave();
}