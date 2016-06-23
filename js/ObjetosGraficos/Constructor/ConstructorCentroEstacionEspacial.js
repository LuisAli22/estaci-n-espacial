ConstructorCentroEstacionEspacial.prototype=new Constructor;
ConstructorCentroEstacionEspacial.prototype.constructor=ConstructorCentroEstacionEspacial;
function ConstructorCentroEstacionEspacial(){

	Constructor.call(this);
	this.componente = new CentroEstacionEspacial(BEIS);
	
}

ConstructorCentroEstacionEspacial.prototype.definirMaterial=function(){

	var material = new Material(this.componente.rows,this.componente.cols);

	material.cargarTextura(RUTAIMAGENEXTERIOR);
	material.cargarRepeticionDeTextura(1,16);
    material.cargarCoordenadasDeTextura();
    material.agregarTexturaNormal(RUTAIMAGENEXTERIORNORMAL);

	Constructor.prototype.definirMaterial.call(this,material);

}