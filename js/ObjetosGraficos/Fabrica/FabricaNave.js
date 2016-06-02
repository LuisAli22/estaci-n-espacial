function FabricaNave(){
  this.fabricaEjesDeAlas= new FabricaEjesDeAlas();
}
FabricaNave.prototype.crear=function(){
  console.log("Crear estacion espacial");
  var nave=new Nave();
  var ejesDeAlas=this.fabricaEjesDeAlas.crear();
  nave.agregar(CLAVEEJESALAS,ejesDeAlas);
  var cuerpo = new CuerpoNaveFinal();
  var patas = new PatasNave();
  nave.agregar(CUERPO,cuerpo);
  nave.agregar(PATAS,patas);
  return nave;
}
