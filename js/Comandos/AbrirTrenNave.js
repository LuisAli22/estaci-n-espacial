AbrirTrenNave.prototype= new Comando;
AbrirTrenNave.prototype.constructor=AbrirTrenNave;
function AbrirTrenNave(escena){
    Comando.call(this,escena);
}
AbrirTrenNave.prototype.ejecutar=function(){
  this.escena.abrirTrenNave();
}