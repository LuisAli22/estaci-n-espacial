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
}
Nave.prototype.actualizarMomentos=function(){
  this.direccion[2]=Math.max(0,this.velocidad);
  vec3.transformMat4(this.direccion,this.direccion,this.rotacion);
  for(var indice in this.momento){
    this.momento[indice]=this.momento[indice]*this.inercia+this.direccion[indice]*0.0001;
  }
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
Nave.prototype.dibujar = function(){
  gl.uniform3f(shaderProgram.ambientColorUniform, 0.2, 0.2, 0.2 );
  gl.uniform3f(shaderProgram.directionalColorUniform, 0.05, 0.05, 0.05);
  this.actualizarPosicion();
  pilaMatrizDeModelado.meter();
    mat4.multiply(mvMatrix, mvMatrix,this.matrizPosicion);
    mat4.scale(mvMatrix, mvMatrix, [FACTORESCALANAVE,FACTORESCALANAVE, FACTORESCALANAVE]);
    mat4.rotateY(mvMatrix, mvMatrix, Math.PI);
    ObjetoGraficoCompuesto.prototype.dibujar.call(this);
  pilaMatrizDeModelado.sacar();
}
Nave.prototype.obtenerPosicion=function(){
  return this.matrizPosicion;
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
  this.angRolido= -0.005;
  this.estadoTeclas[4] = true;

}

Nave.prototype.moverAbajo=function(){

  this.angRolido=0;
  this.angRolido= 0.005;
  this.estadoTeclas[5] = true;

}

Nave.prototype.moverDerecha=function(){

  this.angRolido=0;
  this.angVirada=0;
  this.angVirada=-0.005;
  this.angRolido=0.001;
  this.estadoTeclas[6] = true;

}

Nave.prototype.moverIzquierda=function(){

  this.angRolido=0;
  this.angVirada=0;
  this.angVirada=0.005;
  this.angRolido=-0.001;
  this.estadoTeclas[7] = true;

}

Nave.prototype.acelerar=function(){

  var impulso=0;
  impulso=0.1;
  this.velocidad+=impulso;

}

Nave.prototype.desacelerar=function(){

  var impulso=0;
  impulso=-0.1;
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
