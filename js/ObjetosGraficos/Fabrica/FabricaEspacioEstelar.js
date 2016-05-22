function FabricaEspacioEstelar(camara){
  this.fabricaEstacionEspacial=new FabricaEstacionEspacial();
  this.fabricaSol= new FabricaSol(camara);
  this.fabricaTierra= new FabricaTierra();
}
FabricaEspacioEstelar.prototype.crear=function(){
  console.log("Crear espacio estelar");
  cilindro = new Cilindro(64,64,DORADO,0);
  var espacioEstelar=new ObjetoGraficoCompuesto();
  var estacionEspacial = this.fabricaEstacionEspacial.crear();
  var sol=this.fabricaSol.crear();
  var tierra=this.fabricaTierra.crear();
  espacioEstelar.agregar(estacionEspacial);
  espacioEstelar.agregar(sol);
  espacioEstelar.agregar(tierra);
  return espacioEstelar;
}
