function FabricaTierra(){}
FabricaTierra.prototype.crear=function(matrizModelado){
  var esfera = new Esfera(64, 64,CELESTE);
  var material = new Material(RUTAIMAGENTIERRA,1.0,1.0,64,64);
  material.cargar();
  esfera.setMaterial(material);
  var tierra= new Tierra(esfera);
  return tierra;
}
