function FabricaEstacionEspacial(){
  this.fabricaCilindrosLaterales=new FabricaCilindrosLaterales();
}
FabricaEstacionEspacial.prototype.crear=function(matrizModelado){
  console.log("Crear estacion espacial");
  var estacion=new ObjetoGraficoCompuesto();
  var nuevaMatrizModelado=this.transformarMatrizModelado(matrizModelado);
  var interiorEstacionEspacial = new AnilloEstacionEspacial(VIOLETA,nuevaMatrizModelado);
  var exteriorEstacionEspacial = new AnilloEstacionEspacial(BEIS,nuevaMatrizModelado);
  exteriorEstacionEspacial.cargarExteriorEstacionEspacial();
  interiorEstacionEspacial.cargarInteriorEstacionEspacial();
  var tapaInicial = new TapaEstacionEspacial(exteriorEstacionEspacial.bufferInicial,interiorEstacionEspacial.bufferInicial,BEIS,nuevaMatrizModelado);
  var tapaFinal = new TapaEstacionEspacial(exteriorEstacionEspacial.bufferFinal,interiorEstacionEspacial.bufferFinal,BEIS,nuevaMatrizModelado);
  var centro = new CentroEstacionEspacial(BEIS,nuevaMatrizModelado);
  var cilindrosLaterales = this.fabricaCilindrosLaterales.crear(nuevaMatrizModelado);
  estacion.agregar(interiorEstacionEspacial);
  estacion.agregar(exteriorEstacionEspacial);
  estacion.agregar(tapaInicial);
  estacion.agregar(tapaFinal );
  estacion.agregar(centro);
  estacion.agregar(cilindrosLaterales);
  console.log("inicializar textura de la estacion");
  return estacion;
}

FabricaEstacionEspacial.prototype.transformarMatrizModelado=function(matrizModelado){
  var nuevaMatrizModelado=mat4.create();
  mat4.scale(nuevaMatrizModelado, matrizModelado, [FACTORESCALAESTACION, FACTORESCALAESTACION, FACTORESCALAESTACION]);
  return nuevaMatrizModelado;
}
