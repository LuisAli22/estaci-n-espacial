function Director(constructor){

	constructor.definirMaterial();
	constructor.compilar();

	return constructor.obtenerComponente();

}

