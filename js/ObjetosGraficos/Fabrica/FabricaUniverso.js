function FabricaUniverso(){}
FabricaUniverso.prototype.crear=function(){
  console.log("Crear universo");
  var esfera = new Esfera(64, 64,AMARILLO);

  var material = new Material(64,64);
  material.cargarTextura(RUTAIMAGENUNIVERSO);
  material.cargarCoordenadasDeTextura();

  esfera.setMaterial(material);
  var universo=new Universo(esfera);
  return universo;
}
