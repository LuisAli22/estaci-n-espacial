function FabricaTierra(){}
FabricaTierra.prototype.crear=function(matrizModelado){

  var esfera = new Director ( new ConstructorTierra());
  var tierra= new Tierra(esfera);

  return tierra;

}
