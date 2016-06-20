ConstructorBahia.prototype=new Constructor;
ConstructorBahia.prototype.constructor=ConstructorBahia;
function ConstructorBahia(){

	this.componente = new ComponenteBahia(FILASESTACIONESPACIAL,30,1.0);

}
ConstructorBahia.prototype.getComponenteBahia=function(){

	return this.componente;

}
ConstructorBahia.prototype.setMaterial=function(material){

	this.componente.setMaterial(material);

}

ConstructorBahia.prototype.construirEstructura=function(puntosDeControl,intervaloDelPaso,sentidoNormal,material){

	material.cargarCoordenadasDeTextura();
	this.componente.setMaterial(material);

	var coordenadas = [];
	var normales = [];
	var tangentes = [];
	var binormales = [];

	var calculardorDePuntosDeCurva = new CalcularCurva();
	calculardorDePuntosDeCurva.obtenerPuntosDeBezierXY(puntosDeControl,intervaloDelPaso,coordenadas,normales,tangentes,binormales,sentidoNormal);

	this.componente.cargarBuffers(coordenadas,normales,tangentes,binormales);

	this.componente.guardarMaterial(material);

	//Constructor.prototype.definirMaterial.call(material);

}