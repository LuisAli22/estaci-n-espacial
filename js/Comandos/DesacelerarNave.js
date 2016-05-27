DesacelerarNave.prototype= new Comando;
DesacelerarNave.prototype.constructor=DesacelerarNave;
function DesacelerarNave(escena){
    Comando.call(this,escena);
}
DesacelerarNave.prototype.ejecutar=function(){
  this.escena.desacelerarNave();
}
DesacelerarNave.prototype.soltar=function(){
  this.escena.soltarTeclaNave(1);
}
