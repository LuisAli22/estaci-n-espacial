function Panel(material){

  this.cubo = new Cubo(6.0);

  this.dibujarPanel = function(x,y){

    var matrizEscalado = mat4.create();
    var matrizTraslacionFinal = mat4.create();

    mat4.scale(matrizEscalado,matrizEscalado,[2.5,0.5,0.05]);
   
    mvPushMatrix();

      mat4.translate(matrizTraslacionFinal,matrizTraslacionFinal,[x,y,0.0]);

      mat4.multiply(mvMatrix,mvMatrix,matrizTraslacionFinal);
      mat4.multiply(mvMatrix,mvMatrix,matrizEscalado);
        
      this.cubo.dibujar();

    mvPopMatrix();

  }

  this.dibujarCilindroLateral = function(x){

    var matrizEscalado = mat4.create();
    var matrizTraslacionFinal = mat4.create();
    var matrizRotacion = mat4.create();

    mat4.rotateX(matrizRotacion,matrizRotacion,Math.PI/2.0);
    mat4.scale(matrizEscalado,matrizEscalado,[0.05,0.5,0.05]);

    mvPushMatrix();

      mat4.translate(matrizTraslacionFinal,matrizTraslacionFinal,[x,0.0,0.0]);

      mat4.multiply(mvMatrix,mvMatrix,matrizTraslacionFinal);
      mat4.multiply(mvMatrix,mvMatrix,matrizEscalado);
      mat4.multiply(mvMatrix,mvMatrix,matrizRotacion);
      
      cilindro.dibujar();
      
    mvPopMatrix();

  }

}

Panel.prototype.dibujar = function(){

  var matrizEscalado = mat4.create();
  var matrizRotacion = mat4.create();

  mat4.rotateY(matrizRotacion,matrizRotacion,Math.PI/2.0);
  mat4.scale(matrizEscalado,matrizEscalado,[4.0,0.05,0.05]);

  //eje
  mvPushMatrix();

    mat4.multiply(mvMatrix,mvMatrix,matrizEscalado);
    mat4.multiply(mvMatrix,mvMatrix,matrizRotacion);
    
    cilindro.dibujar();

  mvPopMatrix();

  this.dibujarCilindroLateral(-2.0);
  this.dibujarCilindroLateral(2.0);

  this.dibujarPanel(2.0,0.375);
  this.dibujarPanel(2.0,-0.375);
  this.dibujarPanel(-2.0,0.375);
  this.dibujarPanel(-2.0,-0.375);

}

Panel.prototype.inicializarTextura=function(){
  this.cubo.inicializarTextura(RUTAIMAGENMARTE);
}
Panel.prototype.generarMipMap=function (){
  this.cubo.generarMipMap();
}