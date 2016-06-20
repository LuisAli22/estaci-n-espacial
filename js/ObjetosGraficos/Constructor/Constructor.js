//Objeto Abstracto
function Constructor(){

	this.componente;

}
Constructor.prototype.obtenerComponente=function(){

	return this.componente;

}
Constructor.prototype.definirMaterial=function(material){

	//this.componente.guardarMaterial(material);

}
Constructor.prototype.compilar=function(){

	this.componente.compilar();

}