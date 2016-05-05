function FactoryEstacionEspacial(){}
FactoryEstacionEspacial.prototype.crear=function(){
  var estacion=new composedSceneObject();
  var interiorEstacionEspacial = new AnilloEstacionEspacial(VIOLETA);
  var exteriorEstacionEspacial = new AnilloEstacionEspacial(BEIS);
  exteriorEstacionEspacial.cargarExteriorEstacionEspacial();
  interiorEstacionEspacial.cargarInteriorEstacionEspacial();
  var tapaInicial = new TapaEstacionEspacial(exteriorEstacionEspacial.bufferInicial,interiorEstacionEspacial.bufferInicial,BEIS);
  var tapaFinal = new TapaEstacionEspacial(exteriorEstacionEspacial.bufferFinal,interiorEstacionEspacial.bufferFinal,BEIS);
  var centro = new CentroEstacionEspacial(BEIS);
  var cilindrosLaterales = new CilindrosLaterales(DORADO);
  estacion.push(interiorEstacionEspacial);
  estacion.push(exteriorEstacionEspacial);
  estacion.push(tapaInicial);
  estacion.push(tapaFinal );
  estacion.push(centro);
  estacion.push(cilindrosLaterales);
  estacion.initTexture();
  return estacion;
}
