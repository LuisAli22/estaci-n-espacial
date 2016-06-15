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

  var bufferInicialInterior = [];
  var bufferInicialExterior = [];
  var bufferFinalInterior = [];
  var bufferFinalExterior = [];

  bufferInicialInterior = bufferInicialInterior.concat(interiorIzquierda.componenteBahia.bufferInicial);
  bufferInicialInterior = bufferInicialInterior.concat(interiorTecho.componenteBahia.bufferInicial);
  bufferInicialInterior = bufferInicialInterior.concat(interiorDerecha.componenteBahia.bufferInicial);
  bufferInicialInterior = bufferInicialInterior.concat(interiorPiso.componenteBahia.bufferInicial);

  bufferInicialExterior = bufferInicialExterior.concat(exteriorIzquierda.componenteBahia.bufferInicial);
  bufferInicialExterior = bufferInicialExterior.concat(exteriorTecho.componenteBahia.bufferInicial);
  bufferInicialExterior = bufferInicialExterior.concat(exteriorDerecha.componenteBahia.bufferInicial);
  bufferInicialExterior = bufferInicialExterior.concat(exteriorPiso.componenteBahia.bufferInicial);

  bufferFinalInterior = bufferFinalInterior.concat(interiorIzquierda.componenteBahia.bufferFinal);
  bufferFinalInterior = bufferFinalInterior.concat(interiorTecho.componenteBahia.bufferFinal);
  bufferFinalInterior = bufferFinalInterior.concat(interiorDerecha.componenteBahia.bufferFinal);
  bufferFinalInterior = bufferFinalInterior.concat(interiorPiso.componenteBahia.bufferFinal);

  bufferFinalExterior = bufferFinalExterior.concat(exteriorIzquierda.componenteBahia.bufferFinal);
  bufferFinalExterior = bufferFinalExterior.concat(exteriorTecho.componenteBahia.bufferFinal);
  bufferFinalExterior = bufferFinalExterior.concat(exteriorDerecha.componenteBahia.bufferFinal);
  bufferFinalExterior = bufferFinalExterior.concat(exteriorPiso.componenteBahia.bufferFinal);

  estacionEspacial.agregar(CLAVEINTERIORPISO,interiorPiso.getComponenteBahia());
  estacionEspacial.agregar(CLAVEINTERIORTECHO,interiorTecho.getComponenteBahia());
  estacionEspacial.agregar(CLAVEINTERIORDERECHA,interiorDerecha.getComponenteBahia());
  estacionEspacial.agregar(CLAVEINTERIORIZQUIERDA,interiorIzquierda.getComponenteBahia());
  estacionEspacial.agregar(CLAVEEXTERIORIZQUIERDA,exteriorIzquierda.getComponenteBahia());
  estacionEspacial.agregar(CLAVEEXTERIORDERECHA,exteriorDerecha.getComponenteBahia());
  estacionEspacial.agregar(CLAVEEXTERIORTECHO,exteriorTecho.getComponenteBahia());
  estacionEspacial.agregar(CLAVEEXTERIORPISO,exteriorPiso.getComponenteBahia());

  var tapaInicial = new TapaEstacionEspacial(bufferInicialExterior,bufferInicialInterior,BEIS);
  var tapaFinal = new TapaEstacionEspacial(bufferFinalExterior,bufferFinalInterior,BEIS);

  estacionEspacial.agregar(CLAVETAPAINICIALESTACION,tapaInicial);
  estacionEspacial.agregar(CLAVETAPAFINALESTACION,tapaFinal );

}