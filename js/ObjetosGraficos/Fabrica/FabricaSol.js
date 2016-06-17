function FabricaSol(){}
FabricaSol.prototype.crear=function(){
  console.log("Crear sol");
  var esfera = new Esfera(64, 64,AMARILLO);
  var material = new Material(RUTAIMAGENSOL,1.0,1.0,64,64);
  material.cargar();
  esfera.setMaterial(material);
  var sol=new Sol(esfera);
  return sol;
}
