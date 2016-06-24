function FabricaEspacioEstelar(){
  this.fabricaEstacionEspacial=new FabricaEstacionEspacial();
  this.fabricaSol= new FabricaSol();
  this.fabricaTierra= new FabricaTierra();
  this.fabricaUniverso = new FabricaUniverso();
  this.fabricaNave = new FabricaNave();
}
FabricaEspacioEstelar.prototype.crear=function(){
  esferaConTextura = new Esfera(64, 64,AMARILLO,1.0);
  cilindroConTextura = new Cilindro(64,64,BEIS,0,1.0);
  cilindroSinTextura = new Cilindro(64,64,BEIS,0,0.0);
  console.log("Crear espacio estelar");
  var espacioEstelar=new ObjetoGraficoCompuesto();
  var estacionEspacial = this.fabricaEstacionEspacial.crear();
  var sol=this.fabricaSol.crear();
  var tierra=this.fabricaTierra.crear();
  var universo=this.fabricaUniverso.crear();
  var nave = this.fabricaNave.crear();
  espacioEstelar.agregar(CLAVEESTACION,estacionEspacial);
  espacioEstelar.agregar(CLAVESOL,sol);
  espacioEstelar.agregar(CLAVETIERRA,tierra);
  espacioEstelar.agregar(CLAVEUNIVERSO,universo);
  espacioEstelar.agregar(CLAVENAVE,nave);
  return espacioEstelar;
}
