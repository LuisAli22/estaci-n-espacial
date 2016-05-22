function PanelEstacionEspacial(material){

  this.panel = new Panel(material);

  this.dibujarPanel = function(y){

    var matrizTraslacion = mat4.create();

    mat4.translate(matrizTraslacion,matrizTraslacion,[0.0,y,0.0]);

    mvPushMatrix();

      mat4.multiply(mvMatrix,mvMatrix,matrizTraslacion);
    
      this.panel.dibujar();

    mvPopMatrix();

  }

}
PanelEstacionEspacial.prototype.dibujar = function(){

    this.dibujarPanel(3.25);
    this.dibujarPanel(4.75);
    this.dibujarPanel(6.25);
    this.dibujarPanel(7.75);
    this.dibujarPanel(-3.11);
    this.dibujarPanel(-4.61);
    this.dibujarPanel(-6.11);
    this.dibujarPanel(-7.61);

}

PanelEstacionEspacial.prototype.inicializarTextura=function(){
  this.panel.inicializarTextura(RUTAIMAGENMARTE);
}
PanelEstacionEspacial.prototype.generarMipMap=function (){
  this.panel.generarMipMap();
}