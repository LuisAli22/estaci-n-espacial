function FabricaEspacioEstelar(){
  this.fabricaEstacionEspacial=new FabricaEstacionEspacial();
  this.fabricaSol= new FabricaSol();
  this.fabricaTierra= new FabricaTierra();
}
FabricaEspacioEstelar.prototype.crear=function(){
  console.log("Crear espacio estelar");
  var espacioEstelar=new ObjetoGraficoCompuesto();
  var estacionEspacial = this.fabricaEstacionEspacial.crear();
  var sol=this.fabricaSol.crear();
  var tierra=this.fabricaTierra.crear();
  espacioEstelar.agregar(estacionEspacial);
  espacioEstelar.agregar(sol);
  espacioEstelar.agregar(tierra);
  return espacioEstelar;
}
