function CuerpoNaveFinal(){

  this.cuerpo = new Director(new ConstructorCuerpoNave());

  this.dibujarCuerpoNave = function(){

    var matrizRotacion = mat4.create();
    var matrizEscalado = mat4.create();

    mat4.rotateX(matrizRotacion,matrizRotacion,-Math.PI/2.0);
    mat4.rotateZ(matrizRotacion,matrizRotacion,Math.PI/2.0);
    mat4.scale(matrizEscalado,matrizEscalado,[1.5,1.0,1.5]);

    pilaMatrizDeModelado.meter();

      mat4.multiply(mvMatrix,mvMatrix,matrizRotacion);
      mat4.multiply(mvMatrix,mvMatrix,matrizEscalado);

      this.cuerpo.dibujar();

    pilaMatrizDeModelado.sacar();

  }

}
CuerpoNaveFinal.prototype.dibujar = function(){

    this.dibujarCuerpoNave();
}

CuerpoNaveFinal.prototype.inicializarTextura=function(){
  this.cuerpo.inicializarTextura();
}
CuerpoNaveFinal.prototype.generarMipMap=function (){
  this.cuerpo.generarMipMap();
}
