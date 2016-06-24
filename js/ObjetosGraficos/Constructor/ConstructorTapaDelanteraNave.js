ConstructorTapaDelanteraNave.prototype=new Constructor;
ConstructorTapaDelanteraNave.prototype.constructor=ConstructorTapaDelanteraNave;
function ConstructorTapaDelanteraNave(){

	Constructor.call(this);
	this.componente = new TapaNave();
	
}

ConstructorTapaDelanteraNave.prototype.definirMaterial=function(){

	var material = new Material(this.componente.rows,this.componente.cols);

	material.cargarTextura(RUTAIMAGENNAVE);
	material.conReflexionEspecular();
	material.cargarCoordenadasDeTextura();
	material.agregarTexturaReflexion(RUTAIMAGENREFLEXION);
	this.componente.tapaDelantera();

	Constructor.prototype.definirMaterial.call(this,material);

}