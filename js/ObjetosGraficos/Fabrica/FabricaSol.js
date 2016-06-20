function FabricaSol(){}
FabricaSol.prototype.crear=function(){
  console.log("Crear sol");
  var esfera = new Esfera(64, 64,AMARILLO);

  var material = new Material(64,64);
  material.cargarTextura(RUTAIMAGENSOL);
  material.cargarCoordenadasDeTextura();
  material.noEsIluminadoPorElSol();
  esfera.setMaterial(material);
  esfera.guardarMaterial(material);
  var sol=new Sol(esfera);
  return sol;
}
