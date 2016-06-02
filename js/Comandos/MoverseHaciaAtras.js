MoverseHaciaAtras.prototype= new Comando;
MoverseHaciaAtras.prototype.constructor=MoverseHaciaAtras;
function MoverseHaciaAtras(escena){
  this.escena=escena;
}
MoverseHaciaAtras.prototype.ejecutar=function(evento){
  this.escena.moverseHaciaAtras(evento);
}
MoverseHaciaAtras.prototype.soltar=function(){
  this.escena.soltarTeclaNave();
}
