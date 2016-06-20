ConstructorTapaCuboEjesInferior.prototype=new Constructor;
ConstructorTapaCuboEjesInferior.prototype.constructor=ConstructorTapaCuboEjesInferior;
function ConstructorTapaCuboEjesInferior(){

	Constructor.call(this);
	this.componente = new TapaCubo(1.0,-0.5,-1.0);

}

ConstructorTapaCuboEjesInferior.prototype.definirMaterial=function(){

	var material = new Material(this.componente.rows,this.componente.cols);
	material.cargarTextura(RUTAIMAGENPANEL);
	material.cargarCoordenadasDeTextura();

	this.componente.inicializarLosBuffer();

	Constructor.prototype.definirMaterial.call(this,material);
	
}