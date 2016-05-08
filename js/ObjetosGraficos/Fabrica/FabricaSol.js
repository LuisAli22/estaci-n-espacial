function FabricaSol(){
   this.solRotationAngletierra = 0.0;
}
FabricaSol.prototype.crear=function(matrizModelado){
  console.log("Crear sol");
  var nuevaMatrizModelado=this.transformarMatrizModelado(matrizModelado);
  var esfera = new Esfera(64, 64,AMARILLO,nuevaMatrizModelado);
  return esfera;
}

FabricaSol.prototype.transformarMatrizModelado=function(matrizModelado){
  // Matriz de modelado del sol
  var model_matrix_sol = mat4.create();
  var translate_sol = mat4.create();
  mat4.translate(translate_sol, translate_sol, [DISTANCIAXSOL, 0, 0 ]);
  // Matriz de rotaci�n del eje sobre el plano de la ecl�ptica a 23 grados
  var axis_inclination_matrix = mat4.create();
  mat4.rotate(axis_inclination_matrix, axis_inclination_matrix, -0.4014, [0, 0, 1]);
  var translation_movement = mat4.create();
  var inverse_translation_movement = mat4.create();
  mat4.rotate(translation_movement, translation_movement, this.solRotationAngletierra, [0, 1, 0]);
  mat4.rotate(inverse_translation_movement, inverse_translation_movement, -this.solRotationAngletierra, [0, 1, 0]);

  // Las transformaciones aplicadas a la Tierra son:
  // (el �rden es el inverso al de las llamadas a la funci�n multiply)
  //
  // 1. Se aplica el movimiento de rotaci�n de la Tierra
  // 2. Se inclina el eje de rotaci�n 23 grados
  // 3. Se aplica la inversa del �ngulo de rotaci�n del movimiento alrededor del Sol
  //    con el fin de luego compensar dicha rotaci�n y mantener el Eje de la Tierra siempre
  //    en la misma orientaci�n
  // 4. A partir de ac� se aplican las dos transformaciones que son comunes con la Tierra
  //          4.1 La traslaci�n para poner al sistema Tierra-Luna en orbita alrededor del Sol
  //          4.2 La rotaci�n para poner al sistema Tierra-Luna a girar en torno al Sol.
  mat4.multiply(model_matrix_sol, matrizModelado, translation_movement);
  mat4.multiply(model_matrix_sol, model_matrix_sol, translate_sol);
  mat4.multiply(model_matrix_sol, model_matrix_sol, inverse_translation_movement);
  mat4.multiply(model_matrix_sol, model_matrix_sol, axis_inclination_matrix);
  mat4.multiply(model_matrix_sol, model_matrix_sol, solRotationMatrix);
  var scale_sol_matrix = mat4.create();
  mat4.identity(scale_sol_matrix);
  mat4.scale(scale_sol_matrix, scale_sol_matrix, [FACTORESCALASOL, FACTORESCALASOL, FACTORESCALASOL]);
  mat4.multiply(model_matrix_sol, model_matrix_sol, scale_sol_matrix);
  return model_matrix_sol;
}
