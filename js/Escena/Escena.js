function Escena(canvas){
  canvas.onmousedown = this.apretaronUnBotonDelMouse .bind(this);
	canvas.onmouseup = this.soltaronUnBotonDelMouse.bind(this);
	canvas.onmousemove = this.seMueveElMouse.bind(this);
  canvas.tabIndex = 1000;
  canvas.onwheel= this.seMueveLaRuedaDelMouse.bind(this);
  this.camara= new CamaraOrbital(canvas, 85,0.5 * Math.PI, 0.5 * Math.PI);
  cilindro = new Cilindro(64,64,DORADO,0);
  this.controladorEjesYTubinas = new ControladorEjesYTurbinas();
  var fabricaEspacioEstelar= new FabricaEspacioEstelar(this.camara,this.controladorEjesYTubinas);
  this.espacioEstelar=fabricaEspacioEstelar.crear();
  this.espacioEstelar.inicializarTextura();
  this.matrizDeProyeccion = mat4.create();
  this.campoVerticalDeVista=Math.PI/12.0;
  this.relacionDeAspecto=gl.viewportWidth / gl.viewportHeight;
}
Escena.prototype.seMueveLaRuedaDelMouse=function(evento){
  this.camara.seMueveLaRuedaDelMouse(evento);
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
Escena.prototype.abrirPaneles=function(){
  abrirPaneles = listo;
}
Escena.prototype.cerrarPaneles=function(){
  cerrarPaneles = listo;
}
Escena.prototype.acercarse=function(){
  console.log("Hace zoom in con la tecla +");
}
Escena.prototype.alejarse=function(){
  console.log("Hace zoom out con la tecla -");
}
Escena.prototype.moverseHaciaAdelante=function(){

}
Escena.prototype.moverseHaciaAtras=function(){

}
Escena.prototype.moverseHaciaLaIzquierda=function(){

}
Escena.prototype.moverseHaciaLaDerecha=function(){

}
Escena.prototype.giroTurbinasAntihorario=function(){
  this.controladorEjesYTubinas.giroAntihorarioTurbinas();
}
Escena.prototype.giroTurbinasHorario=function(){
  this.controladorEjesYTubinas.giroHorarioTurbinas();
}
Escena.prototype.giroEjesAntihorario=function(){
  this.controladorEjesYTubinas.giroEjesAntiHorario();
}
Escena.prototype.giroEjesHorario=function(){
  this.controladorEjesYTubinas.giroEjesHorario();
}
Escena.prototype.generarMipMap=function(){
  this.espacioEstelar.generarMipMap();
}
Escena.prototype.configurarMatrizDeProyeccion=function(){
  mat4.perspective(this.matrizDeProyeccion, this.campoVerticalDeVista, this.relacionDeAspecto,BORDECERCANOFRUSTUM, BORDELEJANOFRUSTUM);
  gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, this.matrizDeProyeccion);
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
