ConstructorCilindroBasePatasNave.prototype=new Constructor;
ConstructorCilindroBasePatasNave.prototype.constructor=ConstructorCilindroBasePatasNave;
function ConstructorCilindroBasePatasNave(){

	Constructor.call(this);
	this.componente = new Cilindro(64,64,BEIS,0);

}

ConstructorCilindroBasePatasNave.prototype.definirMaterial=function(){

	var material = new Material(this.componente.rows,this.componente.cols);

	material.cargarTextura(RUTAIMAGENSOL);
	material.cargarCoordenadasDeTextura();

	Constructor.prototype.definirMaterial.call(this,material);

}