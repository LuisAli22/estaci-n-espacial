ConstructorCuerpoNave.prototype=new Constructor;
ConstructorCuerpoNave.prototype.constructor=ConstructorCuerpoNave;
function ConstructorCuerpoNave(){

	Constructor.call(this);
	this.componente = new CuerpoNave();
	
}

ConstructorCuerpoNave.prototype.definirMaterial=function(){

	var material = new Material(this.componente.rows,this.componente.cols);

	material.cargarTextura(RUTAIMAGENNAVE);
	material.cargarCoordenadasDeTextura();
	material.conReflexionEspecular();

	Constructor.prototype.definirMaterial.call(this,material);

	this.componente.agregarTapa(new Director(new ConstructorTapaTraseraNave()));
	this.componente.agregarTapa(new Director(new ConstructorTapaDelanteraNave()));

}