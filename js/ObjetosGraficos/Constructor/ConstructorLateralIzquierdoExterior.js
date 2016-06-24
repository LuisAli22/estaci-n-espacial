ConstructorLateralIzquierdoExterior.prototype=new ConstructorBahia;
ConstructorLateralIzquierdoExterior.prototype.constructor=ConstructorLateralIzquierdoExterior;
function ConstructorLateralIzquierdoExterior(){

	ConstructorBahia.call(this);

}

ConstructorLateralIzquierdoExterior.prototype.definirMaterial=function(){

	var material = new Material(120,30);
	material.cargarRepeticionDeTextura(4,1);
	material.cargarTextura(RUTAIMAGENVENTANALEXTERIOR);
	material.agregarTexturaIluminacion(RUTAIMAGENVENTANALEXTERIORILUMINACION);
	material.cargarFactorIluminacion(1.0);

	var intervaloDelPaso = [10,10,10];

	var puntosDeControl = [-1.5, -0.25, 0.0, -1.4166, -0.25, 0.0, -1.333, -0.25, 0.0, -1.25, -0.25, 0.0,
                       	   -1.25, -0.25, 0.0, -1.5, -0.125, 0.0, -1.5, 0.125, 0.0, -1.25, 0.25, 0.0,
                           -1.25, 0.25, 0.0, -1.333, 0.25, 0.0, -1.4166, 0.25, 0.0, -1.5, 0.25, 0.0];

	ConstructorBahia.prototype.construirEstructura.call(this,puntosDeControl,intervaloDelPaso,1,material);
	
}