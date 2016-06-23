ConstructorEscotilla.prototype=new Constructor;
ConstructorEscotilla.prototype.constructor=ConstructorEscotilla;
function ConstructorEscotilla(){

	Constructor.call(this);
	this.componente = new Cilindro(64,64,GRIS,0,1.0);

}

ConstructorEscotilla.prototype.definirMaterial=function(){

	var material = new Material(this.componente.rows,this.componente.cols);

	material.cargarTextura(RUTAIMAGENTAPA);
	material.cargarCoordenadasDeTextura();

	Constructor.prototype.definirMaterial.call(this,material);

}