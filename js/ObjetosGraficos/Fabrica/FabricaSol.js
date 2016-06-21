function FabricaSol(){}
FabricaSol.prototype.crear=function(){
  console.log("Crear sol");

  var esfera = new Director( new ConstructorSol());
  var sol=new Sol(esfera);

  return sol;
  
}
