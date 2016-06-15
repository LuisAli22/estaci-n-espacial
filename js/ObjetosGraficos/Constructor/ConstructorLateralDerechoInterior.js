ConstructorLateralDerechoInterior.prototype=new ConstructorBahia;
ConstructorLateralDerechoInterior.prototype.constructor=ConstructorLateralDerechoInterior;
function ConstructorLateralDerechoInterior(material){

	ConstructorBahia.call(this,material);
	this.construirEstructura();
}

ConstructorLateralDerechoInterior.prototype.construirEstructura=function(){

	var intervaloDelPaso = [30];

	var puntosDeControlInterior = [1.0, 0.5, 0.0, 1.0, 0.166, 0.0, 1.0, -0.166, 0.0, 1.0, -0.5, 0.0];

	ConstructorBahia.prototype.construirEstructura.call(this,puntosDeControlInterior,intervaloDelPaso,-1);
	

}