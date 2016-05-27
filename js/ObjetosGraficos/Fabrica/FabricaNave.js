function FabricaNave(controladorEjesYTubinas,controladorNave,controladorPatasNave){
  this.controladorEjesYTubinas = controladorEjesYTubinas;
  this.controladorNave = controladorNave;
  this.controladorPatasNave = controladorPatasNave;
}
FabricaNave.prototype.crear=function(){
  console.log("Crear estacion espacial");
  var nave=new ObjetoGraficoCompuesto();
  var ejesNave = new EjesNave(this.controladorEjesYTubinas);
  var turbinas = new TurbinasNave(this.controladorEjesYTubinas);
  var cuerpo = new CuerpoNaveFinal();
  var patas = new PatasNave(this.controladorPatasNave);
  nave.agregar(turbinas);
  nave.agregar(ejesNave);
  nave.agregar(cuerpo);
  nave.agregar(patas);
  var naveDecorada= new Nave(nave,this.controladorNave);
  return naveDecorada;
}