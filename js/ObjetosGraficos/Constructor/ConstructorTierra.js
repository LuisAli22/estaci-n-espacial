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
	material.autoIluminacion(vec3.fromValues(0.17,0.27,0.31));
	material.agregarTexturaNormal("img/earthN.jpg");

	Constructor.prototype.definirMaterial.call(this,material);

}