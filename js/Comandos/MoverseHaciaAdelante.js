MoverseHaciaAdelante.prototype= new Comando;
MoverseHaciaAdelante.prototype.constructor=MoverseHaciaAdelante;
function MoverseHaciaAdelante(escena){
  this.escena=escena;
}
MoverseHaciaAdelante.prototype.ejecutar=function(evento){
  this.escena.moverseHaciaAdelante();
}
MoverseHaciaAdelante.prototype.soltar=function(){
//  this.escena.soltarTeclaNave();
}
