ConstructorTierra.prototype=new Constructor;
ConstructorTierra.prototype.constructor=ConstructorTierra;
function ConstructorTierra(){

	Constructor.call(this);
	this.componente = new DecoradorObjetoGrafico(esferaConTextura);
	
}

ConstructorTierra.prototype.definirMaterial=function(){

	var material = new Material(this.componente.rows,this.componente.cols);

	material.cargarTextura(RUTAIMAGENTIERRA);
	material.cargarCoordenadasDeTextura();
	material.noEsIluminadoPorLaTierra();

	Constructor.prototype.definirMaterial.call(this,material);

}