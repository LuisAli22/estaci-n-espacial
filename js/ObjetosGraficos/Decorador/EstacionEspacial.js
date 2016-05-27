function EstacionEspacial(objetoCompuesto){
  this.objetoCompuesto=objetoCompuesto;
}
EstacionEspacial.prototype.dibujar = function(){
  gl.uniform3f(shaderProgram.ambientColorUniform, 0.2, 0.2, 0.2 );
  gl.uniform3f(shaderProgram.directionalColorUniform, 0.05, 0.05, 0.05);
  mvPushMatrix();
    mat4.scale(mvMatrix, mvMatrix, [FACTORESCALAESTACION, FACTORESCALAESTACION, FACTORESCALAESTACION]);
    this.objetoCompuesto.dibujar();
  mvPopMatrix();
}
EstacionEspacial.prototype.inicializarTextura=function(){
  this.objetoCompuesto.inicializarTextura();
}
EstacionEspacial.prototype.generarMipMap=function (){
  this.objetoCompuesto.generarMipMap();
}
EstacionEspacial.prototype.obtenerHijo=function(clave){
  return this.objetoCompuesto.obtenerHijo(clave);
}
