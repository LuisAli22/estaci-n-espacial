function ConstructorBahia(material){

	this.componenteBahia = new ComponenteBahia(FILASESTACIONESPACIAL,30,material);

}
ConstructorBahia.prototype.getComponenteBahia=function(){

	return this.componenteBahia;

}
ConstructorBahia.prototype.setMaterial=function(material){

	this.componenteBahia.setMaterial(material);

}

ConstructorBahia.prototype.construirEstructura=function(puntosDeControl,intervaloDelPaso,sentidoNormal,material){

	this.componenteBahia.setMaterial(material);

	var coordenadas = [];
	var normales = [];
	var tangentes = [];
	var binormales = [];

	var calculardorDePuntosDeCurva = new CalcularCurva();
	calculardorDePuntosDeCurva.obtenerPuntosDeBezierXY(puntosDeControl,intervaloDelPaso,coordenadas,normales,tangentes,binormales,sentidoNormal);

	this.componenteBahia.cargarBuffers(coordenadas,normales,tangentes,binormales);

}