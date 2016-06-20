function FabricaBahia(){}
FabricaBahia.prototype.crear=function(estacionEspacial){

  var interiorIzquierda = new Director (new ConstructorLateralIzquierdoInterior());
  var interiorTecho = new Director (new ConstructorTechoInterior());
  var interiorDerecha = new Director (new ConstructorLateralDerechoInterior());
  var interiorPiso = new Director (new ConstructorPisoInterior());
  var exteriorIzquierda = new Director (new ConstructorLateralIzquierdoExterior());
  var exteriorDerecha = new Director (new ConstructorLateralDerechoExterior());
  var exteriorTecho = new Director (new ConstructorTechoExterior());
  var exteriorPiso = new Director (new ConstructorPisoExterior());

  var bufferInicialInterior = [];
  var bufferInicialExterior = [];
  var bufferFinalInterior = [];
  var bufferFinalExterior = [];

  bufferInicialInterior = bufferInicialInterior.concat(interiorIzquierda.bufferInicial);
  bufferInicialInterior = bufferInicialInterior.concat(interiorTecho.bufferInicial);
  bufferInicialInterior = bufferInicialInterior.concat(interiorDerecha.bufferInicial);
  bufferInicialInterior = bufferInicialInterior.concat(interiorPiso.bufferInicial);

  bufferInicialExterior = bufferInicialExterior.concat(exteriorIzquierda.bufferInicial);
  bufferInicialExterior = bufferInicialExterior.concat(exteriorTecho.bufferInicial);
  bufferInicialExterior = bufferInicialExterior.concat(exteriorDerecha.bufferInicial);
  bufferInicialExterior = bufferInicialExterior.concat(exteriorPiso.bufferInicial);

  bufferFinalInterior = bufferFinalInterior.concat(interiorIzquierda.bufferFinal);
  bufferFinalInterior = bufferFinalInterior.concat(interiorTecho.bufferFinal);
  bufferFinalInterior = bufferFinalInterior.concat(interiorDerecha.bufferFinal);
  bufferFinalInterior = bufferFinalInterior.concat(interiorPiso.bufferFinal);

  bufferFinalExterior = bufferFinalExterior.concat(exteriorIzquierda.bufferFinal);
  bufferFinalExterior = bufferFinalExterior.concat(exteriorTecho.bufferFinal);
  bufferFinalExterior = bufferFinalExterior.concat(exteriorDerecha.bufferFinal);
  bufferFinalExterior = bufferFinalExterior.concat(exteriorPiso.bufferFinal);

  var tapaInicial = new TapaEstacionEspacial(bufferInicialExterior,bufferInicialInterior,BEIS);
  var tapaFinal = new TapaEstacionEspacial(bufferFinalExterior,bufferFinalInterior,BEIS);

  estacionEspacial.agregar(CLAVETAPAINICIALESTACION,tapaInicial);
  estacionEspacial.agregar(CLAVETAPAFINALESTACION,tapaFinal);

  estacionEspacial.agregar(CLAVEINTERIORPISO,interiorPiso);
  estacionEspacial.agregar(CLAVEINTERIORIZQUIERDA,interiorIzquierda);
  estacionEspacial.agregar(CLAVEINTERIORTECHO,interiorTecho);
  estacionEspacial.agregar(CLAVEINTERIORDERECHA,interiorDerecha);
  estacionEspacial.agregar(CLAVEEXTERIORIZQUIERDA,exteriorIzquierda);
  estacionEspacial.agregar(CLAVEEXTERIORDERECHA,exteriorDerecha);
  estacionEspacial.agregar(CLAVEEXTERIORTECHO,exteriorTecho);
  estacionEspacial.agregar(CLAVEEXTERIORPISO,exteriorPiso);


}