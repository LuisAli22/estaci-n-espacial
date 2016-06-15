ConstructorTechoExterior.prototype=new ConstructorBahia;
ConstructorTechoExterior.prototype.constructor=ConstructorTechoExterior;
function ConstructorTechoExterior(material){

	ConstructorBahia.call(this,material);
	this.construirEstructura();
}

ConstructorTechoExterior.prototype.construirEstructura=function(){

	var intervaloDelPaso = [30];

	var puntosDeControl = [-1.5, 0.25, 0.0, -0.75, 1.5, 0.0, 0.75, 1.5, 0.0, 1.5, 0.25, 0.0];

	ConstructorBahia.prototype.construirEstructura.call(this,puntosDeControl,intervaloDelPaso,1);
	
}