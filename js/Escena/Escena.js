function Escena(canvas){
  canvas.onmousedown = this.apretaronUnBotonDelMouse .bind(this);
	canvas.onmouseup = this.soltaronUnBotonDelMouse.bind(this);
  document.onmousemove=this.seMueveElMouse.bind(this);
  canvas.tabIndex = 1000;
  canvas.onwheel= this.seMueveLaRuedaDelMouse.bind(this);
  var fabricaEspacioEstelar= new FabricaEspacioEstelar();
  this.espacioEstelar=fabricaEspacioEstelar.crear();
  this.camaras= {Orbital: new CamaraOrbital(canvas, 85,0.5 * Math.PI, 0.5 * Math.PI),
                PrimerPersonaBahia: new PrimerPersonaBahiaDeCarga(canvas,this.obtenerTrayectoriaMedia()),
                CabinaNave: new Cabina(canvas),
                Persecucion: new Persecucion(canvas)};
  this.asignarCamara("Orbital");
  this.espacioEstelar.inicializarTextura();
  this.matrizDeProyeccion = mat4.create();
  this.campoVerticalDeVista=Math.PI/12.0;
  this.relacionDeAspecto=gl.viewportWidth / gl.viewportHeight;

}
Escena.prototype.obtenerUnObjetoDeLaEscena=function(claveDelObjeto){
  return this.espacioEstelar.obtenerHijo(claveDelObjeto)
}
Escena.prototype.asignarEstadoDeFuncionamientoCamaraNave=function(tipoDeCamara){
  if ((tipoDeCamara=="CabinaNave") ||(tipoDeCamara="Persecucion")){
    var camaraEncendida=this.camaraActual==this.camaras[tipoDeCamara];
    this.camaras[tipoDeCamara].asignarEstadoDeFuncionamiento(camaraEncendida);
  }
}
Escena.prototype.camaraActualEsCamaraEnNave=function(){
  return  (this.camaraActual==this.camaras["CabinaNave"] ||
          this.camaraActual==this.camaras["Persecucion"]);
}
Escena.prototype.asignarCamara=function(claveCamara){
  this.camaraActual=this.camaras[claveCamara];
  this.asignarEstadoDeFuncionamientoCamaraNave("CabinaNave");
  this.asignarEstadoDeFuncionamientoCamaraNave("Persecucion");
  if (this.camaraActualEsCamaraEnNave()){
    var nave=this.espacioEstelar.obtenerHijo(CLAVENAVE);
    nave.asignarCamara(this.camaraActual);
  }
  var sol=this.obtenerUnObjetoDeLaEscena(CLAVESOL);
  sol.asignarCamara(this.camaraActual);
  this.camaraActual.actualizar();
}
Escena.prototype.seMueveLaRuedaDelMouse=function(evento){
  if (this.camaraActual==this.camaras["Orbital"] )this.camaraActual.seMueveLaRuedaDelMouse(evento);
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
  var anilloExterior= estacionEspacial.obtenerHijo(CLAVEEXTERIORPISO);
  var trayectoriaExterior=anilloExterior.obtenerTrayectoria();
  return anilloExterior.obtenerTrayectoria();
}
Escena.prototype.obtenerPosicionNave=function(){
  var nave=this.espacioEstelar.obtenerHijo(CLAVENAVE);
  return nave.obtenerPosicion();
}
Escena.prototype.obtenerDireccionNave=function(){
  var nave=this.espacioEstelar.obtenerHijo(CLAVENAVE);
  return nave.obtenerDireccion();
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
