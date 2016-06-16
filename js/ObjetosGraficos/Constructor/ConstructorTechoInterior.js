ConstructorTechoInterior.prototype=new ConstructorBahia;
ConstructorTechoInterior.prototype.constructor=ConstructorTechoInterior;
function ConstructorTechoInterior(material){

	ConstructorBahia.call(this,material);
	this.construirEstructura();
}

ConstructorTechoInterior.prototype.construirEstructura=function(){

	var material = new Material(RUTAIMAGENTECHOINTERIOR,8.0,1.0,120,30);
	material.cargar();

	var intervaloDelPaso = [30];

	var puntosDeControlInterior = [-1.0, 0.5, 0.0, -0.25, 1.0, 0.0, 0.25, 1.0, 0.0, 1.0, 0.5, 0.0];

	ConstructorBahia.prototype.construirEstructura.call(this,puntosDeControlInterior,intervaloDelPaso,-1,material);

}