function FabricaSol(camara){
  this.camara=camara;
}
FabricaSol.prototype.crear=function(){
  console.log("Crear sol");
  var esfera = new Esfera(64, 64,AMARILLO);
  var sol=new Sol(esfera,this.camara);
  return sol;
}
