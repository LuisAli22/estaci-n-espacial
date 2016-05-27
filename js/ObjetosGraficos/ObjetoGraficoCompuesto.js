function ObjetoGraficoCompuesto(){
  this.componentes={};
}
ObjetoGraficoCompuesto.prototype.dibujar = function(){
  for(indiceComponente in this.componentes){
    this.componentes[indiceComponente].dibujar();
  }
}
ObjetoGraficoCompuesto.prototype.inicializarTextura=function(){
  for(indiceComponente in this.componentes){
    this.componentes[indiceComponente].inicializarTextura(RUTAIMAGENMARTE);
  }
}
ObjetoGraficoCompuesto.prototype.generarMipMap=function (){
  for(indiceComponente in this.componentes){
    this.componentes[indiceComponente].generarMipMap();
  }
}
ObjetoGraficoCompuesto.prototype.agregar=function(clave,objetoGrafico){
  this.componentes[clave]=objetoGrafico;
}
ObjetoGraficoCompuesto.prototype.obtenerHijo=function(clave){
  return this.componentes[clave];
}
/*ObjetoGraficoCompuesto.prototype.longitud=function(){
  return this.componentes.length;
}*/
