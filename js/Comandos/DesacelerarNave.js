DesacelerarNave.prototype= new Comando;
DesacelerarNave.prototype.constructor=DesacelerarNave;
function DesacelerarNave(nave){
  this.nave=nave;
}
DesacelerarNave.prototype.ejecutar=function(){
  this.nave.desacelerar();
}
DesacelerarNave.prototype.soltar=function(){
  this.nave.soltarTecla(1);
}
