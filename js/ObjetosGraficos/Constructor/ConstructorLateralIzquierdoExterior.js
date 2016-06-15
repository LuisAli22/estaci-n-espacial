ConstructorLateralIzquierdoExterior.prototype=new ConstructorBahia;
ConstructorLateralIzquierdoExterior.prototype.constructor=ConstructorLateralIzquierdoExterior;
function ConstructorLateralIzquierdoExterior(material){

	ConstructorBahia.call(this,material);
	this.construirEstructura();
}

ConstructorLateralIzquierdoExterior.prototype.construirEstructura=function(){

	var intervaloDelPaso = [10,10,10];

	var puntosDeControl = [-1.5, -0.25, 0.0, -1.4166, -0.25, 0.0, -1.333, -0.25, 0.0, -1.25, -0.25, 0.0,
                       	   -1.25, -0.25, 0.0, -1.5, -0.125, 0.0, -1.5, 0.125, 0.0, -1.25, 0.25, 0.0,
                           -1.25, 0.25, 0.0, -1.333, 0.25, 0.0, -1.4166, 0.25, 0.0, -1.5, 0.25, 0.0];

	ConstructorBahia.prototype.construirEstructura.call(this,puntosDeControl,intervaloDelPaso,1);
	
}