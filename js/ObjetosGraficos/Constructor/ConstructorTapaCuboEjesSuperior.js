ConstructorTapaCuboEjesSuperior.prototype=new Constructor;
ConstructorTapaCuboEjesSuperior.prototype.constructor=ConstructorTapaCuboEjesSuperior;
function ConstructorTapaCuboEjesSuperior(){

	Constructor.call(this);
	this.componente = new TapaCubo(1.0,0.5,1.0);

}

ConstructorTapaCuboEjesSuperior.prototype.definirMaterial=function(){

	var material = new Material(this.componente.rows,this.componente.cols);
	material.cargarTextura(RUTAIMAGENPANEL);
	material.cargarCoordenadasDeTextura();

	this.componente.inicializarLosBuffer();

	Constructor.prototype.definirMaterial.call(this,material);
	
}