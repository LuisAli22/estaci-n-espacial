function PanelEstacionEspacial(material){
 
  this.abrirPaneles = false;
  this.cerrarPaneles = false;
  this.listo = true;
  this.angulo = 0;
  this.altura = [0.0,0.0,0.0,0.0];
  this.alturaMaxima = [1.3,2.5,3.7,4.9];
	this.rotarAbrir = false;
	this.rotarCerrar = false;
	this.cerrarPanel = false;
	this.abrirPanel = false;
	this.panelAbierto = true;
	this.panelCerrado = false;

  this.panel = new Panel(material);
  this.cilindro = new Cilindro(64,64,BEIS,0);
  var material = new Material(RUTAIMAGENTAPA,8.0,1.0,64,64);
  material.cargar();
  this.cilindro.setMaterial(material);

  this.dibujarPanel = function(y){

    var matrizTraslacion = mat4.create();
    var matrizRotacion = mat4.create();

    mat4.translate(matrizTraslacion,matrizTraslacion,[0.0,y,0.0]);
    mat4.rotateX(matrizRotacion,matrizRotacion,this.angulo);

    pilaMatrizDeModelado.meter();

      mat4.multiply(mvMatrix,mvMatrix,matrizTraslacion);
      mat4.multiply(mvMatrix,mvMatrix,matrizRotacion);

      this.panel.dibujar();

    pilaMatrizDeModelado.sacar();

  }

  this.dibujarCilindro = function(traslacion){

    var matrizEscalado = mat4.create();
    var matrizTraslacion = mat4.create();
    var matrizTraslacionFinal = mat4.create();
    var matrizRotacion = mat4.create();

    mat4.rotateX(matrizRotacion,matrizRotacion,Math.PI/2.0);
    mat4.scale(matrizEscalado,matrizEscalado,[0.3,0.1,0.3]);

    pilaMatrizDeModelado.meter();
      mat4.translate(matrizTraslacionFinal,matrizTraslacionFinal,[0,traslacion,0.0]);

      mat4.multiply(mvMatrix,mvMatrix,matrizTraslacionFinal);
      mat4.multiply(mvMatrix,mvMatrix,matrizEscalado);
      mat4.multiply(mvMatrix,mvMatrix,matrizTraslacion);
      mat4.multiply(mvMatrix,mvMatrix,matrizRotacion);

      this.cilindro.dibujar();
    pilaMatrizDeModelado.sacar();

  };


}
PanelEstacionEspacial.prototype.dibujar = function(){

    this.controlar();

    var altura1 = this.getAltura(0);
    var altura2 = this.getAltura(1);
    var altura3 = this.getAltura(2);
    var altura4 = this.getAltura(3);

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
  this.cilindro.inicializarTextura(RUTAIMAGENTAPA);
  this.panel.inicializarTextura(RUTAIMAGENMARTE);
}
PanelEstacionEspacial.prototype.generarMipMap=function(){
  this.cilindro.generarMipMap();
  this.panel.generarMipMap();
}
PanelEstacionEspacial.prototype.revisarEstados = function(){
  if(this.cerrarPaneles && this.panelAbierto){
    this.cerrarPaneles = false;
    this.rotarCerrar = true;
    this.listo = false;
  }else if (this.cerrarPaneles){
    this.cerrarPaneles = false;
  }
  if(this.abrirPaneles&&this.panelCerrado){
    this.abrirPaneles = false;
    this.abrirPanel = true;
    this.listo = false;
  }else if(this.abrirPaneles){
    this.abrirPaneles = false;
  }
}
PanelEstacionEspacial.prototype.rotarPaneles = function(){
  if(this.rotarCerrar){
    this.angulo += 0.01;
    if(this.angulo > Math.PI/2){
      this.cerrarPanel = true;
      this.rotarCerrar = false;
    }
  }else if(this.rotarAbrir){
    this.angulo -= 0.01;
    if(this.angulo < 0){
      this.rotarAbrir = false;
      this.listo = true;
      this.panelAbierto = true;
      this.panelCerrado = false;
    }
  }
}
PanelEstacionEspacial.prototype.puedoCerrarPaneles = function(){

  return this.cerrarPanel;

}
PanelEstacionEspacial.prototype.puedoAbrirPaneles = function(){

  return this.abrirPanel;

}
PanelEstacionEspacial.prototype.moverPanel = function(id){

  if(this.puedoCerrarPaneles() && this.altura[id] <  this.alturaMaxima[id]){
    this.altura[id] += 0.01;
  }else if (this.puedoCerrarPaneles() && id==3){
    this.cerrarPanel = false;
    this.listo = true;
    this.panelAbierto = false;
    this.panelCerrado = true;
  }else if(this.puedoAbrirPaneles() && this.altura[id] > 0){
    this.altura[id] -= 0.01;
  }else if(this.puedoAbrirPaneles() && id==3){
    this.abrirPanel = false;
    this.rotarAbrir = true;
  }

}
PanelEstacionEspacial.prototype.moverPaneles = function(){
  for (var i = 0; i < 4; i++) {
    this.moverPanel(i);
  };
}
PanelEstacionEspacial.prototype.getAltura = function(id){
  return this.altura[id];
}
PanelEstacionEspacial.prototype.getAngulo = function(){
  return this.angulo;
}

PanelEstacionEspacial.prototype.controlar = function(){

  this.revisarEstados();
  this.rotarPaneles();
  this.moverPaneles();

}
PanelEstacionEspacial.prototype.abrir=function(){
  this.abrirPaneles = this.listo;
}
PanelEstacionEspacial.prototype.cerrar=function(){
  this.cerrarPaneles = this.listo;
}
