function FactoryEsferaTierra(){}
FactoryEsferaTierra.prototype.crear=function(){
  var esfera = new TexturedSphere(64, 64,CELESTE);
  esfera.initTexture(IMGMARSPATH);
  return esfera;
}
