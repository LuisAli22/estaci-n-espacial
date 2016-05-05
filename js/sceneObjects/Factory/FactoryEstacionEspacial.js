function FactoryEstacionEspacial(){}
FactoryEstacionEspacial.prototype.crear=function(){
  var estacion=new composedSceneObject();
  var interiorEstacionEspacial = new InteriorEstacionEspacial();
  var exteriorEstacionEspacial = new ExteriorEstacionEspacial();
  var tapaInicial = new TapaEstacionEspacial(exteriorEstacionEspacial.bufferInicial,interiorEstacionEspacial.bufferInicial);
  var tapaFinal = new TapaEstacionEspacial(exteriorEstacionEspacial.bufferFinal,interiorEstacionEspacial.bufferFinal);
  estacion.push(interiorEstacionEspacial);
  estacion.push(exteriorEstacionEspacial);
  estacion.push(tapaInicial);
  estacion.push(tapaFinal );
  estacion.initTexture();
  return estacion;
}
