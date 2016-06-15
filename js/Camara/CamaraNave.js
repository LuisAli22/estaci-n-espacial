CamaraNave.prototype = new Camara;
CamaraNave.prototype.constructor = CamaraNave;
function CamaraNave(canvas){
  Camara.call(this, canvas);
  this.encendida=false;
}
CamaraNave.prototype.asignarEstadoDeFuncionamiento=function(encendida){
  this.encendida=encendida;
}
CamaraNave.prototype.estaEncendida=function(){
  return this.encendida;
}
CamaraNave.prototype.obtenerPosicion=function(esPosicionOjo){
  var posicion=this.obtenerPosicionInicial(esPosicionOjo);
  mat4.multiply(posicion,mvMatrix,posicion);
  return vec3.fromValues(posicion[0],posicion[1],posicion[2]);
}

CamaraNave.prototype.asignarPosicionesDeOjoYObjetivo=function(){
  this.ojo=this.obtenerPosicion(true);
  this.objetivo=this.obtenerPosicion(false);
}
