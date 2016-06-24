ConstructorTapaDelnteraTurbina.prototype=new Constructor;
ConstructorTapaDelnteraTurbina.prototype.constructor=ConstructorTapaDelnteraTurbina;
function ConstructorTapaDelnteraTurbina(){

	Constructor.call(this);
	var puntosDeControl = [ 0.0, -0.875, 0.0, 0.0, -0.875, 0.0, 0.0, -0.875, 0.0, 0.5, -0.875, 0.0,
    						0.5, -0.875, 0.0, 0.5, -0.875, 0.0];
	this.componente = new Turbina(puntosDeControl);

}

ConstructorTapaDelnteraTurbina.prototype.definirMaterial=function(){

	var material = new Material(this.componente.rows,this.componente.cols);

	material.cargarTextura(RUTAIMAGENNAVE);
	material.cargarCoordenadasDeTextura();
	material.autoIluminacion();
	//material.agregarTexturaIluminacion(RUTAIMAGENNAVE);

	Constructor.prototype.definirMaterial.call(this,material);

}