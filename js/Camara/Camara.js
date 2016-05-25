function Camara(canvas, radio, anguloTita, anguloFi) {
	this.canvas = canvas;
	this.radio = radio;
	this.radioMinimo=0;
	this.anguloTita = anguloTita;
	this.anguloFi = anguloFi;

	this.ojo = [0, 0, 0];
	this.objetivo = [0, 0, 0];
	this.arriba = [0, 1, 0];
	this.matrizMirarHacia=mat4.create();
	this.posicionInicial = [0,0];
	this.posicionFinal = [0,0];

	this.estaApretandoElIzquierdo = false;

	this.sensibilidadDelMouse = 100 * Math.PI;
}
Camara.prototype.obtenerMatriz=function(){
	return this.matrizMirarHacia;
}
Camara.prototype.actualizarPosicion = function() {
	throw Error("No se puede instanciar Camara. Las camaras posibles son cámara orbital");
}
Camara.prototype.esBotonIzquierdo = function(evento){
	if (evento.which==BOTONIZQUIERDODELMOUSE) console.log("Tocaron el boton izquierdo");
  return (evento.which==BOTONIZQUIERDODELMOUSE);
}
Camara.prototype.obtengoCoordenadasDePantalla=function(evento){
	console.log("Obtengo la posicion actual (coordenadas [x,y])");
  var x = evento.clientX - this.canvas.offsetLeft;
  var y = evento.clientY - this.canvas.offsetTop;
  return [x,y];
}
Camara.prototype.apretaronUnBotonDelMouse = function(evento){
	this.estaApretandoElIzquierdo= this.esBotonIzquierdo(evento);
  this.posicionInicial=this.obtengoCoordenadasDePantalla(evento);
}
Camara.prototype.verificarAnguloMinimo=function(angulo,limiteInferior){
	return Math.max(angulo,limiteInferior);
}
Camara.prototype.verificarAnguloMaximo=function(angulo,limiteSuperior){
	return Math.min(angulo,limiteSuperior);
}
Camara.prototype.verificarLosLimitesDeGiro=function(){
	this.anguloTita=this.verificarAnguloMinimo(this.anguloTita,TITAMIN);
	this.anguloTita=this.verificarAnguloMaximo(this.anguloTita,TITAMAX);
}
Camara.prototype.diferenciaEnCoordenada=function(eje){
	return (this.posicionFinal[eje] - this.posicionInicial[eje]);
}
Camara.prototype.incrementoAngular=function(eje){
	return (this.diferenciaEnCoordenada(eje) / (this.sensibilidadDelMouse));
}
Camara.prototype.seMueveElMouse = function(evento) {
	if (this.estaApretandoElIzquierdo) {
		console.log("Se mueve el mouse con el boton izquierdo apretado");
		this.posicionFinal = this.obtengoCoordenadasDePantalla(evento);
		this.anguloFi +=this.incrementoAngular(COORDENADAX);
		this.anguloTita += this.incrementoAngular(COORDENADAY);
		this.verificarLosLimitesDeGiro();
		this.posicionInicial= this.posicionFinal;
		this.actualizar();
	}
}

Camara.prototype.soltaronUnBotonDelMouse = function(evento){
	console.log("Soltaron un boton del mouse");
	if (this.esBotonIzquierdo(evento)) this.estaApretandoElIzquierdo= false;
}
Camara.prototype.seMueveLaRuedaDelMouse=function(evento){
	console.log("Se mueve la rueda del mouse");
		this.posicionFinal=this.obtengoCoordenadasDePantalla(evento);
		this.radio += this.diferenciaEnCoordenada(COORDENADAY);
		this.radio=this.obtenerValorMinimo(this.radio,RADIOMINIMO);
		this.radio=this.obtenerValorMaximo(this.radio,RADIOMAXIMO);
		this.posicionInicial= this.posicionFinal;
		this.actualizar();
}
