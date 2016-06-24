ConstructorPisoInterior.prototype=new ConstructorBahia;
ConstructorPisoInterior.prototype.constructor=ConstructorPisoInterior;
function ConstructorPisoInterior(){

	ConstructorBahia.call(this);

}

ConstructorPisoInterior.prototype.definirMaterial=function(){

	var material = new Material(120,30);
	material.cargarRepeticionDeTextura(4,1);
	material.cargarTextura(RUTAIMAGENPISOINTERIOR);
	//material.noEsIluminadoPorElSol();
	material.agregarLuzBahia();

	var intervaloDelPaso = [30];

	var puntosDeControl = [1.0, -0.5, 0.0, 0.333, -0.5, 0.0, -0.333, -0.5, 0.0, -1.0, -0.5, 0.0];

	ConstructorBahia.prototype.construirEstructura.call(this,puntosDeControl,intervaloDelPaso,-1,material);

}