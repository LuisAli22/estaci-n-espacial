function CilindrosLateralesEstacionEspacial(cilindroLateral){
  this.cilindro=cilindroLateral;
}
CilindrosLateralesEstacionEspacial.prototype.dibujar = function(){
  for (var indiceCilindro=0;indiceCilindro< CANTIDADDECILINDROS;indiceCilindro++){
    mvPushMatrix();
      var matrizRotacion = mat4.create();
      var anguloRotacion = ((ANGULOINCIALCILINDRO + VARIACIONDELANGULO * indiceCilindro)*2.0*Math.PI)/180;
      mat4.rotateY(matrizRotacion,matrizRotacion,anguloRotacion);

      var matrizEscalado = mat4.create();
      mat4.scale(matrizEscalado,matrizEscalado,[0.2,0.2,2.5]);
      var matrizTraslacion = mat4.create();
      mat4.translate(matrizTraslacion,matrizTraslacion,[0.0,0.0,0.5]);

      mat4.multiply(mvMatrix,mvMatrix,matrizRotacion);
      mat4.multiply(mvMatrix,mvMatrix,matrizEscalado);
      mat4.multiply(mvMatrix,mvMatrix,matrizTraslacion);
      this.cilindro.dibujar();
    mvPopMatrix();
  }
}
CilindrosLateralesEstacionEspacial.prototype.inicializarTextura=function(){
  this.cilindro.inicializarTextura(RUTAIMAGENMARTE);
}
CilindrosLateralesEstacionEspacial.prototype.generarMipMap=function (){
  this.cilindro.generarMipMap();
}
