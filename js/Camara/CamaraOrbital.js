CamaraOrbital.prototype = new Camara;
CamaraOrbital.prototype.constructor = CamaraOrbital;

//Tita entre 0 y PI
//Fi entre 0 y 2PI
function CamaraOrbital(canvas, radio, anguloTita,anguloFi){
	Camara.call(this, canvas, radio,anguloTita,anguloFi);
//	this.actualizar();
}
CamaraOrbital.prototype.obtenerCoordenadasEspaciales=function(){
  var x = this.radio * Math.sin(this.anguloTita) * Math.cos(this.anguloFi);
	var y = this.radio * Math.cos(this.anguloTita);
	var z = this.radio * Math.sin(this.anguloTita) * Math.sin(this.anguloFi);
  return [x,y,z];
}
CamaraOrbital.prototype.calcularNuevaPosicionYActualizar=function(evento){
	console.log("Se mueve el mouse con el boton izquierdo apretado");
	this.posicionFinal = this.obtengoCoordenadasDePantalla(evento);
	this.anguloFi +=this.incrementarMovimiento(COORDENADAX);
	this.anguloTita += this.incrementarMovimiento(COORDENADAY);
	this.anguloTita=this.obtenerValorQueNoSeaInferiorAlMinimo(this.anguloTita,TITAMIN);
	this.anguloTita=this.obtenerValorQueNoSeaSuperiorAlMaximo(this.anguloTita,TITAMAX);
	this.anguloFi=this.obtenerValorQueNoSeaInferiorAlMinimo(this.anguloFi,FIMIN);
	this.anguloFi=this.obtenerValorQueNoSeaSuperiorAlMaximo(this.anguloFi,FIMAX);
	this.posicionInicial= this.posicionFinal;
	this.actualizar();
}
CamaraOrbital.prototype.seMueveElMouse = function(evento) {
	Camara.prototype.seMueveElMouse.call(this,evento);
	if (this.estaApretandoElIzquierdo) {
		this.calcularNuevaPosicionYActualizar(evento);
	}
}
CamaraOrbital.prototype.actualizar = function(){
	mat4.identity(this.matrizMirarHacia);
	this.ojo=this.obtenerCoordenadasEspaciales();
	mat4.lookAt(this.matrizMirarHacia, this.ojo, this.objetivo, this.arriba);
	Camara.prototype.actualizar.call(this);
};
