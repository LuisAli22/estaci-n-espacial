function FactoryEsferaLuna(){}
FactoryEsferaLuna.prototype.crear=function(){
  var esfera = new TexturedSphere(64, 64,AMARILLO);
  esfera.initTexture(IMGMOONPATH);
  return esfera;
}
