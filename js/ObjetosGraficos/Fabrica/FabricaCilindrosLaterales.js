function FabricaCilindrosLaterales(){
  this.matrizEscalado = mat4.create();
  mat4.scale(this.matrizEscalado,this.matrizEscalado,[0.2,0.2,2.5]);
  this.matrizTraslacion = mat4.create();
  mat4.translate(this.matrizTraslacion,this.matrizTraslacion,[0.0,0.0,0.5]);
}
FabricaCilindrosLaterales.prototype.crear=function(matrizModelado){
  console.log("Crear cilindros laterales de estacion espacial");
  var cilindrosLaterales=new ObjetoGraficoCompuesto();
  for (var i = 0; i < CANTIDADDECILINDROS; i++) {
    var nuevaMatrizModelado=this.transformarMatrizModelado(matrizModelado,i)
    var cilindro = new Cilindro(64,64,DORADO,nuevaMatrizModelado);
    cilindrosLaterales.agregar(cilindro);
  }
  return cilindrosLaterales;
}
FabricaCilindrosLaterales.prototype.transformarMatrizModelado=function(matrizModelado,idxCilindro){
  var nuevaMatrizModelado = mat4.create();
  var matrizRotacion = mat4.create();
  var anguloRotacion = ((ANGULOINCIALCILINDRO + VARIACIONDELANGULO * idxCilindro)*2.0*Math.PI)/180;
  mat4.rotateY(matrizRotacion,matrizRotacion,anguloRotacion);

  mat4.multiply(nuevaMatrizModelado,matrizModelado,matrizRotacion);
  mat4.multiply(nuevaMatrizModelado,nuevaMatrizModelado,this.matrizEscalado);
  mat4.multiply(nuevaMatrizModelado,nuevaMatrizModelado,this.matrizTraslacion);

  return nuevaMatrizModelado;
}
