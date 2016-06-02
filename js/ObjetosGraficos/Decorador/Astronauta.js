function Astronauta(){

	this.plano = new Plano();

}
Astronauta.prototype.dibujar = function(){

    var matrizTraslacion = mat4.create();
    var matrizRotacion = mat4.create();

    mat4.rotateZ(matrizRotacion,matrizRotacion,Math.PI/2.0);
    mat4.translate(matrizTraslacion,matrizTraslacion,[-12.0, -1.75, 41.75]);

    pilaMatrizDeModelado.meter();

      mat4.multiply(mvMatrix,mvMatrix,matrizTraslacion);
      mat4.multiply(mvMatrix,mvMatrix,matrizRotacion);

      this.plano.dibujar();

    pilaMatrizDeModelado.sacar();

}

Astronauta.prototype.inicializarTextura=function(){
  this.plano.inicializarTextura(RUTAIMAGENASTRONAUTA);
}
Astronauta.prototype.generarMipMap=function (){
  this.plano.generarMipMap();
}
