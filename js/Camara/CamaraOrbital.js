CamaraOrbital.prototype = new Camara;
CamaraOrbital.prototype.constructor = CamaraOrbital;

//Tita entre 0 y PI
//Fi entre 0 y 2PI
function CamaraOrbital(canvas, radio, anguloTita,anguloFi){
	Camara.call(this, canvas, radio,anguloTita,anguloFi);
	this.actualizar();
	this.radioMinimo = 1;
}
CamaraOrbital.prototype.obtenerCoordenadasEspaciales=function(){
  var x = this.radio * Math.sin(this.anguloTita) * Math.cos(this.anguloFi);
	var y = this.radio * Math.cos(this.anguloTita);
	var z = this.radio * Math.sin(this.anguloTita) * Math.sin(this.anguloFi);
  return [x,y,z];
}
CamaraOrbital.prototype.actualizar = function(){
	mat4.identity(this.matrizMirarHacia);
	this.ojo=this.obtenerCoordenadasEspaciales();
	mat4.lookAt(this.matrizMirarHacia, this.ojo, this.objetivo, this.arriba);
};
