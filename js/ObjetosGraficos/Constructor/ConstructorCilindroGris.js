ConstructorCilindroGris.prototype=new Constructor;
ConstructorCilindroGris.prototype.constructor=ConstructorCilindroGris;
function ConstructorCilindroGris(){

	Constructor.call(this);
	this.componente = new Cilindro(64,64,GRIS,0,0.0);

}

ConstructorCilindroGris.prototype.definirMaterial=function(){

	var material = new Material(this.componente.rows,this.componente.cols);

	material.cargarAmbiente(vec3.fromValues(0.19225,0.19225,0.19225));
	material.cargarDifusa(vec3.fromValues(0.50754,0.50754,0.50754));
	material.sinTextura(GRIS);
	material.cargarCoordenadasDeTextura();

	Constructor.prototype.definirMaterial.call(this,material);

}