function FabricaCilindrosLaterales(){}
FabricaCilindrosLaterales.prototype.crear=function(){
  console.log("Crear cilindros laterales de estacion espacial");
  var cilindrosLaterales=new ObjetoGraficoCompuesto();
  for (var i = 0; i < CANTIDADDECILINDROS; i++) {
    var cilindro = new Cilindro(64,64,DORADO,i);
    cilindrosLaterales.agregar(cilindro);
  }
  var cilindrosLateralesDecorado= new CilindrosLateralesEstacionEspacial(cilindrosLaterales);
  return cilindrosLateralesDecorado;
}
