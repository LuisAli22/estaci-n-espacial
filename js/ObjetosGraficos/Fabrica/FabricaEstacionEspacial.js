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
  var panel = new PanelEstacionEspacial(DORADO);
  var escotillas = new Escotillas();
  var manguera = new MangueraAstronauta(DORADO);
  var astronauta = new Astronauta();
  estacion.agregar(CLAVEINTERIORESTACION,interiorEstacionEspacial);
  estacion.agregar(CLAVEEXTERIORESTACION,exteriorEstacionEspacial);
  estacion.agregar(CLAVETAPAINICIALESTACION,tapaInicial);
  estacion.agregar(CLAVETAPAFINALESTACION,tapaFinal );
  estacion.agregar(CLAVECENTROESTACION,centro);
  estacion.agregar(CLAVECILINDROSLATERALESESTACION,cilindrosLaterales);
  estacion.agregar(CLAVEEJESESTACION,ejes);
  estacion.agregar(CLAVEPANELESTACION,panel);
  estacion.agregar(CLAVEESCOTILLASESTACION,escotillas);
  estacion.agregar(CLAVEMANGUERA,manguera);
  estacion.agregar(CLAVEASTRONAUTA,astronauta);
  var estacionEspacialDecorada= new EstacionEspacial(estacion);
  console.log("inicializar textura de la estacion");
  return estacionEspacialDecorada;

}
