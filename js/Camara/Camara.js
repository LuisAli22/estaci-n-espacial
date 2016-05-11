function Camara(canvas, radio, anguloTita, anguloFi) {
	this.canvas = canvas;
	this.radio = radio;
	this.radioMinimo=0;
	this.anguloTita = anguloTita;
	this.anguloFi = anguloFi;

	this.ojo = [0, 0, 0];
	this.objetivo = [0, 0, 0];
	this.arriba = [0, 1, 0];

	this.posicionInicial = [0,0];
	this.posicionFinal = [0,0];

	this.estaApretandoElIzquierdo = false;

	this.sensibilidadDelMouse = 100 * Math.PI;
}

Camara.prototype.obtenerMatriz = function() {
	var matrizCamara = mat4.create();
	return mat4.lookAt(matrizCamara, this.ojo, this.objetivo, this.arriba);
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
	this.anguloFi=this.verificarAnguloMinimo(this.anguloFi,FIMIN);
	this.anguloFi=this.verificarAnguloMaximo(this.anguloFi,FIMAX);
}
Camara.prototype.seMueveElMouse = function(evento) {
	if (this.estaApretandoElIzquierdo) {
		console.log("Se mueve el mouse con el boton izquierdo apretado");
		this.posicionFinal = this.obtengoCoordenadasDePantalla(evento);
		this.anguloTita += ((this.posicionFinal[COORDENADAX] - this.posicionInicial[COORDENADAX]) / (this.sensibilidadDelMouse));
		this.anguloFi += ((this.posicionFinal[COORDENADAY] - this.posicionInicial[COORDENADAY]) / (this.sensibilidadDelMouse));
		this.verificarLosLimitesDeGiro();
		this.posicionInicial= this.posicionFinal;
	}
}

Camara.prototype.soltaronUnBotonDelMouse = function(evento){
	console.log("Soltaron un boton del mouse");
	if (this.esBotonIzquierdo(evento)) this.estaApretandoElIzquierdo= false;
}
