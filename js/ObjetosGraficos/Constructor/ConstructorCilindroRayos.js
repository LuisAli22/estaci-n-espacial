ConstructorCilindroRayos.prototype=new Constructor;
ConstructorCilindroRayos.prototype.constructor=ConstructorCilindroRayos;
function ConstructorCilindroRayos(){

	Constructor.call(this);
	this.componente = new Cilindro(64,64,BEIS,0);

}

ConstructorCilindroRayos.prototype.definirMaterial=function(){

	var material = new Material(this.componente.rows,this.componente.cols);

	material.cargarTextura(RUTAIMAGENRAYOS);
	material.cargarCoordenadasDeTextura();

	Constructor.prototype.definirMaterial.call(this,material);

}