AcelerarNave.prototype= new Comando;
AcelerarNave.prototype.constructor=AcelerarNave;
function AcelerarNave(nave){
    this.nave=nave;
}
AcelerarNave.prototype.ejecutar=function(){
  this.nave.acelerar();
}
AcelerarNave.prototype.soltar=function(){
  this.nave.soltarTecla(0);
}
