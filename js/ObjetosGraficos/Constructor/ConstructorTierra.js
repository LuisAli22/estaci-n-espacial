ConstructorTierra.prototype=new Constructor;
ConstructorTierra.prototype.constructor=ConstructorTierra;
function ConstructorTierra(){

	Constructor.call(this);
	this.componente = new Esfera(64, 64,CELESTE,1.0);
	
}

ConstructorTierra.prototype.definirMaterial=function(){

	var material = new Material(this.componente.rows,this.componente.cols);

	material.cargarTextura(RUTAIMAGENTIERRA);
	material.cargarCoordenadasDeTextura();

	Constructor.prototype.definirMaterial.call(this,material);

}