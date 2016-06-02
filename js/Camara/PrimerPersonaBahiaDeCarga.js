PrimerPersonaBahiaDeCarga.prototype= new Camara;
PrimerPersonaBahiaDeCarga.prototype.constructor=PrimerPersonaBahiaDeCarga;
function PrimerPersonaBahiaDeCarga(canvas,posicionDelOjo){
  Camara.call(this, canvas, 0, 0, 0);
	this.ojo =posicionDelOjo;
}
PrimerPersonaBahiaDeCarga.prototype.actualizar = function(){
	mat4.identity(this.matrizMirarHacia);
	mat4.lookAt(this.matrizMirarHacia, this.ojo, this.objetivo, this.arriba);
	Camara.prototype.actualizar.call(this);
};
PrimerPersonaBahiaDeCarga.prototype.seMueveElMouse = function(evento) {
		console.log("Se mueve el mouse con el boton izquierdo apretado");
		this.objetivo = this.obtengoCoordenadasDePantalla(evento);
    this.objetivo.concat(0);
		this.actualizar();
}
PrimerPersonaBahiaDeCarga.prototype.asignarPosicion = function(posicionDelOjo) {
  this.ojo =posicionDelOjo;
};
