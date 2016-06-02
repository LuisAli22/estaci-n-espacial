function Escotillas(){
	this.cilindro = new Cilindro(64,64,BEIS,0);
	this.dibujarEscotilla = function(angulo){

	  var matrizEscalado = mat4.create();
    var matrizTraslacionFinal = mat4.create();
    var matrizRotacion = mat4.create();

    mat4.rotateY(matrizRotacion,matrizRotacion,angulo);
 	  mat4.translate(matrizTraslacionFinal,matrizTraslacionFinal,[0.0,0.0,6.0]);
    mat4.scale(matrizEscalado,matrizEscalado,[0.7,0.7,0.5]);

    pilaMatrizDeModelado.meter();

		  mat4.multiply(mvMatrix,mvMatrix,matrizRotacion);
      mat4.multiply(mvMatrix,mvMatrix,matrizTraslacionFinal);
      mat4.multiply(mvMatrix,mvMatrix,matrizEscalado);


      this.cilindro.dibujar();
	  pilaMatrizDeModelado.sacar();

	}

}


Escotillas.prototype.dibujar = function(){

    this.dibujarEscotilla(0);
    this.dibujarEscotilla(Math.PI/2);
    this.dibujarEscotilla(-Math.PI/2);

}

Escotillas.prototype.inicializarTextura=function(){
  this.cilindro.inicializarTextura(RUTAIMAGENMARTE);
}
Escotillas.prototype.generarMipMap=function (){
  this.cilindro.generarMipMap();
}
