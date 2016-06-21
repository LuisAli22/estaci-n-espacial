function FabricaEstacionEspacial(){

  this.fabricaBahia = new FabricaBahia();

}
FabricaEstacionEspacial.prototype.crear=function(){
  console.log("Crear estacion espacial");
  var estacionEspacial= new EstacionEspacial();
  var centro = new Director(new ConstructorCentroEstacionEspacial());
  var cilindrosLaterales = new CilindrosLateralesEstacionEspacial();
  var ejes = new EjesAntenaEstacionEspacial(DORADO);
  var panel = new PanelEstacionEspacial(DORADO);
  var escotillas = new Escotillas();
  var manguera = new MangueraAstronauta(DORADO);
  var astronauta = new Astronauta();
  this.fabricaBahia.crear(estacionEspacial);
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
