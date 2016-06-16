ConstructorPisoInterior.prototype=new ConstructorBahia;
ConstructorPisoInterior.prototype.constructor=ConstructorPisoInterior;
function ConstructorPisoInterior(material){

	ConstructorBahia.call(this,material);
	this.construirEstructura();
}

ConstructorPisoInterior.prototype.construirEstructura=function(){

	var material = new Material(RUTAIMAGENPISOINTERIOR,4.0,1.0,120,30);
	material.cargar();

	var intervaloDelPaso = [30];

	var puntosDeControlInterior = [1.0, -0.5, 0.0, 0.333, -0.5, 0.0, -0.333, -0.5, 0.0, -1.0, -0.5, 0.0];

	ConstructorBahia.prototype.construirEstructura.call(this,puntosDeControlInterior,intervaloDelPaso,-1,material);

}