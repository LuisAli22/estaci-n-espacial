ConstructorEscotilla.prototype=new Constructor;
ConstructorEscotilla.prototype.constructor=ConstructorEscotilla;
function ConstructorEscotilla(){

	Constructor.call(this);
	this.componente = new DecoradorObjetoGrafico(cilindroConTextura);

}

ConstructorEscotilla.prototype.definirMaterial=function(){

	var material = new Material(this.componente.rows,this.componente.cols);

	material.cargarTextura(RUTAIMAGENTAPA);
	material.cargarCoordenadasDeTextura();

	Constructor.prototype.definirMaterial.call(this,material);

}