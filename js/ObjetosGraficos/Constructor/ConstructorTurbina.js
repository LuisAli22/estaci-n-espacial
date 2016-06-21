ConstructorTurbina.prototype=new Constructor;
ConstructorTurbina.prototype.constructor=ConstructorTurbina;
function ConstructorTurbina(){

	Constructor.call(this);
	this.componente = new Turbina();

}

ConstructorTurbina.prototype.definirMaterial=function(){

	var material = new Material(this.componente.rows,this.componente.cols);

	material.cargarTextura(RUTAIMAGENSOL);
	material.cargarCoordenadasDeTextura();

	Constructor.prototype.definirMaterial.call(this,material);

}