Esfera.prototype=new CuerpoRedondo;
Esfera.prototype.constructor=Esfera;
function Esfera(bandasDeLatitud, bandasLongitudinales,material,matrizModelado){
  this.theta=0;
  this.sinTheta=0;
  this.cosTheta=0;
  CuerpoRedondo.call(this,bandasDeLatitud, bandasLongitudinales,material,matrizModelado);
  this.topeBandasDeLatitud=bandasDeLatitud+1;
  this.inicializarLosBuffer();
}

Esfera.prototype.obtenerElValorDeLaCoordenada=function(coordenada){
  this.theta = this.numeroLatitud * Math.PI / this.bandasDeLatitud;
  this.sinTheta = Math.sin(this.theta);
  this.cosTheta = Math.cos(this.theta);
  var sinPhi = Math.sin(this.phi);
  var cosPhi = Math.cos(this.phi);

  return (coordenada==XCOORD)?
        (cosPhi * this.sinTheta):
        ((coordenada==YCOORD)?
          (this.cosTheta):
          (sinPhi * this.sinTheta));
}
