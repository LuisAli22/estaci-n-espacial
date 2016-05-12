function EjesAntenaEstacionEspacial(cilindroAntena){
  this.cilindro=cilindroAntena;
}
EjesAntenaEstacionEspacial.prototype.dibujar = function(){

    var matrizEscalado = mat4.create();
    var matrizTraslacion = mat4.create();
    var matrizTraslacionFinal = mat4.create();
    var matrizRotacion = mat4.create();

    mat4.rotateX(matrizRotacion,matrizRotacion,Math.PI/2.0);
    mat4.scale(matrizEscalado,matrizEscalado,[0.025,5.0,0.025]);
    mat4.translate(matrizTraslacion,matrizTraslacion,[0.0,0.5,0.0]);
    

    for (var i = 0; i < 2 ; i++) {
      mvPushMatrix();
        mat4.identity(matrizTraslacionFinal);
        mat4.translate(matrizTraslacionFinal,matrizTraslacionFinal,[0.125-i*0.25,1.75,0.0]);

        mat4.multiply(mvMatrix,mvMatrix,matrizTraslacionFinal);
        mat4.multiply(mvMatrix,mvMatrix,matrizEscalado);
        mat4.multiply(mvMatrix,mvMatrix,matrizTraslacion);
        mat4.multiply(mvMatrix,mvMatrix,matrizRotacion);
        
        this.cilindro.dibujar();
      mvPopMatrix();       
    };

    mat4.identity(matrizTraslacion);

    mat4.translate(matrizTraslacion,matrizTraslacion,[0.0,-0.5,0.0]);

    for (var i = 0; i < 2 ; i++) {
      mvPushMatrix();
        mat4.identity(matrizTraslacionFinal);
        mat4.translate(matrizTraslacionFinal,matrizTraslacionFinal,[0.125-i*0.25,-1.61,0.0]);
        
        mat4.multiply(mvMatrix,mvMatrix,matrizTraslacionFinal);
        mat4.multiply(mvMatrix,mvMatrix,matrizEscalado);
        mat4.multiply(mvMatrix,mvMatrix,matrizTraslacion);
        mat4.multiply(mvMatrix,mvMatrix,matrizRotacion);
        
        this.cilindro.dibujar();
      mvPopMatrix();   
    };

}
EjesAntenaEstacionEspacial.prototype.inicializarTextura=function(){
  this.cilindro.inicializarTextura(RUTAIMAGENMARTE);
}
EjesAntenaEstacionEspacial.prototype.generarMipMap=function (){
  this.cilindro.generarMipMap();
}
