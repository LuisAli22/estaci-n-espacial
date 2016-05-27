GiroAntihorarioNave.prototype= new Comando;
GiroAntihorarioNave.prototype.constructor=GiroAntihorarioNave;
function GiroAntihorarioNave(escena){
    Comando.call(this,escena);
}
GiroAntihorarioNave.prototype.ejecutar=function(){
  this.escena.giroAntihorarioNave();
}
GiroAntihorarioNave.prototype.soltar=function(){
  this.escena.soltarTeclaNave(3);
}
