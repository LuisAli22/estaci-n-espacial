CamaraOrbital.prototype = new Camara;
CamaraOrbital.prototype.constructor = CamaraOrbital;

function CamaraOrbital(canvas, radio, anguloTita,anguloFi){
	Camara.call(this, canvas);
	this.radio = radio;
	this.anguloTita = anguloTita;
	this.anguloFi = anguloFi;
	this.rueda= 0;
}
CamaraOrbital.prototype.incrementarAngulo=function(eje){
	return ((this.posicionFinal[eje] - this.posicionInicial[eje])/ (SENSIBILIDADDELMOUSE));
}
CamaraOrbital.prototype.incrementarYVerificarLimite=function(incremento,limiteInferior,limiteSuperior,valorAIncrementar){
	valorAIncrementar +=incremento;
	valorAIncrementar=Math.max(valorAIncrementar,limiteInferior);
	valorAIncrementar=Math.min(valorAIncrementar,limiteSuperior);
	return valorAIncrementar;
}
CamaraOrbital.prototype.calcularNuevaPosicionYActualizar=function(evento,realizarZoom,incremento){
	this.posicionFinal = this.obtengoCoordenadasDePantalla(evento);
	if (realizarZoom){
		this.radio=this.incrementarYVerificarLimite(incremento,RADIOMINIMO,RADIOMAXIMO,this.radio);
	}else{
		this.anguloTita=this.incrementarYVerificarLimite(this.incrementarAngulo(COORDENADAY),TITAMIN,TITAMAX,this.anguloTita);
		this.anguloFi=this.incrementarYVerificarLimite(this.incrementarAngulo(COORDENADAX),FIMIN,FIMAX,this.anguloFi);
	}
	this.posicionInicial= this.posicionFinal;
	this.actualizar();
}
CamaraOrbital.prototype.seMueveElMouse = function(evento) {
	Camara.prototype.seMueveElMouse.call(this,evento);
	if (this.estaApretandoElIzquierdo) {
		this.calcularNuevaPosicionYActualizar(evento,false);
	}
}
CamaraOrbital.prototype.seMueveLaRuedaDelMouse=function(evento){
	this.calcularNuevaPosicionYActualizar(evento,true,evento.deltaY);
}
CamaraOrbital.prototype.acercarse=function(evento){
	this.calcularNuevaPosicionYActualizar(evento,true,INCREMENTOCONTECLAPARAACERCARSE);
}
CamaraOrbital.prototype.alejarse=function(evento){
	this.calcularNuevaPosicionYActualizar(evento,true,INCREMENTOCONTECLAPARAALEJARSE);
}
CamaraOrbital.prototype.obtenerCoordenadasEspaciales=function(){
  var x = this.radio * Math.sin(this.anguloTita) * Math.cos(this.anguloFi);
	var y = this.radio * Math.cos(this.anguloTita);
	var z = this.radio * Math.sin(this.anguloTita) * Math.sin(this.anguloFi);
  return [x,y,z];
}

CamaraOrbital.prototype.asignarPosicionesDeOjoYObjetivo=function(){
	this.ojo=this.obtenerCoordenadasEspaciales();
}
