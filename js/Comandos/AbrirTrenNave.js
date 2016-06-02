AbrirTrenNave.prototype= new Comando;
AbrirTrenNave.prototype.constructor=AbrirTrenNave;
function AbrirTrenNave(patasNave){
    this.patasNave=patasNave;
}
AbrirTrenNave.prototype.ejecutar=function(){
  this.patasNave.abrirTren();
}
