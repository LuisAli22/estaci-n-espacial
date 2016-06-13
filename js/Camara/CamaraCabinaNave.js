CamaraCabinaNave.prototype = new Camara;
CamaraCabinaNave.prototype.constructor = CamaraCabinaNave;
function CamaraCabinaNave(canvas,matrizPosicionNave){
  Camara.call(this, canvas);
  this.matrizPosicionNave=matrizPosicionNave;
}
CamaraCabinaNave.prototype.obtenerPosicionPersona=function(){
  var posicionOjo=vec4.fromValues(0,0,0,1);
  mat4.multiply(posicionOjo,this.matrizPosicionNave,posicionOjo);
  return vec3.fromValues(posicionOjo[0],posicionOjo[1],posicionOjo[2]);

}
CamaraCabinaNave.prototype.asignarPosicionesDeOjoYObjetivo=function(){
  this.ojo=this.obtenerPosicionPersona();
  //this.objetivo=this.obtenerCoordenadasEspaciales();
}
