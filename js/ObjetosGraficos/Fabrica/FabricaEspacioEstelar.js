function FabricaEspacioEstelar(camara,controladorEjesYTubinas){
  this.fabricaEstacionEspacial=new FabricaEstacionEspacial();
  this.fabricaSol= new FabricaSol(camara);
  this.fabricaTierra= new FabricaTierra();
  this.fabricaNave = new FabricaNave(controladorEjesYTubinas);
}
FabricaEspacioEstelar.prototype.crear=function(){
  console.log("Crear espacio estelar");
  var espacioEstelar=new ObjetoGraficoCompuesto();
  var estacionEspacial = this.fabricaEstacionEspacial.crear();
  var sol=this.fabricaSol.crear();
  var tierra=this.fabricaTierra.crear();
  var nave = this.fabricaNave.crear();
  espacioEstelar.agregar(estacionEspacial);
  espacioEstelar.agregar(sol);
  espacioEstelar.agregar(tierra);
  espacioEstelar.agregar(nave);
  return espacioEstelar;
}
