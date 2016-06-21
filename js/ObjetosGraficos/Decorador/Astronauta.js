function Astronauta(){

	this.plano = new Director(new ConstructorAstronauta());

}
Astronauta.prototype.dibujar = function(){

    var matrizTraslacion = mat4.create();

    mat4.translate(matrizTraslacion,matrizTraslacion,[-12.0, -1.75, 41.75]);

    pilaMatrizDeModelado.meter();

      mat4.multiply(mvMatrix,mvMatrix,matrizTraslacion);

      this.plano.dibujar();

    pilaMatrizDeModelado.sacar();

}

Astronauta.prototype.inicializarTextura=function(){
  this.plano.inicializarTextura();
}
Astronauta.prototype.generarMipMap=function (){
  this.plano.generarMipMap();
}
