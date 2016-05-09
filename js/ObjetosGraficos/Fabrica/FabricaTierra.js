function FabricaTierra(){}
FabricaTierra.prototype.crear=function(matrizModelado){
  var esfera = new Esfera(64, 64,CELESTE);
  var tierra= new Tierra(esfera);
  //esfera.inicializarTextura(RUTAIMAGENMARTE);
  return tierra;
}
