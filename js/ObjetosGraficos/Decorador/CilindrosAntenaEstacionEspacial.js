function CilindrosAntenaEstacionEspacial(material){
  this.cilindro=new Cilindro(64,64,material,0);

  this.dibujarCilindro = function(traslacion){

    var matrizEscalado = mat4.create();
    var matrizTraslacion = mat4.create();
    var matrizTraslacionFinal = mat4.create();
    var matrizRotacion = mat4.create();

    mat4.rotateX(matrizRotacion,matrizRotacion,Math.PI/2.0);
    mat4.scale(matrizEscalado,matrizEscalado,[0.3,0.1,0.3]);
 
    mvPushMatrix();
      mat4.identity(matrizTraslacionFinal);
      mat4.translate(matrizTraslacionFinal,matrizTraslacionFinal,[0,traslacion,0.0]);

      mat4.multiply(mvMatrix,mvMatrix,matrizTraslacionFinal);
      mat4.multiply(mvMatrix,mvMatrix,matrizEscalado);
      mat4.multiply(mvMatrix,mvMatrix,matrizTraslacion);
      mat4.multiply(mvMatrix,mvMatrix,matrizRotacion);
        
      this.cilindro.dibujar();
    mvPopMatrix();

  };

}

CilindrosAntenaEstacionEspacial.prototype.dibujar = function(){

    this.dibujarCilindro(3.25);
    this.dibujarCilindro(4.75);
    this.dibujarCilindro(6.25);
    this.dibujarCilindro(7.75);
    this.dibujarCilindro(-3.11);
    this.dibujarCilindro(-4.61);
    this.dibujarCilindro(-6.11);
    this.dibujarCilindro(-7.61);

}

CilindrosAntenaEstacionEspacial.prototype.inicializarTextura=function(){
  this.cilindro.inicializarTextura(RUTAIMAGENMARTE);
}
CilindrosAntenaEstacionEspacial.prototype.generarMipMap=function (){
  this.cilindro.generarMipMap();
}