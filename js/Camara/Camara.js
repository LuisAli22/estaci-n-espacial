function Camara(canvas, radio, anguloTita, anguloFi) {
	this.canvas = canvas;
	this.radio = radio;
	this.radioMinimo=0;
	this.anguloTita = anguloTita;
	this.anguloFi = anguloFi;
	this.rueda= 0;
	this.ojo = [0, 0, 0];
	this.objetivo = [0, 0, 0];
	this.arriba = [0, 1, 0];
	this.matrizMirarHacia=mat4.create();
	this.posicionInicial = [0,0];
	this.posicionFinal = [0,0];

	this.estaApretandoElIzquierdo = false;

	this.sensibilidadDelMouse = 100 * Math.PI;
	this.esConLaRuedaDelMouse=false;
	this.esConLaTeclaMas=false;
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
Camara.prototype.obtenerValorQueNoSeaInferiorAlMinimo=function(valorActual,limiteInferior){
	return Math.max(valorActual,limiteInferior);
}
Camara.prototype.obtenerValorQueNoSeaSuperiorAlMaximo=function(valorActual,limiteSuperior){
	return Math.min(valorActual,limiteSuperior);
}
Camara.prototype.diferenciaEnCoordenada=function(eje){
	return (this.posicionFinal[eje] - this.posicionInicial[eje]);
}
Camara.prototype.incrementarMovimiento=function(eje){
	return (this.diferenciaEnCoordenada(eje) / (this.sensibilidadDelMouse));
}
Camara.prototype.seMueveElMouse = function(evento) {
	if (this.estaApretandoElIzquierdo) {
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
}

Camara.prototype.soltaronUnBotonDelMouse = function(evento){
	console.log("Soltaron un boton del mouse");
	if (this.esBotonIzquierdo(evento)) this.estaApretandoElIzquierdo= false;
}
Camara.prototype.incrementarRadio=function(evento){
	this.radio += (this.esConLaRuedaDelMouse)?
		      (evento.deltaY):
		      (this.esConLaTeclaMas)?(-1):(1);
}
Camara.prototype.actualizarRadio=function(evento){
	this.posicionFinal=this.obtengoCoordenadasDePantalla(evento);
	console.log("posicion inicial: ",this.posicionInicial);
	console.log("posicion final: ",this.posicionFinal);
	console.log("Inicialmente el Radio es: ",this.radio);
	this.incrementarRadio(evento);
	console.log("Radio: ",this.radio);
	console.log("Radio minimo: ",RADIOMINIMO);
	console.log("Radio maximo: ",RADIOMAXIMO);
	this.radio=this.obtenerValorQueNoSeaInferiorAlMinimo(this.radio,RADIOMINIMO);
	this.radio=this.obtenerValorQueNoSeaSuperiorAlMaximo(this.radio,RADIOMAXIMO);
	console.log("El radio termina siendo ",this.radio);
	this.posicionInicial= this.posicionFinal;
	this.actualizar();
}
Camara.prototype.seMueveLaRuedaDelMouse=function(evento){
	console.log("Se mueve la rueda del mouse");
	this.esConLaRuedaDelMouse=true;
	this.esConLaTeclaMas=false;
	this.actualizarRadio(evento);
}
Camara.prototype.acercarse=function(evento){
	console.log("Tocaron la tecla +");
	this.esConLaRuedaDelMouse=false;
	this.esConLaTeclaMas=true;
	this.actualizarRadio(evento);
}
Camara.prototype.alejarse=function(evento){
	console.log("Tocaron la tecla -");
	this.esConLaRuedaDelMouse=false;
	this.esConLaTeclaMas=false;
	this.actualizarRadio(evento);
}
