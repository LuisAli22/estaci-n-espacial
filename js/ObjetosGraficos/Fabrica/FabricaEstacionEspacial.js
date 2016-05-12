function FabricaEstacionEspacial(){
  this.fabricaCilindrosLaterales=new FabricaCilindrosLaterales();
  this.fabricaEjes=new FabricaEjes();
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
  var cilindrosLaterales = this.fabricaCilindrosLaterales.crear();
  var ejes = this.fabricaEjes.crear();
  estacion.agregar(interiorEstacionEspacial);
  estacion.agregar(exteriorEstacionEspacial);
  estacion.agregar(tapaInicial);
  estacion.agregar(tapaFinal );
  estacion.agregar(centro);
  estacion.agregar(cilindrosLaterales);
  estacion.agregar(ejes);
  var estacionEspacialDecorada= new EstacionEspacial(estacion);
  console.log("inicializar textura de la estacion");
  return estacionEspacialDecorada;
}
