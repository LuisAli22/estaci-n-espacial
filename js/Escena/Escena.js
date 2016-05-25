function Escena(canvas){
  canvas.onmousedown = this.apretaronUnBotonDelMouse .bind(this);
	canvas.onmouseup = this.soltaronUnBotonDelMouse.bind(this);
	canvas.onmousemove = this.seMueveElMouse.bind(this);
  canvas.tabIndex = 1000;
  canvas.onkeydown = this.presionoUnaTecla.bind(this);
  this.camara= new CamaraOrbital(canvas, 200,0.5 * Math.PI, 0.5 * Math.PI);
  cilindro = new Cilindro(64,64,DORADO,0);
  var fabricaEspacioEstelar= new FabricaEspacioEstelar(this.camara);
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
Escena.prototype.presionoUnaTecla=function(evento){
  switch(evento.which){
    case TECLADIRECCIONARRIBA : abrirPaneles = listo;
              break;
    case TECLADIRECCIONABAJO : cerrarPaneles = listo;
              break;
    
  }
  
}
Escena.prototype.generarMipMap=function(){
  this.espacioEstelar.generarMipMap();
}
Escena.prototype.configurarMatrizDeProyeccion=function(){
  mat4.perspective(pMatrix, 3.14/12.0, gl.viewportWidth / gl.viewportHeight, 0.1, 1000.0);
  gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
}

Escena.prototype.dibujar=function(){
  console.log("Escena.dibujar()");
  // Se configura el vierport dentro de �rea �canvas�. en este caso se utiliza toda
  // el �rea disponible
      gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
  // Se habilita el color de borrado para la pantalla (Color Buffer) y otros buffers
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      this.configurarMatrizDeProyeccion();
      this.espacioEstelar.dibujar();
}
