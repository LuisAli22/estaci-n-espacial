ConstructorAstronauta.prototype=new Constructor;
ConstructorAstronauta.prototype.constructor=ConstructorAstronauta;
function ConstructorAstronauta(){

	Constructor.call(this);
	this.componente = new Plano();
	
}

ConstructorAstronauta.prototype.definirMaterial=function(){

	var material = new Material(this.componente.rows,this.componente.cols);

	material.cargarTextura(RUTAIMAGENASTRONAUTA);
	material.cargarCoordenadasDeTextura();

	Constructor.prototype.definirMaterial.call(this,material);

}