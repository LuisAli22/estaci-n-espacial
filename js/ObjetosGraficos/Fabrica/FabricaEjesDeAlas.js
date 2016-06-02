function FabricaEjesDeAlas(){}
FabricaEjesDeAlas.prototype.crear=function(){
  console.log("Crear EjesDeAlas de la nave");
  var ejes=new EjesNave();
  var turbinas = new TurbinasNave();
  ejes.agregar(TURBINAS,turbinas);
  return ejes;
}
