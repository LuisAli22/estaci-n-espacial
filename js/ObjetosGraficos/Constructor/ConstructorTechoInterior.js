ConstructorTechoInterior.prototype=new ConstructorBahia;
ConstructorTechoInterior.prototype.constructor=ConstructorTechoInterior;
function ConstructorTechoInterior(){

	ConstructorBahia.call(this);

}

ConstructorTechoInterior.prototype.definirMaterial=function(){

	var material = new Material(120,30);
	material.cargarRepeticionDeTextura(8,1);
	material.cargarTextura(RUTAIMAGENTECHOINTERIOR);
	material.noEsIluminadoPorElSol();

	var intervaloDelPaso = [30];

	var puntosDeControlInterior = [-1.0, 0.5, 0.0, -0.25, 1.0, 0.0, 0.25, 1.0, 0.0, 1.0, 0.5, 0.0];

	ConstructorBahia.prototype.construirEstructura.call(this,puntosDeControlInterior,intervaloDelPaso,-1,material);

}