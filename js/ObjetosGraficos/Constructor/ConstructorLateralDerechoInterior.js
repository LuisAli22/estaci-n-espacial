ConstructorLateralDerechoInterior.prototype=new ConstructorBahia;
ConstructorLateralDerechoInterior.prototype.constructor=ConstructorLateralDerechoInterior;
function ConstructorLateralDerechoInterior(){

	ConstructorBahia.call(this);

}

ConstructorLateralDerechoInterior.prototype.definirMaterial=function(){

	var material = new Material(120,30);
	material.cargarRepeticionDeTextura(4,1);
	material.cargarTextura(RUTAIMAGENPAREDINTERIOR);
	material.cargarInico(0.0,1.0);
	material.cargarSigno(1.0,-1.0);
	material.agregarLuzBahia();

	var intervaloDelPaso = [30];

	var puntosDeControlInterior = [1.0, 0.5, 0.0, 1.0, 0.166, 0.0, 1.0, -0.166, 0.0, 1.0, -0.5, 0.0];

	ConstructorBahia.prototype.construirEstructura.call(this,puntosDeControlInterior,intervaloDelPaso,-1,material);
	

}