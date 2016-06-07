PrimerPersonaBahiaDeCarga.prototype= new CamaraOrbital;
PrimerPersonaBahiaDeCarga.prototype.constructor=PrimerPersonaBahiaDeCarga;
function PrimerPersonaBahiaDeCarga(canvas,trayectoria){
  CamaraOrbital.call(this, canvas, 10, 0.5 * Math.PI, 0.5 * Math.PI);
  this.trayectoria=trayectoria;
  this.indiceDeUbicacionDeLaPersona=0;
}
PrimerPersonaBahiaDeCarga.prototype.actualizar = function(){
	mat4.identity(this.matrizMirarHacia);
  this.ojo=this.trayectoria[this.indiceDeUbicacionDeLaPersona];
  this.objetivo=this.obtenerCoordenadasEspaciales();
	mat4.lookAt(this.matrizMirarHacia, this.ojo, this.objetivo, this.arriba);
  Camara.prototype.actualizar.call(this);
};
PrimerPersonaBahiaDeCarga.prototype.seMueveElMouse = function(evento) {
		console.log("Se mueve el mouse y la camara es la de la persona en bahia");
    Camara.prototype.seMueveElMouse.call(this,evento);
    if (this.estaAdentroDelCanvas(evento)){
      this.calcularNuevaPosicionYActualizar.call(this,evento);
    }
}
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
    this.actualizar()
;  }
}
