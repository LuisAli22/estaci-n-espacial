Cilindro.prototype=new CuerpoRedondo;
Cilindro.prototype.constructor=Cilindro;
function Cilindro(bandasDeLatitud, bandasLongitudinales,material,matrizModelado){
  this.altura =0;
  CuerpoRedondo.call(this,bandasDeLatitud, bandasLongitudinales,material,matrizModelado);
  this.topeBandasDeLatitud=bandasDeLatitud-1;
  this.inicializarLosBuffer();
}
Cilindro.prototype.obtenerElValorDeLaCoordenada=function(coordenada){
  var sinPhi = Math.sin(this.phi);
  var cosPhi = Math.cos(this.phi);

  return (coordenada==XCOORD)?
        (cosPhi):
        ((coordenada==YCOORD)?
          (sinPhi):
          (this.altura));
}

Cilindro.prototype.cargarTapa=function(altura){

  for (var i = 0; i <= this.bandasDeLatitud; i++) {
    this.normal_buffer.push(0.0);
    this.normal_buffer.push(0.0);
    this.normal_buffer.push(altura);

    this.position_buffer.push(0.0);
    this.position_buffer.push(0.0);
    this.position_buffer.push(altura);
    this.cargarBufferDeTextura();
  };

}
Cilindro.prototype.cargarCoordenadasEnLosBuffersDePosicionYTextura=function(){
  this.cargarTapa(ALTURACILINDRO/2);
  this.altura = ALTURACILINDRO/2 - this.numeroLatitud * ALTURACILINDRO / (this.bandasDeLatitud-2);
  CuerpoRedondo.prototype.cargarCoordenadasEnLosBuffersDePosicionYTextura.call(this);
  this.cargarTapa(-ALTURACILINDRO/2);
}
