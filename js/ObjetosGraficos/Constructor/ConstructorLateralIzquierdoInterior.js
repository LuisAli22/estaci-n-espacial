ConstructorLateralIzquierdoInterior.prototype=new ConstructorBahia;
ConstructorLateralIzquierdoInterior.prototype.constructor=ConstructorLateralIzquierdoInterior;
function ConstructorLateralIzquierdoInterior(){

	ConstructorBahia.call(this);

}

ConstructorLateralIzquierdoInterior.prototype.definirMaterial=function(){

	var material = new Material(120,30);
	material.cargarRepeticionDeTextura(4,1);
	material.cargarTextura(RUTAIMAGENPAREDINTERIOR);
	material.noEsIluminadoPorElSol();

	var intervaloDelPaso = [30];

	var puntosDeControlInterior = [-1.0, -0.5, 0.0, -1.0, -0.166, 0.0, -1.0, 0.166, 0.0, -1.0, 0.5, 0.0];

	ConstructorBahia.prototype.construirEstructura.call(this,puntosDeControlInterior,intervaloDelPaso,-1,material);

}