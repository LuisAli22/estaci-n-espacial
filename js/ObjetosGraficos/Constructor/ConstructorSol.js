ConstructorSol.prototype=new Constructor;
ConstructorSol.prototype.constructor=ConstructorSol;
function ConstructorSol(){

	Constructor.call(this);
	this.componente = new Esfera(64, 64,AMARILLO,1.0);
	
}

ConstructorSol.prototype.definirMaterial=function(){

	var material = new Material(this.componente.rows,this.componente.cols);

	material.cargarTextura(RUTAIMAGENSOL);
	material.cargarCoordenadasDeTextura();
	material.noEsIluminadoPorElSol();

	Constructor.prototype.definirMaterial.call(this,material);

}