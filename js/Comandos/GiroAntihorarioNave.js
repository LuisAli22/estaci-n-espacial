GiroAntihorarioNave.prototype= new Comando;
GiroAntihorarioNave.prototype.constructor=GiroAntihorarioNave;
function GiroAntihorarioNave(nave){
  this.nave=nave;
}
GiroAntihorarioNave.prototype.ejecutar=function(){
  this.nave.giroAntihorario();
}
GiroAntihorarioNave.prototype.soltar=function(){
  this.nave.soltarTecla(3);
}
