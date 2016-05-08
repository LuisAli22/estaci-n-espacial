function FabricaEspacioEstelar(){
  this.fabricaEstacionEspacial=new FabricaEstacionEspacial();
  this.fabricaSol= new FabricaSol();
  this.fabricaTierra= new FabricaTierra();
  this.matrizModelado=mat4.create();
}
FabricaEspacioEstelar.prototype.crear=function(){
  console.log("Crear espacio estelar");
  var espacioEstelar=new ObjetoGraficoCompuesto();
  var estacionEspacial = this.fabricaEstacionEspacial.crear(this.matrizModelado);
  var sol=this.fabricaSol.crear(this.matrizModelado);
  var tierra=this.fabricaTierra.crear(this.matrizModelado);
  espacioEstelar.agregar(estacionEspacial);
  espacioEstelar.agregar(sol);
  espacioEstelar.agregar(tierra);
  return espacioEstelar;
}
