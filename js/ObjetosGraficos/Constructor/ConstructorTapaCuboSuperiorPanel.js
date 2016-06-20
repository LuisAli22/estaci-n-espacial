ConstructorTapaCuboSuperiorPanel.prototype=new Constructor;
ConstructorTapaCuboSuperiorPanel.prototype.constructor=ConstructorTapaCuboSuperiorPanel;
function ConstructorTapaCuboSuperiorPanel(){

	Constructor.call(this);
	this.componente = new TapaCubo(1.0,0.5,1.0);

}

ConstructorTapaCuboSuperiorPanel.prototype.definirMaterial=function(){

	var material = new Material(this.componente.rows,this.componente.cols);
	material.cargarTextura(RUTAIMAGENPANEL);
	material.cargarRepeticionDeTextura(3,32);
	material.cargarCoordenadasDeTextura();

	this.componente.inicializarLosBuffer();

	Constructor.prototype.definirMaterial.call(this,material);
	

}