Acercarse.prototype= new Comando;
Acercarse.prototype.constructor=Acercarse;
function Acercarse(escena){
    Comando.call(this,escena);
}
Acercarse.prototype.ejecutar=function(){
  this.escena.acercarse();
}
