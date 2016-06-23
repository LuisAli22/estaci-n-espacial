ConstructorTechoExterior.prototype=new ConstructorBahia;
ConstructorTechoExterior.prototype.constructor=ConstructorTechoExterior;
function ConstructorTechoExterior(){

	ConstructorBahia.call(this);

}

ConstructorTechoExterior.prototype.definirMaterial=function(){

	var material = new Material(120,30);
	material.cargarRepeticionDeTextura(4,1);
	material.cargarTextura(RUTAIMAGENEXTERIOR);
	material.agregarTexturaNormal(RUTAIMAGENEXTERIORNORMAL);

	var intervaloDelPaso = [30];

	var puntosDeControl = [-1.5, 0.25, 0.0, -0.75, 1.5, 0.0, 0.75, 1.5, 0.0, 1.5, 0.25, 0.0];

	ConstructorBahia.prototype.construirEstructura.call(this,puntosDeControl,intervaloDelPaso,1,material);
	
}