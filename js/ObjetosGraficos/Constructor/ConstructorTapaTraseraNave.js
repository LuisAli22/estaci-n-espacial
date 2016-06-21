ConstructorTapaTraseraNave.prototype=new Constructor;
ConstructorTapaTraseraNave.prototype.constructor=ConstructorTapaTraseraNave;
function ConstructorTapaTraseraNave(){

	Constructor.call(this);
	this.componente = new TapaNave();
	
}

ConstructorTapaTraseraNave.prototype.definirMaterial=function(){

	var material = new Material(this.componente.rows,this.componente.cols);

	material.cargarTextura(RUTAIMAGENNAVE);
	material.conReflexionEspecular();
	material.cargarCoordenadasDeTextura();
	this.componente.tapaTrasera();

	Constructor.prototype.definirMaterial.call(this,material);

}