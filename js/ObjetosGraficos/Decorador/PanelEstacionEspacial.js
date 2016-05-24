function PanelEstacionEspacial(material){

  this.controladorPaneles = new ControladorPaneles();
  this.panel = new Panel(material);

  this.dibujarPanel = function(y){

    var matrizTraslacion = mat4.create();
    var matrizRotacion = mat4.create();

    var angulo = this.controladorPaneles.getAngulo();

    mat4.translate(matrizTraslacion,matrizTraslacion,[0.0,y,0.0]);
    mat4.rotateX(matrizRotacion,matrizRotacion,angulo);

    mvPushMatrix();

      mat4.multiply(mvMatrix,mvMatrix,matrizTraslacion);
      mat4.multiply(mvMatrix,mvMatrix,matrizRotacion);
    
      this.panel.dibujar();

    mvPopMatrix();

  }

  this.dibujarCilindro = function(traslacion){

    var matrizEscalado = mat4.create();
    var matrizTraslacion = mat4.create();
    var matrizTraslacionFinal = mat4.create();
    var matrizRotacion = mat4.create();

    mat4.rotateX(matrizRotacion,matrizRotacion,Math.PI/2.0);
    mat4.scale(matrizEscalado,matrizEscalado,[0.3,0.1,0.3]);
 
    mvPushMatrix();
      mat4.translate(matrizTraslacionFinal,matrizTraslacionFinal,[0,traslacion,0.0]);

      mat4.multiply(mvMatrix,mvMatrix,matrizTraslacionFinal);
      mat4.multiply(mvMatrix,mvMatrix,matrizEscalado);
      mat4.multiply(mvMatrix,mvMatrix,matrizTraslacion);
      mat4.multiply(mvMatrix,mvMatrix,matrizRotacion);
        
      cilindro.dibujar();
    mvPopMatrix();

  };

}
PanelEstacionEspacial.prototype.dibujar = function(){

    this.controladorPaneles.controlar();

    var altura1 = this.controladorPaneles.getAltura(0);
    var altura2 = this.controladorPaneles.getAltura(1);
    var altura3 = this.controladorPaneles.getAltura(2);
    var altura4 = this.controladorPaneles.getAltura(3);

    this.dibujarPanel(3.25-altura1);
    this.dibujarPanel(4.75-altura2);
    this.dibujarPanel(6.25-altura3);
    this.dibujarPanel(7.75-altura4);
    this.dibujarPanel(-3.11+altura1);
    this.dibujarPanel(-4.61+altura2);
    this.dibujarPanel(-6.11+altura3);
    this.dibujarPanel(-7.61+altura4);

    this.dibujarCilindro(3.25-altura1);
    this.dibujarCilindro(4.75-altura2);
    this.dibujarCilindro(6.25-altura3);
    this.dibujarCilindro(7.75-altura4);
    this.dibujarCilindro(-3.11+altura1);
    this.dibujarCilindro(-4.61+altura2);
    this.dibujarCilindro(-6.11+altura3);
    this.dibujarCilindro(-7.61+altura4);

}

PanelEstacionEspacial.prototype.inicializarTextura=function(){
  this.panel.inicializarTextura(RUTAIMAGENMARTE);
}
PanelEstacionEspacial.prototype.generarMipMap=function (){
  this.panel.generarMipMap();
}