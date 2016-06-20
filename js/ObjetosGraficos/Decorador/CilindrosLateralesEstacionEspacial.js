function CilindrosLateralesEstacionEspacial(){

    this.cilindro = new Cilindro(64,64,BEIS,0);

    var material = new Material(64,64);
    material.cargarTextura(RUTAIMAGENRAYOS);
    material.cargarCoordenadasDeTextura();

    this.cilindro.setMaterial(material);
    
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
      this.cilindro.dibujar();
    pilaMatrizDeModelado.sacar();
  }
}
CilindrosLateralesEstacionEspacial.prototype.inicializarTextura=function(){
  this.cilindro.inicializarTextura(RUTAIMAGENRAYOS);
}
CilindrosLateralesEstacionEspacial.prototype.generarMipMap=function (){
  this.cilindro.generarMipMap();
}
