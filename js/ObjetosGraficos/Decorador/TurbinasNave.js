function TurbinasNave(controladorEjesYTubinas){

  this.turbina = new Turbina();
  this.controladorEjesYTubinas = controladorEjesYTubinas;

  this.dibujarTurbina = function(x,y){

    var matrizTraslacion = mat4.create();
    var matrizRotacion = mat4.create();

    mat4.translate(matrizTraslacion,matrizTraslacion,[x,y,0.0]);
    mat4.rotateX(matrizRotacion,matrizRotacion,Math.PI/2.0+this.controladorEjesYTubinas.getAnguloTurbinas());

    mvPushMatrix();

      mat4.multiply(mvMatrix,mvMatrix,matrizTraslacion);
      mat4.multiply(mvMatrix,mvMatrix,matrizRotacion);
    
      this.turbina.dibujar();

    mvPopMatrix();

  }

}
TurbinasNave.prototype.dibujar = function(){

    this.dibujarTurbina(4.0,3.5);
    this.dibujarTurbina(4.0,-3.5);
    this.dibujarTurbina(-4.0,3.5);
    this.dibujarTurbina(-4.0,-3.5);

}

TurbinasNave.prototype.inicializarTextura=function(){
  this.turbina.inicializarTextura(RUTAIMAGENMARTE);
}
TurbinasNave.prototype.generarMipMap=function (){
  this.turbina.generarMipMap();
}