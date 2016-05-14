function Sol(esfera,camara){
  this.anguloDeRotacionDelSolespectoALaTierra = 0.0;
  this.esfera=esfera;
  this.camara=camara;
  this.posicionDeLaLuz=[ 0, 0 , 0];
  this.iluminar=true;
  this.matrizDeTraslacionDelSolDesdeElOrigenDeLaTierra=mat4.create();
  this.matrizDeRotacionDelSolRespectoALaTierra=mat4.create();
  this.matrizDeEscaladoDelSol=mat4.create();
}
Sol.prototype.configurarIluminacion=function(){
  var matrizCamara = this.camara.obtenerMatriz();
  gl.uniformMatrix4fv(shaderProgram.ViewMatrixUniform, false, matrizCamara);
  this.posicionDeLaLuz=[ 0, 0 , 0];
  vec3.transformMat4(this.posicionDeLaLuz, this.posicionDeLaLuz, this.matrizDeTraslacionDelSolDesdeElOrigenDeLaTierra);
  vec3.transformMat4(this.posicionDeLaLuz, this.posicionDeLaLuz, this.matrizDeRotacionDelSolRespectoALaTierra);
	vec3.transformMat4(this.posicionDeLaLuz, this.posicionDeLaLuz, matrizCamara);
  gl.uniform1i(shaderProgram.useLightingUniform, this.iluminar);
  gl.uniform3fv(shaderProgram.lightingDirectionUniform, this.posicionDeLaLuz);
}
Sol.prototype.calcularMatrizDeTraslacion=function(){
  mat4.identity(this.matrizDeTraslacionDelSolDesdeElOrigenDeLaTierra);
  mat4.translate(this.matrizDeTraslacionDelSolDesdeElOrigenDeLaTierra, this.matrizDeTraslacionDelSolDesdeElOrigenDeLaTierra, [DISTANCIAXSOL, DISTANCIAYTIERRA, 0 ]);
}
Sol.prototype.calcularMatrizDeRotacion=function(){
  mat4.identity(this.matrizDeRotacionDelSolRespectoALaTierra);
  mat4.rotate(this.matrizDeRotacionDelSolRespectoALaTierra, this.matrizDeRotacionDelSolRespectoALaTierra, this.anguloDeRotacionDelSolespectoALaTierra, [1, 1, 0]);
}
Sol.prototype.calcularMatrizDeEscalado=function(){
  mat4.identity(this.matrizDeEscaladoDelSol);
  mat4.scale(this.matrizDeEscaladoDelSol, this.matrizDeEscaladoDelSol, [FACTORESCALASOL, FACTORESCALASOL, FACTORESCALASOL]);
}
Sol.prototype.aplicarTransformacionesALaMatrizDeModelado=function(){
  mat4.multiply(mvMatrix, mvMatrix, this.matrizDeRotacionDelSolRespectoALaTierra);
  mat4.multiply(mvMatrix, mvMatrix, this.matrizDeTraslacionDelSolDesdeElOrigenDeLaTierra);
  mat4.multiply(mvMatrix, mvMatrix,this.matrizDeEscaladoDelSol);
}
Sol.prototype.dibujar = function(){
  gl.uniform3f(shaderProgram.ambientColorUniform, 0.2, 0.2, 0.2 );
  gl.uniform3f(shaderProgram.directionalColorUniform, 0.5, 0.5, 0.5);
  this.anguloDeRotacionDelSolespectoALaTierra+= 0.0045;
  mvPushMatrix();
    this.calcularMatrizDeTraslacion();
    this.calcularMatrizDeRotacion();
    this.calcularMatrizDeEscalado();
    this.aplicarTransformacionesALaMatrizDeModelado();
    this.configurarIluminacion();
    this.esfera.dibujar();
  mvPopMatrix();
}
Sol.prototype.inicializarTextura=function(){
  this.esfera.inicializarTextura();
}
Sol.prototype.generarMipMap=function (){
  this.esfera.generarMipMap
}
