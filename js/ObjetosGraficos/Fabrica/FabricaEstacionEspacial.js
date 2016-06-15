function FabricaEstacionEspacial(){

  this.fabricaBahia = new FabricaBahia();

}
FabricaEstacionEspacial.prototype.crear=function(){
  console.log("Crear estacion espacial");
  var estacionEspacial= new EstacionEspacial();
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
  //estacionEspacial.agregar(CLAVEINTERIORESTACION,interiorEstacionEspacial);
  this.fabricaBahia.crear(estacionEspacial);
  estacionEspacial.agregar(CLAVEEXTERIORESTACION,exteriorEstacionEspacial);
  estacionEspacial.agregar(CLAVETAPAINICIALESTACION,tapaInicial);
  estacionEspacial.agregar(CLAVETAPAFINALESTACION,tapaFinal );
  estacionEspacial.agregar(CLAVECENTROESTACION,centro);
  estacionEspacial.agregar(CLAVECILINDROSLATERALESESTACION,cilindrosLaterales);
  estacionEspacial.agregar(CLAVEEJESESTACION,ejes);
  estacionEspacial.agregar(CLAVEPANELESTACION,panel);
  estacionEspacial.agregar(CLAVEESCOTILLASESTACION,escotillas);
  estacionEspacial.agregar(CLAVEMANGUERA,manguera);
  estacionEspacial.agregar(CLAVEASTRONAUTA,astronauta);
  console.log("inicializar textura de la estacion");
  return estacionEspacial;

}
