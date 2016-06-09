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
}
PrimerPersonaBahiaDeCarga.prototype.actualizar = function(){
	mat4.identity(this.matrizMirarHacia);
  this.ojo=this.obtenerPosicionPersona();
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
PrimerPersonaBahiaDeCarga.prototype.comprobarYAplicarDesplazamientoIzquierdaODerecha=function(sentido){
    var nuevaPosicion=this.ubicacionRadialEnBahia+ sentido*this.pasoDesplazamientoRadial;
    if (this.estaDentroDeLaBahia(nuevaPosicion)){
      this.desplazamiento=this.desplazamiento+sentido*this.pasoDesplazamientoRadial;
    }
    this.actualizar();
}
PrimerPersonaBahiaDeCarga.prototype.obtenerPosicionPersona=function(){
  var posicionPuntoLateral=this.trayectoria[this.indiceDeUbicacionDeLaPersona];
  var x=posicionPuntoLateral[0];
  var y=posicionPuntoLateral[1];
  var z=posicionPuntoLateral[2];
  this.radioTrayectoria=Math.sqrt(Math.pow(x,2)+Math.pow(y,2)+Math.pow(z,2));
  this.ubicacionRadialEnBahia= this.radioTrayectoria+this.desplazamiento-2;
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
PrimerPersonaBahiaDeCarga.prototype.moverseAtrasOAdelante=function(sentido){
  if (this.indiceDeUbicacionEstaDentroDeTrayectoria()){
    this.indiceDeUbicacionDeLaPersona+=sentido;
    this.actualizar();
  }
}
PrimerPersonaBahiaDeCarga.prototype.moverseHaciaAdelante=function(){
  this.moverseAtrasOAdelante(DESPLAZARADELANTE);
}
PrimerPersonaBahiaDeCarga.prototype.indiceDeUbicacionEstaDentroDeTrayectoria=function(){
  return ((this.indiceDeUbicacionDeLaPersona>=0)&&(this.indiceDeUbicacionDeLaPersona<this.trayectoria.length-1));
}
PrimerPersonaBahiaDeCarga.prototype.moverseHaciaAtras=function(){
  this.moverseAtrasOAdelante(DESPLAZARATRAS);
}
PrimerPersonaBahiaDeCarga.prototype.moverseHaciaLaIzquierda=function(){
  this.comprobarYAplicarDesplazamientoIzquierdaODerecha(DESPLAZARIZQUIERDA);
}
PrimerPersonaBahiaDeCarga.prototype.moverseHaciaLaDerecha=function(){
  this.comprobarYAplicarDesplazamientoIzquierdaODerecha(DESPLAZARDERECHA);
}
