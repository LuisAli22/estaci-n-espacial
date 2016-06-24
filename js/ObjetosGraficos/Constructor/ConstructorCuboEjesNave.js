ConstructorCuboEjesNave.prototype=new Constructor;
ConstructorCuboEjesNave.prototype.constructor=ConstructorCuboEjesNave;
function ConstructorCuboEjesNave(){

	Constructor.call(this);

	this.componente = new Cubo(6.0);

}

ConstructorCuboEjesNave.prototype.definirMaterial=function(){

	var material = new Material(this.componente.rows,this.componente.cols);

	material.cargarAmbiente(vec3.fromValues(0.25,0.20725,0.20725));
	material.cargarDifusa(vec3.fromValues(1,0.829,0.829));
	material.sinTextura(GRIS);
	material.cargarCoordenadasDeTextura();


	this.componente.inicializarLosBuffer();

	Constructor.prototype.definirMaterial.call(this,material);

	this.componente.agregarTapa(new Director( new ConstructorTapaCuboEjesInferior()));
	this.componente.agregarTapa(new Director( new ConstructorTapaCuboEjesSuperior()));

}