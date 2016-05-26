function FabricaNave(){
}
FabricaNave.prototype.crear=function(){
  console.log("Crear estacion espacial");
  var nave=new ObjetoGraficoCompuesto();
  var ejesNave = new EjesNave();
  var turbinas = new TurbinasNave();
  var cuerpo = new CuerpoNaveFinal();
  nave.agregar(turbinas);
  nave.agregar(ejesNave);
  nave.agregar(cuerpo);
  var naveDecorada= new Nave(nave);
  return naveDecorada;
}