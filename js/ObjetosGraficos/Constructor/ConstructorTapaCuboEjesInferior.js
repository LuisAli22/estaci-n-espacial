ConstructorTapaCuboEjesInferior.prototype=new Constructor;
ConstructorTapaCuboEjesInferior.prototype.constructor=ConstructorTapaCuboEjesInferior;
function ConstructorTapaCuboEjesInferior(){

	Constructor.call(this);
	this.componente = new TapaCubo(1.0,-0.5,-1.0);

}

ConstructorTapaCuboEjesInferior.prototype.definirMaterial=function(){

	var material = new Material(this.componente.rows,this.componente.cols);
	material.cargarAmbiente(vec3.fromValues(0.25,0.20725,0.20725));
	material.cargarDifusa(vec3.fromValues(1,0.829,0.829));
	material.sinTextura(GRIS);
	material.cargarCoordenadasDeTextura();

	this.componente.inicializarLosBuffer();

	Constructor.prototype.definirMaterial.call(this,material);
	
}