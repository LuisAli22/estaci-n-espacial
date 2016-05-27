AcelerarNave.prototype= new Comando;
AcelerarNave.prototype.constructor=AcelerarNave;
function AcelerarNave(escena){
    Comando.call(this,escena);
}
AcelerarNave.prototype.ejecutar=function(){
  this.escena.acelerarNave();
}
AcelerarNave.prototype.soltar=function(){
  this.escena.soltarTeclaNave(0);
}