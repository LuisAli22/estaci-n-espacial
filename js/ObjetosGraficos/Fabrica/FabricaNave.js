function FabricaNave(controladorEjesYTubinas,controladorNave){
  this.controladorEjesYTubinas = controladorEjesYTubinas;
  this.controladorNave = controladorNave;
}
FabricaNave.prototype.crear=function(){
  console.log("Crear estacion espacial");
  var nave=new ObjetoGraficoCompuesto();
  var ejesNave = new EjesNave(this.controladorEjesYTubinas);
  var turbinas = new TurbinasNave(this.controladorEjesYTubinas);
  var cuerpo = new CuerpoNaveFinal();
  nave.agregar(turbinas);
  nave.agregar(ejesNave);
  nave.agregar(cuerpo);
  var naveDecorada= new Nave(nave,this.controladorNave);
  return naveDecorada;
}