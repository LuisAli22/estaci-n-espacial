Nave.prototype= new ObjetoGraficoCompuesto;
Nave.prototype.constructor=Nave;
function Nave(){
  this.posicion=vec3.fromValues(0,0,DISTANCIAZNAVE);
	this.estadoTeclas=[false,false,false,false,false,false,false,false];
	this.rotacion=mat4.create();

	this.potenciaMotor=0.01;

	this.velocidad=0;
	this.angCabezeo=0;
	this.angRolido=0;
	this.angVirada=0;
	this.momento=vec3.fromValues(0,0,0);
  this.direccion=vec3.fromValues(0,0,0);
  this.inercia=0.99;
  this.matrizPosicion=mat4.create();
  this.camara=null;

}
Nave.prototype.asignarCamara=function(camara){
  this.camara=camara;
}
Nave.prototype.actualizarMomentos=function(){
  this.direccion=vec3.fromValues(0,0,Math.max(0,this.velocidad));
  vec3.transformMat4(this.direccion,this.direccion,this.rotacion);
  var inercia=0.99;
  this.momento[0]=this.momento[0]*inercia+this.direccion[0]*0.0001;
  this.momento[1]=this.momento[1]*inercia+this.direccion[1]*0.0001;
  this.momento[2]=this.momento[2]*inercia+this.direccion[2]*0.0001;

}
Nave.prototype.actualizarPosicion=function(){
  mat4.rotate(this.rotacion,this.rotacion,this.angRolido,vec3.fromValues(1,0,0));
  mat4.rotate(this.rotacion,this.rotacion,this.angCabezeo,vec3.fromValues(0,0,1));
  mat4.rotate(this.rotacion,this.rotacion,this.angVirada,vec3.fromValues(0,1,0));
  this.actualizarMomentos();
  vec3.add(this.posicion,this.posicion,this.momento);
  mat4.identity(this.matrizPosicion);
  mat4.translate(this.matrizPosicion,this.matrizPosicion,this.posicion);
  mat4.multiply(this.matrizPosicion,this.matrizPosicion,this.rotacion);
};
Nave.prototype.estaEncendidaLaCamara=function(){
  if (this.camara==null) return false;
  return (this.camara.estaEncendida());
}
Nave.prototype.dibujar = function(){
  this.actualizarPosicion();
  pilaMatrizDeModelado.meter();
    mat4.multiply(mvMatrix, mvMatrix,this.matrizPosicion);
    mat4.scale(mvMatrix, mvMatrix, [FACTORESCALANAVE,FACTORESCALANAVE, FACTORESCALANAVE]);
    mat4.rotateY(mvMatrix, mvMatrix, Math.PI);
    if (this.estaEncendidaLaCamara()) this.camara.actualizar();
    ObjetoGraficoCompuesto.prototype.dibujar.call(this);
  pilaMatrizDeModelado.sacar();
}
Nave.prototype.giroHorario=function(){

  this.angCabezeo=0;
  this.angCabezeo= -0.005;
  this.estadoTeclas[2] = true;

}


Nave.prototype.giroAntiHorario=function(){

  this.angCabezeo=0;
  this.angCabezeo= 0.005;
  this.estadoTeclas[3] = true;

}

Nave.prototype.moverArriba=function(){

  this.angRolido=0;
  this.angRolido= -0.01;
  this.estadoTeclas[4] = true;

}

Nave.prototype.moverAbajo=function(){

  this.angRolido=0;
  this.angRolido= 0.01;
  this.estadoTeclas[5] = true;

}

Nave.prototype.moverDerecha=function(){

  this.angRolido=0;
  this.angVirada=0;
  this.angVirada=-0.01;
  this.estadoTeclas[6] = true;

}

Nave.prototype.moverIzquierda=function(){

  this.angRolido=0;
  this.angVirada=0;
  this.angVirada=0.01;
  this.estadoTeclas[7] = true;

}

Nave.prototype.acelerar=function(){

  var impulso=0;
  impulso=0.1;
  this.velocidad+=impulso;

}

Nave.prototype.desacelerar=function(){

  var impulso=0;
  impulso=-0.3;
  this.velocidad+=impulso;
  this.velocidad=Math.max(this.velocidad,0);

}

Nave.prototype.soltarTecla=function(estado){
  if(this.estadoTeclas[estado]){
    this.angRolido=0;
    this.angVirada=0;
    this.angCabezeo=0;
    this.estadoTeclas[estado] = false;
  }

}
