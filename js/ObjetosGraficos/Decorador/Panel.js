function Panel(material){

  this.cubo = new Director( new ConstructorPanel() );

  this.cilindro = new Director (new ConstructorCilindroGris());

  this.dibujarPanel = function(x,y){

    var matrizEscalado = mat4.create();
    var matrizTraslacionFinal = mat4.create();

    mat4.scale(matrizEscalado,matrizEscalado,[2.5,0.5,0.05]);
    mat4.translate(matrizTraslacionFinal,matrizTraslacionFinal,[x,y,0.0]);

    pilaMatrizDeModelado.meter();

      mat4.multiply(mvMatrix,mvMatrix,matrizTraslacionFinal);
      mat4.multiply(mvMatrix,mvMatrix,matrizEscalado);

      this.cubo.dibujar();

    pilaMatrizDeModelado.sacar();

  }

  this.dibujarCilindroLateral = function(x){

    var matrizEscalado = mat4.create();
    var matrizTraslacionFinal = mat4.create();
    var matrizRotacion = mat4.create();

    mat4.rotateX(matrizRotacion,matrizRotacion,Math.PI/2.0);
    mat4.scale(matrizEscalado,matrizEscalado,[0.05,0.5,0.05]);

    pilaMatrizDeModelado.meter();

      mat4.translate(matrizTraslacionFinal,matrizTraslacionFinal,[x,0.0,0.0]);

      mat4.multiply(mvMatrix,mvMatrix,matrizTraslacionFinal);
      mat4.multiply(mvMatrix,mvMatrix,matrizEscalado);
      mat4.multiply(mvMatrix,mvMatrix,matrizRotacion);

      this.cilindro.dibujar();

    pilaMatrizDeModelado.sacar();

  }

}

Panel.prototype.dibujar = function(){

  var matrizEscalado = mat4.create();
  var matrizRotacion = mat4.create();

  mat4.rotateY(matrizRotacion,matrizRotacion,Math.PI/2.0);
  mat4.scale(matrizEscalado,matrizEscalado,[4.0,0.05,0.05]);

  //eje
  pilaMatrizDeModelado.meter();

    mat4.multiply(mvMatrix,mvMatrix,matrizEscalado);
    mat4.multiply(mvMatrix,mvMatrix,matrizRotacion);

    this.cilindro.dibujar();

  pilaMatrizDeModelado.sacar();

  this.dibujarCilindroLateral(-2.0);
  this.dibujarCilindroLateral(2.0);

  this.dibujarPanel(2.0,0.375);
  this.dibujarPanel(2.0,-0.375);
  this.dibujarPanel(-2.0,0.375);
  this.dibujarPanel(-2.0,-0.375);

}

Panel.prototype.inicializarTextura=function(){
  this.cilindro.inicializarTextura(RUTAIMAGENTAPA);
  this.cubo.inicializarTextura(RUTAIMAGENPANEL);
}
Panel.prototype.generarMipMap=function (){
  this.cilindro.generarMipMap();
  this.cubo.generarMipMap();
}
