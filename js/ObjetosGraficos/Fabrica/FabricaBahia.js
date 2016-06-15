function FabricaBahia(){}
FabricaBahia.prototype.crear=function(estacionEspacial){

  var interiorIzquierda = new ConstructorLateralIzquierdoInterior(2.0);
  var interiorTecho = new ConstructorTechoInterior(2.0);
  var interiorDerecha = new ConstructorLateralDerechoInterior(2.0);
  var interiorPiso = new ConstructorPisoInterior(2.0);
  var exteriorIzquierda = new ConstructorLateralIzquierdoExterior(5.0);
  var exteriorDerecha = new ConstructorLateralDerechoExterior(5.0);
  var exteriorTecho = new ConstructorTechoExterior(5.0);
  var exteriorPiso = new ConstructorPisoExterior(5.0);

  estacionEspacial.agregar(CLAVEINTERIORPISO,interiorPiso.getComponenteBahia());
  estacionEspacial.agregar(CLAVEINTERIORTECHO,interiorTecho.getComponenteBahia());
  estacionEspacial.agregar(CLAVEINTERIORDERECHA,interiorDerecha.getComponenteBahia());
  estacionEspacial.agregar(CLAVEINTERIORIZQUIERDA,interiorIzquierda.getComponenteBahia());
  estacionEspacial.agregar(CLAVEEXTERIORIZQUIERDA,exteriorIzquierda.getComponenteBahia());
  estacionEspacial.agregar(CLAVEEXTERIORDERECHA,exteriorDerecha.getComponenteBahia());
  estacionEspacial.agregar(CLAVEEXTERIORTECHO,exteriorTecho.getComponenteBahia());
  estacionEspacial.agregar(CLAVEEXTERIORPISO,exteriorPiso.getComponenteBahia());

}