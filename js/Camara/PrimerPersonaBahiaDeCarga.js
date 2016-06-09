PrimerPersonaBahiaDeCarga.prototype= new CamaraOrbital;
PrimerPersonaBahiaDeCarga.prototype.constructor=PrimerPersonaBahiaDeCarga;
function PrimerPersonaBahiaDeCarga(canvas,trayectoria){
  CamaraOrbital.call(this, canvas, 10, 0.5 * Math.PI, 0.25 * Math.PI);
  this.trayectoria=trayectoria;
  this.indiceDeUbicacionDeLaPersona=0;
  this.ubicacionRadialEnBahia=0;
  this.radioTrayectoria=0;
  this.pasoDesplazamientoRadial=0.1;
  this.desplazamiento=0;
  this.desplazarIzquierda=false;
  this.desplazarDerecha=false;
}
PrimerPersonaBahiaDeCarga.prototype.actualizar = function(){
	mat4.identity(this.matrizMirarHacia);
  this.ojo=/*this.trayectoria[this.indiceDeUbicacionDeLaPersona];*/this.obtenerPosicionPersona();
  this.objetivo=this.obtenerCoordenadasEspaciales();
	mat4.lookAt(this.matrizMirarHacia, this.ojo, this.objetivo, this.arriba);
  Camara.prototype.actualizar.call(this);
};
PrimerPersonaBahiaDeCarga.prototype.estaDentroDeLaBahia=function(posicion){
  return (posicion <= this.radioTrayectoria-1.7)&&(posicion >= this.radioTrayectoria-2.5);
}
PrimerPersonaBahiaDeCarga.prototype.seQuiereDesplazarIzqODer=function(){
  return (this.desplazarIzquierda||this.desplazarDerecha);
}
PrimerPersonaBahiaDeCarga.prototype.comprobarYAplicarDesplazamientoIzquierdaODerecha=function(){
  if (this.seQuiereDesplazarIzqODer()){
    var sentido=(this.desplazarIzquierda)?(1):(-1);
    var nuevaPosicion=this.ubicacionRadialEnBahia+ sentido*this.pasoDesplazamientoRadial;
    if (this.estaDentroDeLaBahia(nuevaPosicion)){
      this.desplazamiento=this.desplazamiento+sentido*this.pasoDesplazamientoRadial;
    }
    this.desplazarIzquierda=false;
    this.desplazarDerecha=false;
  }

}
PrimerPersonaBahiaDeCarga.prototype.obtenerPosicionPersona=function(){
  var posicionPuntoLateral=this.trayectoria[this.indiceDeUbicacionDeLaPersona];
  var x=posicionPuntoLateral[0];
  var y=posicionPuntoLateral[1];
  var z=posicionPuntoLateral[2];
  this.radioTrayectoria=Math.sqrt(Math.pow(x,2)+Math.pow(y,2)+Math.pow(z,2));
  this.ubicacionRadialEnBahia= this.radioTrayectoria+this.desplazamiento-2;
  this.comprobarYAplicarDesplazamientoIzquierdaODerecha();
  var coeficienteRadial=this.ubicacionRadialEnBahia/this.radioTrayectoria;
  return [x*coeficienteRadial,y*coeficienteRadial,z*coeficienteRadial];

}
/*PrimerPersonaBahiaDeCarga.prototype.seMueveElMouse = function(evento) {
		console.log("Se mueve el mouse y la camara es la de la persona en bahia");
    Camara.prototype.seMueveElMouse.call(this,evento);
    if (this.estaAdentroDelCanvas(evento)){
      this.calcularNuevaPosicionYActualizar.call(this,evento);
    }

}*/
PrimerPersonaBahiaDeCarga.prototype.asignarPosicion = function(posicionDelOjo) {
  this.ojo =posicionDelOjo;
};
PrimerPersonaBahiaDeCarga.prototype.moverseHaciaAdelante=function(){
  if (this.indiceDeUbicacionDeLaPersona>0){
    this.indiceDeUbicacionDeLaPersona-=1;
    this.actualizar();
  }
}
PrimerPersonaBahiaDeCarga.prototype.moverseHaciaAtras=function(){
  if (this.indiceDeUbicacionDeLaPersona<this.trayectoria.length-1){
    this.indiceDeUbicacionDeLaPersona+=1;
    this.actualizar();
;  }
}
PrimerPersonaBahiaDeCarga.prototype.moverseHaciaLaIzquierda=function(){
  this.desplazarIzquierda=true;
  this.actualizar();
}
PrimerPersonaBahiaDeCarga.prototype.moverseHaciaLaDerecha=function(){
  this.desplazarDerecha=true;
  this.actualizar();
}
