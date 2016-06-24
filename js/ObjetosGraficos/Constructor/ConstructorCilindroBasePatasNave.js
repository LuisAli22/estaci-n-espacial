ConstructorCilindroBasePatasNave.prototype=new Constructor;
ConstructorCilindroBasePatasNave.prototype.constructor=ConstructorCilindroBasePatasNave;
function ConstructorCilindroBasePatasNave(){

	Constructor.call(this);
	this.componente = new Cilindro(64,64,BEIS,0,1.0);

}

ConstructorCilindroBasePatasNave.prototype.definirMaterial=function(){

	var material = new Material(this.componente.rows,this.componente.cols);

	material.cargarTextura(RUTAIMAGENNAVE);
	material.conReflexionEspecular();
	material.agregarTexturaReflexion(RUTAIMAGENREFLEXION);
	material.cargarCoordenadasDeTextura();

	Constructor.prototype.definirMaterial.call(this,material);

}