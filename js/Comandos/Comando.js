function Comando(escena){
  this.escena=escena;
  this.teclaActualmentePresionada=false;
}
Comando.prototype.indicarQueEstaActualmentePresionada=function(teclaActualmentePresionada){
  this.teclaActualmentePresionada=teclaActualmentePresionada;
}
Comando.prototype.estaActualmentePresionada=function(){
  return this.teclaActualmentePresionada;
}
Comando.prototype.ejecutar=function(){
  throw new Error(ERRORPOREJECUTARCOMANDO);
}
