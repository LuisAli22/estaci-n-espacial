GiroHorarioNave.prototype= new Comando;
GiroHorarioNave.prototype.constructor=GiroHorarioNave;
function GiroHorarioNave(nave){
    this.nave=nave;
}
GiroHorarioNave.prototype.ejecutar=function(){
  this.nave.giroHorarioNave();
}
GiroHorarioNave.prototype.soltar=function(){
  this.nave.soltarTeclaNave(2);
}
