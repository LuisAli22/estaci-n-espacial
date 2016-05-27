PrimerPersonaBahiaDeCarga.prototype= new Camara;
PrimerPersonaBahiaDeCarga.prototype.constructor=PrimerPersonaBahiaDeCarga;
function PrimerPersonaBahiaDeCarga(canvas,posicionDelOjo){
  Camara.call(this, canvas, 0, 0, 0);
	this.ojo =posicionDelOjo;
}
PrimerPersonaBahiaDeCarga.prototype.asignarPosicion = function(posicionDelOjo) {
  this.ojo =posicionDelOjo;
};
