function FabricaCilindrosLaterales(){}
FabricaCilindrosLaterales.prototype.crear=function(){
  console.log("Crear cilindros laterales de estacion espacial");
  
  var cilindro = new Cilindro(64,64,DORADO,0);
  var cilindrosLateralesDecorado= new CilindrosLateralesEstacionEspacial(cilindro);
  return cilindrosLateralesDecorado;
}
