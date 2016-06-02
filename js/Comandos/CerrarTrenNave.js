CerrarTrenNave.prototype= new Comando;
CerrarTrenNave.prototype.constructor=CerrarTrenNave;
function CerrarTrenNave(patasNaves){
    this.patasNaves=patasNaves;
}
CerrarTrenNave.prototype.ejecutar=function(){
  this.patasNaves.cerrarTren();
}
