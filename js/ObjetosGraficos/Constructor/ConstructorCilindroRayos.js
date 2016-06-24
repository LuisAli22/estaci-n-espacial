ConstructorCilindroRayos.prototype=new Constructor;
ConstructorCilindroRayos.prototype.constructor=ConstructorCilindroRayos;
function ConstructorCilindroRayos(){

	Constructor.call(this);
	this.componente = new DecoradorObjetoGrafico(cilindroConTextura);

}

ConstructorCilindroRayos.prototype.definirMaterial=function(){

	var material = new Material(this.componente.rows,this.componente.cols);

	material.cargarTextura(RUTAIMAGENRAYOS);
	material.cargarCoordenadasDeTextura();
	material.agregarTexturaReflexion(RUTAIMAGENREFLEXION);

	Constructor.prototype.definirMaterial.call(this,material);

}