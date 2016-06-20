function Panel(material){

  this.cubo = new Cubo(6.0);

  var materialCubo = new Material(40,40);
  materialCubo.cargarTextura(RUTAIMAGENPANEL);
  materialCubo.cargarCoordenadasDeTextura();

  var materialCuboTapa = new Material(2,40);
  materialCuboTapa.cargarTextura(RUTAIMAGENPANEL);
  materialCuboTapa.cargarRepeticionDeTextura(3,32);
  materialCuboTapa.cargarCoordenadasDeTextura();

  this.cubo.agregarMaterial(materialCubo,materialCuboTapa);

  this.cubo.inicializarLosBuffer();

  this.cilindro = new Cilindro(64,64,BEIS,0);

  var materialCilindro = new Material(64,64);
  materialCilindro.cargarTextura(RUTAIMAGENTAPA);
  materialCilindro.cargarCoordenadasDeTextura();

  this.cilindro.setMaterial(materialCilindro);

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
  this.cubo.tapSuperior.inicializarTextura(RUTAIMAGENPANEL);
  this.cubo.tapInferior.inicializarTextura(RUTAIMAGENPANEL);
}
Panel.prototype.generarMipMap=function (){
  this.cilindro.generarMipMap();
  this.cubo.generarMipMap();
  this.cubo.tapSuperior.generarMipMap();
  this.cubo.tapInferior.generarMipMap();
}
