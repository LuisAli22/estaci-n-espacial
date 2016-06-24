ConstructorUniverso.prototype=new Constructor;
ConstructorUniverso.prototype.constructor=ConstructorUniverso;
function ConstructorUniverso(){

	Constructor.call(this);
	this.componente = new DecoradorObjetoGrafico(esferaConTextura);
	
}

ConstructorUniverso.prototype.definirMaterial=function(){

	var material = new Material(this.componente.rows,this.componente.cols);

	material.cargarTextura(RUTAIMAGENUNIVERSO);
	material.cargarCoordenadasDeTextura();
	material.noEsIluminadoPorElSol();

	Constructor.prototype.definirMaterial.call(this,material);

}