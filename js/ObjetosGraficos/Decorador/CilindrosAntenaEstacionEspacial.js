function CilindrosAntenaEstacionEspacial(cilindroAntena){
  this.cilindro=cilindroAntena;
  this.traslaciones = [];
}
CilindrosAntenaEstacionEspacial.prototype.dibujar = function(){

    var matrizEscalado = mat4.create();
    var matrizTraslacion = mat4.create();
    var matrizTraslacionFinal = mat4.create();
    var matrizRotacion = mat4.create();

    mat4.rotateX(matrizRotacion,matrizRotacion,Math.PI/2.0);
    mat4.scale(matrizEscalado,matrizEscalado,[0.3,0.1,0.3]);
    

    for (var i = 0; i < 4 ; i++) {
      mvPushMatrix();
        var traslacion;
        if(this.traslaciones[i]<0){
          traslacion = this.traslaciones[i] - 1.11;
        }else{
          traslacion = this.traslaciones[i] + 1.25;
        }
        mat4.identity(matrizTraslacionFinal);
        mat4.translate(matrizTraslacionFinal,matrizTraslacionFinal,[0,traslacion,0.0]);

        mat4.multiply(mvMatrix,mvMatrix,matrizTraslacionFinal);
        mat4.multiply(mvMatrix,mvMatrix,matrizEscalado);
        mat4.multiply(mvMatrix,mvMatrix,matrizTraslacion);
        mat4.multiply(mvMatrix,mvMatrix,matrizRotacion);
        
        this.cilindro.dibujar();
      mvPopMatrix();       
    };

}
CilindrosAntenaEstacionEspacial.prototype.cargarFactorTraslacion=function(traslacion){
  this.traslaciones.push(traslacion);
}
CilindrosAntenaEstacionEspacial.prototype.inicializarTextura=function(){
  this.cilindro.inicializarTextura(RUTAIMAGENMARTE);
}
CilindrosAntenaEstacionEspacial.prototype.generarMipMap=function (){
  this.cilindro.generarMipMap();
}