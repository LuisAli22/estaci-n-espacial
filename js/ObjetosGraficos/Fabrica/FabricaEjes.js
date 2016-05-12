function FabricaEjes(){}
FabricaEjes.prototype.crear=function(){
  console.log("Crear cilindros laterales de estacion espacial");
  /*var cilindrosLaterales=new ObjetoGraficoCompuesto();
  for (var i = 0; i < CANTIDADDECILINDROS; i++) {
    var cilindro = new Cilindro(64,64,DORADO,i);
    cilindrosLaterales.agregar(cilindro);
  }*/
  var cilindro = new Cilindro(64,64,DORADO,0);
  var ejesDecorado= new EjesAntenaEstacionEspacial(cilindro);
  return ejesDecorado;
}
