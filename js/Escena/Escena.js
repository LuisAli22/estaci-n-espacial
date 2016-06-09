function Escena(canvas){
  canvas.onmousedown = this.apretaronUnBotonDelMouse .bind(this);
	canvas.onmouseup = this.soltaronUnBotonDelMouse.bind(this);
  document.onmousemove=this.seMueveElMouse.bind(this);
  canvas.tabIndex = 1000;
  canvas.onwheel= this.seMueveLaRuedaDelMouse.bind(this);
  var fabricaEspacioEstelar= new FabricaEspacioEstelar();
  this.espacioEstelar=fabricaEspacioEstelar.crear();
  this.trayectoriaMedia=this.obtenerTrayectoriaMedia();
  this.camaras= {Orbital: new CamaraOrbital(canvas, 85,0.5 * Math.PI, 0.5 * Math.PI),
                PrimerPersonaBahia: new PrimerPersonaBahiaDeCarga(canvas,this.trayectoriaMedia)};
  this.asignarCamara("Orbital");
  cilindro = new Cilindro(64,64,DORADO,0);
  this.espacioEstelar.inicializarTextura();
  this.matrizDeProyeccion = mat4.create();
  this.campoVerticalDeVista=Math.PI/12.0;
  this.relacionDeAspecto=gl.viewportWidth / gl.viewportHeight;

}
Escena.prototype.obtenerUnObjetoDeLaEscena=function(claveDelObjeto){
  return this.espacioEstelar.obtenerHijo(claveDelObjeto)
}
Escena.prototype.asignarCamara=function(claveCamara){
  console.log("Asigno camara: ", claveCamara);
  this.camaraActual=this.camaras[claveCamara];
  var sol=this.obtenerUnObjetoDeLaEscena(CLAVESOL);
  sol.asignarCamara(this.camaraActual);
  this.camaraActual.actualizar();
}
Escena.prototype.seMueveLaRuedaDelMouse=function(evento){
  this.camaraActual.seMueveLaRuedaDelMouse(evento);
}
Escena.prototype.apretaronUnBotonDelMouse=function(evento){
  this.camaraActual.apretaronUnBotonDelMouse(evento);
}
Escena.prototype.soltaronUnBotonDelMouse=function(evento){
  this.camaraActual.soltaronUnBotonDelMouse(evento);
}
Escena.prototype.seMueveElMouse=function(evento){
  this.camaraActual.seMueveElMouse(evento);
}

Escena.prototype.acercarse=function(evento){
  console.log("Hace zoom in con la tecla +");
  this.camaraActual.acercarse(evento);
}
Escena.prototype.alejarse=function(evento){
  console.log("Hace zoom out con la tecla -");
  this.camaraActual.alejarse(evento);
}
Escena.prototype.moverseHaciaAdelante=function(evento){
  this.camaraActual.moverseHaciaAdelante();
}
Escena.prototype.moverseHaciaAtras=function(evento){
  this.camaraActual.moverseHaciaAtras();
}
Escena.prototype.moverseHaciaLaIzquierda=function(evento){
  this.camaraActual.moverseHaciaLaIzquierda();
}
Escena.prototype.moverseHaciaLaDerecha=function(evento){
  this.camaraActual.moverseHaciaLaDerecha();
}
Escena.prototype.generarMipMap=function(){
  this.espacioEstelar.generarMipMap();
}
Escena.prototype.configurarMatrizDeProyeccion=function(){
  mat4.perspective(this.matrizDeProyeccion, this.campoVerticalDeVista, this.relacionDeAspecto,BORDECERCANOFRUSTUM, BORDELEJANOFRUSTUM);
  gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, this.matrizDeProyeccion);
}
Escena.prototype.obtenerTrayectoriaMedia=function(){
  var estacionEspacial=this.espacioEstelar.obtenerHijo(CLAVEESTACION);
  var anilloExterior= estacionEspacial.obtenerHijo(CLAVEEXTERIORESTACION);
  var trayectoriaExterior=anilloExterior.obtenerTrayectoria();
  return anilloExterior.obtenerTrayectoria();
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
