GiroHorarioNave.prototype= new Comando;
GiroHorarioNave.prototype.constructor=GiroHorarioNave;
function GiroHorarioNave(escena){
    Comando.call(this,escena);
}
GiroHorarioNave.prototype.ejecutar=function(){
  this.escena.giroHorarioNave();
}
GiroHorarioNave.prototype.soltar=function(){
  this.escena.soltarTeclaNave(2);
}
