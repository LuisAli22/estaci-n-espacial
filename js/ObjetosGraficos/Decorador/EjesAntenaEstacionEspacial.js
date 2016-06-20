function EjesAntenaEstacionEspacial(material){

    this.cilindro = new Cilindro(64,64,BEIS,0);
    
    var material = new Material(64,64);
    material.cargarTextura(RUTAIMAGENTAPA);
    material.cargarCoordenadasDeTextura();

    this.cilindro.setMaterial(material);
    
}
EjesAntenaEstacionEspacial.prototype.dibujar = function(){

    var matrizEscalado = mat4.create();
    var matrizTraslacion = mat4.create();
    var matrizTraslacionFinal = mat4.create();
    var matrizRotacion = mat4.create();

    mat4.rotateX(matrizRotacion,matrizRotacion,Math.PI/2.0);
    mat4.scale(matrizEscalado,matrizEscalado,[0.025,7.0,0.025]);
    mat4.translate(matrizTraslacion,matrizTraslacion,[0.0,0.5,0.0]);


    for (var i = 0; i < 2 ; i++) {
      pilaMatrizDeModelado.meter();
        mat4.identity(matrizTraslacionFinal);
        mat4.translate(matrizTraslacionFinal,matrizTraslacionFinal,[0.125-i*0.25,1.75,0.0]);

        mat4.multiply(mvMatrix,mvMatrix,matrizTraslacionFinal);
        mat4.multiply(mvMatrix,mvMatrix,matrizEscalado);
        mat4.multiply(mvMatrix,mvMatrix,matrizTraslacion);
        mat4.multiply(mvMatrix,mvMatrix,matrizRotacion);

        this.cilindro.dibujar();
      pilaMatrizDeModelado.sacar();       
    };

    mat4.identity(matrizTraslacion);

    mat4.translate(matrizTraslacion,matrizTraslacion,[0.0,-0.5,0.0]);

    for (var i = 0; i < 2 ; i++) {
      pilaMatrizDeModelado.meter();
        mat4.identity(matrizTraslacionFinal);
        mat4.translate(matrizTraslacionFinal,matrizTraslacionFinal,[0.125-i*0.25,-1.61,0.0]);

        mat4.multiply(mvMatrix,mvMatrix,matrizTraslacionFinal);
        mat4.multiply(mvMatrix,mvMatrix,matrizEscalado);
        mat4.multiply(mvMatrix,mvMatrix,matrizTraslacion);
        mat4.multiply(mvMatrix,mvMatrix,matrizRotacion);

        this.cilindro.dibujar();
      pilaMatrizDeModelado.sacar();
    };

}
EjesAntenaEstacionEspacial.prototype.inicializarTextura=function(){
  this.cilindro.inicializarTextura(RUTAIMAGENTAPA);
}
EjesAntenaEstacionEspacial.prototype.generarMipMap=function (){
  this.cilindro.generarMipMap();
}
