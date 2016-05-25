function Nave(objetoCompuesto){
  this.objetoCompuesto=objetoCompuesto;
}
Nave.prototype.dibujar = function(){
  gl.uniform3f(shaderProgram.ambientColorUniform, 0.2, 0.2, 0.2 );
  gl.uniform3f(shaderProgram.directionalColorUniform, 0.05, 0.05, 0.05);
  mvPushMatrix();
    mat4.translate(mvMatrix, mvMatrix, [0, 0, DISTANCIAZNAVE ]);
    mat4.scale(mvMatrix, mvMatrix, [FACTORESCALANAVE,FACTORESCALANAVE, FACTORESCALANAVE]);
    mat4.rotateY(mvMatrix, mvMatrix, Math.PI);
    this.objetoCompuesto.dibujar();
  mvPopMatrix();
}
Nave.prototype.inicializarTextura=function(){
  this.objetoCompuesto.inicializarTextura();
}
Nave.prototype.generarMipMap=function (){
  this.objetoCompuesto.generarMipMap();
}
