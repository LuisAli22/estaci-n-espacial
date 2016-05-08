function ObjetoGraficoCompuesto(){
  this.componentes=[];
}
ObjetoGraficoCompuesto.prototype.dibujar = function(matrizModelado){
  for(indiceComponente in this.componentes){
    this.componentes[indiceComponente].dibujar(matrizModelado);
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
ObjetoGraficoCompuesto.prototype.agregar=function(objetoGrafico){
  this.componentes.push(objetoGrafico);
}
ObjetoGraficoCompuesto.prototype.obtenerHijo=function(pos){
  return this.componentes[pos];
}
