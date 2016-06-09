PrimerPersonaBahiaDeCarga.prototype= new CamaraOrbital;
PrimerPersonaBahiaDeCarga.prototype.constructor=PrimerPersonaBahiaDeCarga;
function PrimerPersonaBahiaDeCarga(canvas,trayectoria){
  CamaraOrbital.call(this, canvas, RADIOOBSERVACIONPRIMERAPERSONA, TITAPRIMERAPERSONAPUNTOAPARICION,FIPRIMERAPERSONAPUNTOAPARICION);
  this.trayectoria=trayectoria;
  this.indiceDeUbicacionDeLaPersona=INDICEUBICACIONTRAYECTORIAPUNTOAPARICION;
  this.ubicacionRadialEnBahia=0;
  this.radioTrayectoria=0;
  this.desplazamiento=0;
}
PrimerPersonaBahiaDeCarga.prototype.asignarPosicionesDeOjoYObjetivo=function(){
  this.ojo=this.obtenerPosicionPersona();
  this.objetivo=this.obtenerCoordenadasEspaciales();
}
PrimerPersonaBahiaDeCarga.prototype.estaDentroDeLaBahia=function(posicion){
  return  (posicion <= this.radioTrayectoria-DESPLAZAMIENTORADIALPAREDINTERIOR)&&
          (posicion >= this.radioTrayectoria-DESPLAZAMIENTORADIALPAREDEXTERIOR);
}
PrimerPersonaBahiaDeCarga.prototype.seQuiereDesplazarIzqODer=function(){
  return (this.desplazarIzquierda||this.desplazarDerecha);
}
PrimerPersonaBahiaDeCarga.prototype.comprobarYAplicarDesplazamientoIzquierdaODerecha=function(sentido){
    var nuevaPosicion=this.ubicacionRadialEnBahia+ sentido*PASODESPLAZAMIENTORADIAL;
    if (this.estaDentroDeLaBahia(nuevaPosicion)){
      this.desplazamiento+=(sentido*PASODESPLAZAMIENTORADIAL);
    }
    this.actualizar();
}
PrimerPersonaBahiaDeCarga.prototype.obtenerPosicionPersona=function(){
  var posicionPuntoLateral=this.trayectoria[this.indiceDeUbicacionDeLaPersona];
  var x=posicionPuntoLateral[0];
  var y=posicionPuntoLateral[1];
  var z=posicionPuntoLateral[2];
  this.radioTrayectoria=Math.sqrt(Math.pow(x,2)+Math.pow(y,2)+Math.pow(z,2));
  this.ubicacionRadialEnBahia= this.radioTrayectoria+this.desplazamiento-DESPLAZAMIENTORADIALCENTROBAHIA;
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
PrimerPersonaBahiaDeCarga.prototype.moverseAtrasOAdelante=function(sentido){
  this.indiceDeUbicacionDeLaPersona+=sentido;
  if (this.indiceDeUbicacionEstaDentroDeTrayectoria()){
    this.actualizar();
  }else this.indiceDeUbicacionDeLaPersona-=sentido;
}
PrimerPersonaBahiaDeCarga.prototype.moverseHaciaAdelante=function(){
  this.moverseAtrasOAdelante(DESPLAZARADELANTE);
}
PrimerPersonaBahiaDeCarga.prototype.indiceDeUbicacionEstaDentroDeTrayectoria=function(){
  console.log("trayectoria length: ",this.trayectoria.length);
  return ((this.indiceDeUbicacionDeLaPersona>=0)&&(this.indiceDeUbicacionDeLaPersona<this.trayectoria.length));
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
PrimerPersonaBahiaDeCarga.prototype.seMueveLaRuedaDelMouse=function(evento){}
PrimerPersonaBahiaDeCarga.prototype.acercarse=function(evento){}
PrimerPersonaBahiaDeCarga.prototype.alejarse=function(evento){}
