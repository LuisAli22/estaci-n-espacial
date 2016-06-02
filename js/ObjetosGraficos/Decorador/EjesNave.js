function EjesNave(controladorEjesYTubinas){

  this.cubo = new Cubo(7.0);
  this.cilindro = new Cilindro(64,64,7.0,0);
  this.controladorEjesYTubinas = controladorEjesYTubinas;
  this.desplazamientoX = 0.63388347565;
  this.desplazamientoY = -1.5303300859;

  this.dibujarEje = function(x,y,angulo){

    var matrizTraslacion = mat4.create();
    var matrizRotacion = mat4.create();
    var matrizEscalado = mat4.create();

    mat4.translate(matrizTraslacion,matrizTraslacion,[x,y,0.0]);
    mat4.rotateZ(matrizRotacion,matrizRotacion,angulo);
    mat4.scale(matrizEscalado,matrizEscalado,[0.5,2.0,0.5]);

    mvPushMatrix();

      mat4.multiply(mvMatrix,mvMatrix,matrizTraslacion);
      mat4.multiply(mvMatrix,mvMatrix,matrizRotacion);
      mat4.multiply(mvMatrix,mvMatrix,matrizEscalado);
    
      this.cubo.dibujar();

    mvPopMatrix();

  }

  this.dibujarCilindro = function(){
  
    var matrizRotacion = mat4.create();
    var matrizEscalado = mat4.create();

    mat4.rotateY(matrizRotacion,matrizRotacion,Math.PI/2);
    mat4.scale(matrizEscalado,matrizEscalado,[0.375,0.375,4.0]);

    mvPushMatrix();

      mat4.multiply(mvMatrix,mvMatrix,matrizRotacion);
      mat4.multiply(mvMatrix,mvMatrix,matrizEscalado);
    
      this.cilindro.dibujar();

    mvPopMatrix();

  }

}
EjesNave.prototype.dibujar = function(){

    var matrizRotacion = mat4.create();

    mat4.rotateX(matrizRotacion,matrizRotacion,this.controladorEjesYTubinas.getAngulo());

    mvPushMatrix();
      mat4.multiply(mvMatrix,mvMatrix,matrizRotacion);
      this.dibujarEje(-2.0,0.0,0.0);
      this.dibujarEje(2.0,0.0,0.0);
      this.dibujarEje(2.0+this.desplazamientoX,this.desplazamientoY,Math.PI/4.0);
      this.dibujarEje(-2.0-this.desplazamientoX,this.desplazamientoY,-Math.PI/4.0);
      this.dibujarEje(-2.0-this.desplazamientoX,-this.desplazamientoY,Math.PI/4.0);
      this.dibujarEje(2.0+this.desplazamientoX,-this.desplazamientoY,-Math.PI/4.0);
      this.dibujarCilindro();
    mvPopMatrix();  

}

EjesNave.prototype.inicializarTextura=function(){
  this.cubo.inicializarTextura(RUTAIMAGENMARTE);
  this.cilindro.inicializarTextura(RUTAIMAGENMARTE);
}
EjesNave.prototype.generarMipMap=function (){
  this.cubo.generarMipMap();
  this.cilindro.generarMipMap();
}