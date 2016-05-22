function FabricaEstacionEspacial(){
}
FabricaEstacionEspacial.prototype.crear=function(){
  console.log("Crear estacion espacial");
  var estacion=new ObjetoGraficoCompuesto();
  var interiorEstacionEspacial = new AnilloEstacionEspacial(VIOLETA);
  var exteriorEstacionEspacial = new AnilloEstacionEspacial(BEIS);
  exteriorEstacionEspacial.cargarExteriorEstacionEspacial();
  interiorEstacionEspacial.cargarInteriorEstacionEspacial();
  var tapaInicial = new TapaEstacionEspacial(exteriorEstacionEspacial.bufferInicial,interiorEstacionEspacial.bufferInicial,BEIS);
  var tapaFinal = new TapaEstacionEspacial(exteriorEstacionEspacial.bufferFinal,interiorEstacionEspacial.bufferFinal,BEIS);
  var centro = new CentroEstacionEspacial(BEIS);
  var cilindrosLaterales = new CilindrosLateralesEstacionEspacial();
  var ejes = new EjesAntenaEstacionEspacial(DORADO);
  var cilindroEjesSuperiores = new CilindrosAntenaEstacionEspacial(DORADO);
  estacion.agregar(interiorEstacionEspacial);
  estacion.agregar(exteriorEstacionEspacial);
  estacion.agregar(tapaInicial);
  estacion.agregar(tapaFinal );
  estacion.agregar(centro);
  estacion.agregar(cilindrosLaterales);
  estacion.agregar(ejes);
  estacion.agregar(cilindroEjesSuperiores);
  var panel = new PanelEstacionEspacial(DORADO);
  estacion.agregar(panel);
  var estacionEspacialDecorada= new EstacionEspacial(estacion);
  console.log("inicializar textura de la estacion");
  return estacionEspacialDecorada;

}
