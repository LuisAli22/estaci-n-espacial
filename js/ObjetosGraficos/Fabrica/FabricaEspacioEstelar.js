function FabricaEspacioEstelar(/*camara,*/controladorEjesYTubinas,controladorNave,controladorPatasNave){
  this.fabricaEstacionEspacial=new FabricaEstacionEspacial();
  this.fabricaSol= new FabricaSol(/*camara*/);
  this.fabricaTierra= new FabricaTierra();
  this.fabricaNave = new FabricaNave(controladorEjesYTubinas,controladorNave,controladorPatasNave);
}
FabricaEspacioEstelar.prototype.crear=function(){
  console.log("Crear espacio estelar");
  var espacioEstelar=new ObjetoGraficoCompuesto();
  var estacionEspacial = this.fabricaEstacionEspacial.crear();
  var sol=this.fabricaSol.crear();
  var tierra=this.fabricaTierra.crear();
  var nave = this.fabricaNave.crear();
  espacioEstelar.agregar(CLAVEESTACION,estacionEspacial);
  espacioEstelar.agregar(CLAVESOL,sol);
  espacioEstelar.agregar(CLAVETIERRA,tierra);
  espacioEstelar.agregar(CLAVENAVE,nave);
  return espacioEstelar;
}
