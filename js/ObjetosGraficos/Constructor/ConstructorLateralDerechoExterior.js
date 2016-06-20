ConstructorLateralDerechoExterior.prototype=new ConstructorBahia;
ConstructorLateralDerechoExterior.prototype.constructor=ConstructorLateralDerechoExterior;
function ConstructorLateralDerechoExterior(){

	ConstructorBahia.call(this);

}

ConstructorLateralDerechoExterior.prototype.definirMaterial=function(){

	var material = new Material(120,30);
	material.cargarRepeticionDeTextura(4,1);
	material.cargarTextura(RUTAIMAGENEXTERIOR);

	var intervaloDelPaso = [10,10,10];

	var puntosDeControl = [1.5, 0.25, 0.0, 1.4166, 0.25, 0.0, 1.333, 0.25, 0.0, 1.25, 0.25, 0.0,
                           1.25, 0.25, 0.0, 1.5, 0.125, 0.0, 1.5, -0.125, 0.0, 1.25, -0.25, 0.0,
                           1.25, -0.25, 0.0, 1.333, -0.25, 0.0, 1.4166, -0.25, 0.0, 1.5, -0.25, 0.0];

	ConstructorBahia.prototype.construirEstructura.call(this,puntosDeControl,intervaloDelPaso,1,material);
	
}