CuerpoRedondo.prototype=new ObjetoGrafico;
CuerpoRedondo.prototype.constructor=CuerpoRedondo;
function CuerpoRedondo(bandasDeLatitud, bandasLongitudinales,material){
  this.bandasDeLatitud = bandasDeLatitud;
  this.bandasLongitudinales = bandasLongitudinales;
  this.material = material;
  this.numeroLatitud=0;
  this.numeroDeLongitud=0;
  this.phi =0;
  this.topeBandasDeLatitud=0;
  this.position_buffer=[];
  this.normal_buffer=[];
  this.texture_coord_buffer=[];
  this.index_buffer=[];
}
CuerpoRedondo.prototype.obtenerElValorDeLaCoordenada=function(coordenada){
  throw Error("Cuerpo Redondo es como una clase abstracta. La funcion obtenerElValorDeLaCoordenada() se debe implementar en un hijo en concreto de CuerpoRedondo");
}
CuerpoRedondo.prototype.cargarLosBufferDePosicionYNormal=function(){
  this.phi = this.numeroDeLongitud * 2 * Math.PI / this.bandasLongitudinales;
  var coordenadasEspaciales=[XCOORD,YCOORD,ZCOORD];
  for (indiceCoordenada in coordenadasEspaciales){
    var valorDeLaCoordenada=this.obtenerElValorDeLaCoordenada(coordenadasEspaciales[indiceCoordenada]);
    this.normal_buffer.push(valorDeLaCoordenada);
    this.position_buffer.push(valorDeLaCoordenada);
  }
}
CuerpoRedondo.prototype.cargarBufferDeTextura=function(){
  var u = 1.0 - (this.numeroDeLongitud / this.bandasLongitudinales);
  var v = 1.0 - (this.numeroLatitud / this.bandasDeLatitud);
  this.texture_coord_buffer.push(u);
  this.texture_coord_buffer.push(v);
  //Coordenada del material
  this.texture_coord_buffer.push(this.material);
  this.texture_coord_buffer.push(1.0);
}
CuerpoRedondo.prototype.cargarCoordenadasEnLosBuffersDePosicionYTextura=function(){
  for (this.numeroLatitud=0; this.numeroLatitud < this.topeBandasDeLatitud; this.numeroLatitud++) {
      for (this.numeroDeLongitud=0; this.numeroDeLongitud <= this.bandasLongitudinales; this.numeroDeLongitud++) {
          this.cargarLosBufferDePosicionYNormal();
          this.cargarBufferDeTextura();
      }
  }
}

CuerpoRedondo.prototype.cargarElBufferDeIndices=function(){
  for (this.numeroLatitud=0; this.numeroLatitud < this.bandasDeLatitud; this.numeroLatitud++) {
      for (this.numeroDeLongitud=0; this.numeroDeLongitud < this.bandasLongitudinales; this.numeroDeLongitud++) {
          var primero = (this.numeroLatitud * (this.bandasLongitudinales + 1)) + this.numeroDeLongitud;
          var segundo = primero + this.bandasLongitudinales + 1;
          this.index_buffer.push(primero);
          this.index_buffer.push(segundo);
          this.index_buffer.push(primero + 1);

          this.index_buffer.push(segundo);
          this.index_buffer.push(segundo + 1);
          this.index_buffer.push(primero + 1);
      }
  }
}

CuerpoRedondo.prototype.inicializarLosBuffer=function(){
  this.cargarCoordenadasEnLosBuffersDePosicionYTextura();
  this.cargarElBufferDeIndices();
  this.atarLosBuffer(this.position_buffer,this.normal_buffer,this.texture_coord_buffer,this.index_buffer);
}
