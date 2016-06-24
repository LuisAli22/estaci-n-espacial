ConstructorTierra.prototype=new Constructor;
ConstructorTierra.prototype.constructor=ConstructorTierra;
function ConstructorTierra(){

	Constructor.call(this);
	this.componente = new DecoradorObjetoGrafico(esferaConTextura);
	
}

ConstructorTierra.prototype.definirMaterial=function(){

	var material = new Material(this.componente.rows,this.componente.cols);

	material.cargarTextura(RUTAIMAGENTIERRA);
	material.cargarCoordenadasDeTextura();
	material.noEsIluminadoPorLaTierra();
	material.conReflexionEspecular();
	material.cargarBrillo(50.0);
	material.agregarTexturaIluminacion(RUTAIMAGENRESPLANDORTIERRA);
	material.cargarFactorIluminacion(0.5);

	Constructor.prototype.definirMaterial.call(this,material);

}