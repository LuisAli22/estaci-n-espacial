function FabricaTierra(){}
FabricaTierra.prototype.crear=function(matrizModelado){
  var esfera = new Esfera(64, 64,CELESTE);

  var material = new Material(64,64);
  material.cargarTextura(RUTAIMAGENTIERRA);
  material.cargarCoordenadasDeTextura();

  esfera.setMaterial(material);
  var tierra= new Tierra(esfera);
  return tierra;
}
