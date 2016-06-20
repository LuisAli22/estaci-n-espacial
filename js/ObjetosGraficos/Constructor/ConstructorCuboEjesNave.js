ConstructorCuboEjesNave.prototype=new Constructor;
ConstructorCuboEjesNave.prototype.constructor=ConstructorCuboEjesNave;
function ConstructorCuboEjesNave(){

	Constructor.call(this);

	this.componente = new Cubo(6.0);

}

ConstructorCuboEjesNave.prototype.definirMaterial=function(){

	var material = new Material(this.componente.rows,this.componente.cols);

	material.cargarTextura(RUTAIMAGENTAPA);
	material.cargarCoordenadasDeTextura();

	this.componente.inicializarLosBuffer();

	Constructor.prototype.definirMaterial.call(this,material);

	this.componente.agregarTapa(new Director( new ConstructorTapaCuboEjesInferior()));
	this.componente.agregarTapa(new Director( new ConstructorTapaCuboEjesSuperior()));

}