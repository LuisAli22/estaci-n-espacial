function FabricaEjes(){}
FabricaEjes.prototype.crear=function(){
  console.log("Crear ejes para antena de estacion espacial");
  var cilindro = new Cilindro(64,64,DORADO,0);
  var ejesDecorado= new EjesAntenaEstacionEspacial(cilindro);
  return ejesDecorado;
}
