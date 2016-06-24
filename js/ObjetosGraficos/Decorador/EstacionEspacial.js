EstacionEspacial.prototype= new ObjetoGraficoCompuesto;
EstacionEspacial.prototype.constructor=EstacionEspacial;
function EstacionEspacial(){}
EstacionEspacial.prototype.dibujar = function(){
  pilaMatrizDeModelado.meter();
    mat4.scale(mvMatrix, mvMatrix, [FACTORESCALAESTACION, FACTORESCALAESTACION, FACTORESCALAESTACION]);
    ObjetoGraficoCompuesto.prototype.dibujar.call(this);
  pilaMatrizDeModelado.sacar();
}
