ConstructorCilindroEjeNave.prototype=new Constructor;
ConstructorCilindroEjeNave.prototype.constructor=ConstructorCilindroEjeNave;
function ConstructorCilindroEjeNave(){
	Constructor.call(this);
	this.componente = new Cilindro(64,64,BEIS,0,0.0);
}

ConstructorCilindroEjeNave.prototype.definirMaterial=function(){

	var material = new Material(this.componente.rows,this.componente.cols);

	material.cargarAmbiente(vec3.fromValues(0.25,0.20725,0.20725));
	material.cargarDifusa(vec3.fromValues(1,0.829,0.829));
	material.cargarCoordenadasDeTextura();

	Constructor.prototype.definirMaterial.call(this,material);

}