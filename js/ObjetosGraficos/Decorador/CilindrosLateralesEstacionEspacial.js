function CilindrosLateralesEstacionEspacial(){

}
CilindrosLateralesEstacionEspacial.prototype.dibujar = function(){
  for (var indiceCilindro=0;indiceCilindro< CANTIDADDECILINDROS;indiceCilindro++){
    pilaMatrizDeModelado.meter();
      var matrizRotacion = mat4.create();
      var anguloRotacion = ((ANGULOINCIALCILINDRO + VARIACIONDELANGULO * indiceCilindro)*2.0*Math.PI)/180;
      mat4.rotateY(matrizRotacion,matrizRotacion,anguloRotacion);

      var matrizEscalado = mat4.create();
      mat4.scale(matrizEscalado,matrizEscalado,[0.2,0.2,3.25]);
      var matrizTraslacion = mat4.create();
      mat4.translate(matrizTraslacion,matrizTraslacion,[0.0,0.0,0.5]);

      mat4.multiply(mvMatrix,mvMatrix,matrizRotacion);
      mat4.multiply(mvMatrix,mvMatrix,matrizEscalado);
      mat4.multiply(mvMatrix,mvMatrix,matrizTraslacion);
      cilindro.dibujar();
    pilaMatrizDeModelado.sacar();
  }
}
CilindrosLateralesEstacionEspacial.prototype.inicializarTextura=function(){
  cilindro.inicializarTextura(RUTAIMAGENMARTE);
}
CilindrosLateralesEstacionEspacial.prototype.generarMipMap=function (){
  cilindro.generarMipMap();
}
