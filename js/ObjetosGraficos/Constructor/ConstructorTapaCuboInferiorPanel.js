ConstructorTapaCuboInferiorPanel.prototype=new Constructor;
ConstructorTapaCuboInferiorPanel.prototype.constructor=ConstructorTapaCuboInferiorPanel;
function ConstructorTapaCuboInferiorPanel(){

	Constructor.call(this);
	this.componente = new TapaCubo(1.0,-0.5,-1.0);

}

ConstructorTapaCuboInferiorPanel.prototype.definirMaterial=function(){

	var material = new Material(this.componente.rows,this.componente.cols);
	material.cargarTextura(RUTAIMAGENPANEL);
	material.cargarRepeticionDeTextura(3,32);
	material.cargarCoordenadasDeTextura();

	this.componente.inicializarLosBuffer();

	Constructor.prototype.definirMaterial.call(this,material);

}