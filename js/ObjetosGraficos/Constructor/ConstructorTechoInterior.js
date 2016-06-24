ConstructorTechoInterior.prototype=new ConstructorBahia;
ConstructorTechoInterior.prototype.constructor=ConstructorTechoInterior;
function ConstructorTechoInterior(){

	ConstructorBahia.call(this);

}

ConstructorTechoInterior.prototype.definirMaterial=function(){

	var material = new Material(120,30);
	material.cargarRepeticionDeTextura(4,1);
	material.cargarTextura(RUTAIMAGENTECHOINTERIOR);
	material.agregarTexturaIluminacion(RUTAIMAGENTECHOINTERIORILUMINACION);
	//material.noEsIluminadoPorElSol();
	material.agregarLuzBahia();

	var intervaloDelPaso = [30];

	var puntosDeControlInterior = [-1.0, 0.5, 0.0, -0.25, 1.0, 0.0, 0.25, 1.0, 0.0, 1.0, 0.5, 0.0];
	//this.componente.si = true;
	ConstructorBahia.prototype.construirEstructura.call(this,puntosDeControlInterior,intervaloDelPaso,-1,material);

}