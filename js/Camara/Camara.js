function Camara(canvas) {
	this.canvas = canvas;
	this.ojo = [0, 0, 0];
	this.objetivo = [0, 0, 0];
	this.arriba = [0, 1, 0];
	this.matrizMirarHacia=mat4.create();
	this.posicionInicial = [0,0];
	this.posicionFinal = [0,0];
	this.estaApretandoElIzquierdo = false;
}
Camara.prototype.obtenerMatriz=function(){
	return this.matrizMirarHacia;
}
Camara.prototype.actualizar = function() {
	gl.uniformMatrix4fv(shaderProgram.ViewMatrixUniform, false,this.matrizMirarHacia);
}
Camara.prototype.esBotonIzquierdo = function(evento){
  return (evento.which==BOTONIZQUIERDODELMOUSE);
}
Camara.prototype.obtengoCoordenadasDePantalla=function(evento){
  var x = evento.clientX - this.canvas.offsetLeft;
  var y = evento.clientY - this.canvas.offsetTop;
  return [x,y];
}
Camara.prototype.apretaronUnBotonDelMouse = function(evento){
	this.estaApretandoElIzquierdo= this.esBotonIzquierdo(evento);
  this.posicionInicial=this.obtengoCoordenadasDePantalla(evento);
}
Camara.prototype.soltaronUnBotonDelMouse = function(evento){
	console.log("Soltaron un boton del mouse");
	if (this.esBotonIzquierdo(evento)) this.estaApretandoElIzquierdo= false;
}
Camara.prototype.habilitarDesplazamientoDePagina=function(){
	$('html, body').css({
    'overflow': 'auto',
    'height': 'auto'
});
}
Camara.prototype.deshabilitarDesplazamientoDePagina=function(){
	$('html, body').css({
    'overflow': 'hidden',
    'height': 'auto'
});
}
Camara.prototype.estaDentroDeLosMargenes=function(desplazamiento,limiteInferior,dimensionCanvas,posicionPuntero){
	var limiteSuperior=limiteInferior+dimensionCanvas;
	var posicionReal=posicionPuntero+desplazamiento;
	return (limiteInferior<=posicionReal)&&(posicionReal<=limiteSuperior);
}
Camara.prototype.estaDentroDeLAnchoDelCanvas=function(evento){
	return this.estaDentroDeLosMargenes($(window).scrollLeft(),this.canvas.offsetLeft,this.canvas.offsetWidth,evento.clientX);
}
Camara.prototype.estaDentroDeLaAltura=function(evento){
	return this.estaDentroDeLosMargenes($(window).scrollTop(),this.canvas.offsetTop,this.canvas.offsetHeight,evento.clientY);
}
Camara.prototype.estaAdentroDelCanvas=function(evento){
	return this.estaDentroDeLAnchoDelCanvas(evento)&&(this.estaDentroDeLaAltura(evento));
}
Camara.prototype.seMueveElMouse = function(evento) {
	if (this.estaAdentroDelCanvas(evento)){
		this.deshabilitarDesplazamientoDePagina();
	}else{
		this.habilitarDesplazamientoDePagina();
	}
}
