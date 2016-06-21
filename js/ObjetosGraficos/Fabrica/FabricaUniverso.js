function FabricaUniverso(){}
FabricaUniverso.prototype.crear=function(){
  console.log("Crear universo");
  var esfera = new Director( new ConstructorUniverso());
  var universo = new Universo(esfera);
  return universo;
}
