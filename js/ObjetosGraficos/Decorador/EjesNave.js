EjesNave.prototype=new ParteGiratoriaDeAla;
EjesNave.prototype.constructor=EjesNave;
function EjesNave(){
  this.objetoGraficoCompuesto=new ObjetoGraficoCompuesto();
  this.limiteAngular=Math.PI/2.0;
  this.cubo = new Cubo(7.0);
  this.cilindro = new Cilindro(64,64,7.0,0);
  this.desplazamientoX = 0.63388347565;
  this.desplazamientoY = -1.5303300859;

  this.dibujarEje = function(x,y,angulo){

    var matrizTraslacion = mat4.create();
    var matrizRotacion = mat4.create();
    var matrizEscalado = mat4.create();

    mat4.translate(matrizTraslacion,matrizTraslacion,[x,y,-0.25]);
    mat4.rotateZ(matrizRotacion,matrizRotacion,angulo);
    mat4.scale(matrizEscalado,matrizEscalado,[0.5,2.0,0.5]);

    pilaMatrizDeModelado.meter();

      mat4.multiply(mvMatrix,mvMatrix,matrizTraslacion);
      mat4.multiply(mvMatrix,mvMatrix,matrizRotacion);
      mat4.multiply(mvMatrix,mvMatrix,matrizEscalado);

      this.cubo.dibujar();

    pilaMatrizDeModelado.sacar();

  }

  this.dibujarCilindro = function(){

    var matrizRotacion = mat4.create();
    var matrizEscalado = mat4.create();

    mat4.rotateY(matrizRotacion,matrizRotacion,Math.PI/2);
    mat4.scale(matrizEscalado,matrizEscalado,[0.375,0.375,4.0]);

    pilaMatrizDeModelado.meter();

      mat4.multiply(mvMatrix,mvMatrix,matrizRotacion);
      mat4.multiply(mvMatrix,mvMatrix,matrizEscalado);

      this.cilindro.dibujar();

    pilaMatrizDeModelado.sacar();

  }

}
EjesNave.prototype.dibujar = function(){

    pilaMatrizDeModelado.meter();
      mat4.rotateX(mvMatrix,mvMatrix,this.angulo);
      this.dibujarEje(-2.0,0.0,0.0);
      this.dibujarEje(2.0,0.0,0.0);
      this.dibujarEje(2.0+this.desplazamientoX,this.desplazamientoY,Math.PI/4.0);
      this.dibujarEje(-2.0-this.desplazamientoX,this.desplazamientoY,-Math.PI/4.0);
      this.dibujarEje(-2.0-this.desplazamientoX,-this.desplazamientoY,Math.PI/4.0);
      this.dibujarEje(2.0+this.desplazamientoX,-this.desplazamientoY,-Math.PI/4.0);
      this.dibujarCilindro();
      this.objetoGraficoCompuesto.dibujar();
    pilaMatrizDeModelado.sacar();
}

EjesNave.prototype.inicializarTextura=function(){
  this.cubo.inicializarTextura(RUTAIMAGENMARTE);
  this.cilindro.inicializarTextura(RUTAIMAGENMARTE);
  this.objetoGraficoCompuesto.inicializarTextura();
}
EjesNave.prototype.generarMipMap=function (){
  this.cubo.generarMipMap();
  this.cilindro.generarMipMap();
  this.objetoGraficoCompuesto.generarMipMap();
}
EjesNave.prototype.agregar=function(clave,objetoGrafico){
  this.objetoGraficoCompuesto.agregar(clave,objetoGrafico);
}
EjesNave.prototype.obtenerHijo=function(clave){
  return this.objetoGraficoCompuesto.obtenerHijo(clave);
}
