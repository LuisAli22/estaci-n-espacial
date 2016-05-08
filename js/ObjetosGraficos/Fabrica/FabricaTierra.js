function FabricaTierra(){}
FabricaTierra.prototype.crear=function(matrizModelado){
  var nuevaMatrizModelado=this.transformarMatrizModelado(matrizModelado);
  var esfera = new Esfera(64, 64,CELESTE,nuevaMatrizModelado);
  esfera.inicializarTextura(RUTAIMAGENMARTE);
  return esfera;
}
FabricaTierra.prototype.transformarMatrizModelado=function(matrizModelado){
  // Matriz de modelado de la tierra
  var model_matrix_tierra = mat4.create();

  mat4.translate(model_matrix_tierra, matrizModelado, [0, DISTANCIAYTIERRA, 0 ]);
  mat4.scale(model_matrix_tierra, model_matrix_tierra, [FACTORESCALATIERRA, FACTORESCALATIERRA, FACTORESCALATIERRA]);
  return model_matrix_tierra;
}
