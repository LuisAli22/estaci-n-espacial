TurbinasNave.prototype= new ParteGiratoriaDeAla;
TurbinasNave.prototype.constructor=TurbinasNave;
function TurbinasNave(){
  this.limiteAngular=Math.PI/4.0;
  this.turbina = new Director (new ConstructorTurbina());

  this.dibujarTurbina = function(x,y){

    var matrizTraslacion = mat4.create();
    var matrizRotacion = mat4.create();
    var matrizEscalado = mat4.create();

    mat4.translate(matrizTraslacion,matrizTraslacion,[x,y,0.0]);
    mat4.rotateX(matrizRotacion,matrizRotacion,Math.PI/2.0+this.angulo);
    mat4.scale(matrizEscalado,matrizEscalado,[1.1,1.1,1.1]);

    pilaMatrizDeModelado.meter();
      mat4.multiply(mvMatrix,mvMatrix,matrizTraslacion);
      mat4.multiply(mvMatrix,mvMatrix,matrizRotacion);
      mat4.multiply(mvMatrix,mvMatrix,matrizEscalado);
      this.turbina.dibujar();
    pilaMatrizDeModelado.sacar();

  }

}
TurbinasNave.prototype.dibujar = function(){
    pilaMatrizDeModelado.meter();
      this.dibujarTurbina(3.65,2.7);
      this.dibujarTurbina(3.65,-2.7);
      this.dibujarTurbina(-3.65,2.7);
      this.dibujarTurbina(-3.65,-2.7);
    pilaMatrizDeModelado.sacar();

}

TurbinasNave.prototype.inicializarTextura=function(){
  this.turbina.inicializarTextura(RUTAIMAGENMARTE);
}
TurbinasNave.prototype.generarMipMap=function (){
  this.turbina.generarMipMap();
}
