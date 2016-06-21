EstacionEspacial.prototype= new ObjetoGraficoCompuesto;
EstacionEspacial.prototype.constructor=EstacionEspacial;
function EstacionEspacial(){}
EstacionEspacial.prototype.dibujar = function(){
  //gl.uniform3f(shaderProgram.ambientColorUniform, 0.3, 0.3, 0.3 );
  //gl.uniform3f(shaderProgram.directionalColorUniform, 0.05, 0.05, 0.05);
  pilaMatrizDeModelado.meter();
    mat4.scale(mvMatrix, mvMatrix, [FACTORESCALAESTACION, FACTORESCALAESTACION, FACTORESCALAESTACION]);
    ObjetoGraficoCompuesto.prototype.dibujar.call(this);
  pilaMatrizDeModelado.sacar();
}
