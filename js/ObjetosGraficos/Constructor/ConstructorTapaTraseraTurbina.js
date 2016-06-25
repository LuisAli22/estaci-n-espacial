ConstructorTapaTraseraTurbina.prototype=new Constructor;
ConstructorTapaTraseraTurbina.prototype.constructor=ConstructorTapaTraseraTurbina;
function ConstructorTapaTraseraTurbina(){

	Constructor.call(this);
	var puntosDeControl = [ 0.25, 0.875, 0.0, 0.25, 0.875, 0.0, 0.25, 0.875, 0.0,
    						0.0, 0.875, 0.0, 0.0, 0.875, 0.0, 0.0, 0.875, 0.0];
	this.componente = new Turbina(puntosDeControl);

}

ConstructorTapaTraseraTurbina.prototype.definirMaterial=function(){

	var material = new Material(this.componente.rows,this.componente.cols);

	material.cargarTextura(RUTAIMAGENNAVE);
	material.cargarCoordenadasDeTextura();
	material.autoIluminacion(vec3.fromValues(6.0,6.0,6.0));

	Constructor.prototype.definirMaterial.call(this,material);

}