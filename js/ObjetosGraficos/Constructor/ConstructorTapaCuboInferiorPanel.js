ConstructorTapaCuboInferiorPanel.prototype=new Constructor;
ConstructorTapaCuboInferiorPanel.prototype.constructor=ConstructorTapaCuboInferiorPanel;
function ConstructorTapaCuboInferiorPanel(){

	Constructor.call(this);
	this.componente = new TapaCubo(1.0,-0.5,-1.0);

}

ConstructorTapaCuboInferiorPanel.prototype.definirMaterial=function(){

	var material = new Material(this.componente.rows,this.componente.cols);
	material.cargarTextura(RUTAIMAGENPANEL);
	material.cargarRepeticionDeTextura(3,10);
	material.cargarCoordenadasDeTextura();
	material.agregarTexturaNormal(RUTAIMAGENPANELNORMAL);
	material.agregarTexturaReflexion(RUTAIMAGENREFLEXION);
	material.conReflexionEspecular();

	this.componente.inicializarLosBuffer();

	Constructor.prototype.definirMaterial.call(this,material);

}