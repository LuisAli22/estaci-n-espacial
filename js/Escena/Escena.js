function Escena(canvas){
  canvas.onmousedown = this.apretaronUnBotonDelMouse .bind(this);
	canvas.onmouseup = this.soltaronUnBotonDelMouse.bind(this);
	canvas.onmousemove = this.seMueveElMouse.bind(this);
  canvas.tabIndex = 1000;
  canvas.onwheel= this.seMueveLaRuedaDelMouse.bind(this);
  this.camara= new CamaraOrbital(canvas, 85,0.5 * Math.PI, 0.5 * Math.PI);
  cilindro = new Cilindro(64,64,DORADO,0);
  this.controladorEjesYTubinas = new ControladorEjesYTurbinas();
  this.controladorNave = new ControladorNave();
  this.controladorPatasNave = new ControladorPatasNave();
  var fabricaEspacioEstelar= new FabricaEspacioEstelar(this.camara,this.controladorEjesYTubinas,this.controladorNave,this.controladorPatasNave);
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
Escena.prototype.abrirPaneles=function(evento){
  abrirPaneles = listo;
}
Escena.prototype.cerrarPaneles=function(evento){
  cerrarPaneles = listo;
}
Escena.prototype.acercarse=function(evento){
  console.log("Hace zoom in con la tecla +");
  this.camara.acercarse(evento);
}
Escena.prototype.alejarse=function(evento){
  console.log("Hace zoom out con la tecla -");
  this.camara.alejarse(evento);
}
Escena.prototype.moverseHaciaAdelante=function(evento){

}
Escena.prototype.moverseHaciaAtras=function(evento){

}
Escena.prototype.moverseHaciaLaIzquierda=function(evento){

}
Escena.prototype.moverseHaciaLaDerecha=function(evento){

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
Escena.prototype.giroAntihorarioNave=function(){
  this.controladorNave.giroAntiHorario();
}
Escena.prototype.giroHorarioNave=function(){
  this.controladorNave.giroHorario();
}
Escena.prototype.moverNaveArriba=function(){
  this.controladorNave.moverArriba();
}
Escena.prototype.moverNaveAbajo=function(){
  this.controladorNave.moverAbajo();
}
Escena.prototype.moverNaveDerecha=function(){
  this.controladorNave.moverDerecha();
}
Escena.prototype.moverNaveIzquierda=function(){
  this.controladorNave.moverIzquierda();
}
Escena.prototype.acelerarNave=function(){
  this.controladorNave.acelerar();
}
Escena.prototype.desacelerarNave=function(){
  this.controladorNave.desacelerar();
}
Escena.prototype.soltarTeclaNave=function(estado){
  this.controladorNave.soltarTecla(estado);
}
Escena.prototype.abrirTrenNave=function(){
  this.controladorPatasNave.abrirTren();
}
Escena.prototype.cerrarTrenNave=function(){
  this.controladorPatasNave.cerrarTren();
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
