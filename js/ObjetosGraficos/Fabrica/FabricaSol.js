function FabricaSol(){}
FabricaSol.prototype.crear=function(){
  console.log("Crear sol");
  var esfera = new Esfera(64, 64,AMARILLO);
  var sol=new Sol(esfera);
  return sol;
}
