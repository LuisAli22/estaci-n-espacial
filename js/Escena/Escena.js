function Escena(canvas){
  canvas.onmousedown = this.apretaronUnBotonDelMouse .bind(this);
	canvas.onmouseup = this.soltaronUnBotonDelMouse.bind(this);
	canvas.onmousemove = this.seMueveElMouse.bind(this);
  this.camara= new CamaraOrbital(canvas, 200,0.5 * Math.PI, 0.5 * Math.PI);
  var fabricaEspacioEstelar= new FabricaEspacioEstelar();
  this.espacioEstelar=fabricaEspacioEstelar.crear();
  this.espacioEstelar.inicializarTextura();
}
Escena.prototype.apretaronUnBotonDelMouse=function(evento){
  this.camara.apretaronUnBotonDelMouse(evento);
}
Escena.prototype.soltaronUnBotonDelMouse=function(evento){
  this.camara.soltaronUnBotonDelMouse(evento);
}
Escena.prototype.seMueveElMouse=function(evento){
  this.camara.seMueveElMouse(evento);
}
Escena.prototype.generarMipMap=function(){
  this.espacioEstelar.generarMipMap();
}
Escena.prototype.configurarMatrizDeProyeccion=function(){
  mat4.perspective(pMatrix, 3.14/12.0, gl.viewportWidth / gl.viewportHeight, 0.1, 1000.0);
  gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
}
Escena.prototype.configurarIluminacionYCamaraYDibujar=function(){
  var matrizCamara = this.camara.obtenerMatriz();
  var lighting=true;
  gl.uniformMatrix4fv(shaderProgram.ViewMatrixUniform, false, matrizCamara);
  var lightPosition = [-100.0, 0.0, -60.0];
	vec3.transformMat4(lightPosition, lightPosition, matrizCamara);
  gl.uniform1i(shaderProgram.useLightingUniform, lighting);
  gl.uniform3fv(shaderProgram.lightingDirectionUniform, lightPosition);
  this.espacioEstelar.dibujar();
}
Escena.prototype.dibujar=function(){
  console.log("Escena.dibujar()");
  // Se configura el vierport dentro de �rea �canvas�. en este caso se utiliza toda
  // el �rea disponible
      gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
  // Se habilita el color de borrado para la pantalla (Color Buffer) y otros buffers
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      this.configurarMatrizDeProyeccion();
      this.configurarIluminacionYCamaraYDibujar();
}
