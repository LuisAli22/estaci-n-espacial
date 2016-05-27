function TurbinasNave(controladorEjesYTubinas){

  this.turbina = new Turbina();
  this.controladorEjesYTubinas = controladorEjesYTubinas;

  this.dibujarTurbina = function(x,y){

    var matrizTraslacion = mat4.create();
    var matrizRotacion = mat4.create();
    var matrizEscalado = mat4.create();

    mat4.translate(matrizTraslacion,matrizTraslacion,[x,y,0.0]);
    mat4.rotateX(matrizRotacion,matrizRotacion,Math.PI/2.0+this.controladorEjesYTubinas.getAnguloTurbinas());
    mat4.scale(matrizEscalado,matrizEscalado,[1.1,1.1,1.1]);

    mvPushMatrix();

      mat4.multiply(mvMatrix,mvMatrix,matrizTraslacion);
      mat4.multiply(mvMatrix,mvMatrix,matrizRotacion);
      mat4.multiply(mvMatrix,mvMatrix,matrizEscalado);
    
      this.turbina.dibujar();

    mvPopMatrix();

  }

}
TurbinasNave.prototype.dibujar = function(){

    var matrizRotacion = mat4.create();

    mat4.rotateX(matrizRotacion,matrizRotacion,this.controladorEjesYTubinas.getAngulo());

    mvPushMatrix();
      mat4.multiply(mvMatrix,mvMatrix,matrizRotacion);
      this.dibujarTurbina(4.0,3.5);
      this.dibujarTurbina(4.0,-3.5);
      this.dibujarTurbina(-4.0,3.5);
      this.dibujarTurbina(-4.0,-3.5);
    mvPopMatrix();

}

TurbinasNave.prototype.inicializarTextura=function(){
  this.turbina.inicializarTextura(RUTAIMAGENMARTE);
}
TurbinasNave.prototype.generarMipMap=function (){
  this.turbina.generarMipMap();
}