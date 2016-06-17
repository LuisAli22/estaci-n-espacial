function FabricaUniverso(){}
FabricaUniverso.prototype.crear=function(){
  console.log("Crear universo");
  var esfera = new Esfera(64, 64,AMARILLO);
  var material = new Material(RUTAIMAGENUNIVERSO,1.0,1.0,64,64);
  material.cargar();
  esfera.setMaterial(material);
  var universo=new Universo(esfera);
  return universo;
}
