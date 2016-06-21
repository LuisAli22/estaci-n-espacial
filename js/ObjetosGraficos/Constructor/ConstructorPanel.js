ConstructorPanel.prototype=new Constructor;
ConstructorPanel.prototype.constructor=ConstructorPanel;
function ConstructorPanel(){

	Constructor.call(this);
	
	this.componente = new Cubo(6.0);

}

ConstructorPanel.prototype.definirMaterial=function(){

	var material = new Material(this.componente.rows,this.componente.cols);

	material.sinTextura(NEGRO);
	material.cargarCoordenadasDeTextura();

	this.componente.inicializarLosBuffer();

	Constructor.prototype.definirMaterial.call(this,material);

	this.componente.agregarTapa(new Director( new ConstructorTapaCuboInferiorPanel()));
	this.componente.agregarTapa(new Director( new ConstructorTapaCuboSuperiorPanel()));

}