function DecoradorObjetoGrafico(objeto){
  this.objeto=objeto;
  this.material;
}
DecoradorObjetoGrafico.prototype.guardarMaterial=function(material){
  this.material = material;
}
DecoradorObjetoGrafico.prototype.compilar=function(){
  
}
DecoradorObjetoGrafico.prototype.inicializarTextura=function(){
	this.objeto.guardarMaterial(this.material);
  	this.objeto.inicializarTextura();
}
DecoradorObjetoGrafico.prototype.generarMipMap=function (){
	this.objeto.guardarMaterial(this.material);
  	this.objeto.generarMipMap();
}
DecoradorObjetoGrafico.prototype.dibujar=function (){
	this.objeto.guardarMaterial(this.material);
  	this.objeto.dibujar();
}