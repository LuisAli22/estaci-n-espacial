function PatasNave(){

	this.cubo = new Cubo(7.0);
	this.cilindro = new Cilindro(64,64,8.0,0);
	this.altura=0;
	this.ABRIR = 0;
	this.CERRAR = 1;
	this.estados = [false,false];
	this.abierto = false;
	this.cerrado = true;
}
PatasNave.prototype.dibujarEje=function(x,y,z){

	var matrizTraslacion = mat4.create();
		var matrizRotacion = mat4.create();
		var matrizEscalado = mat4.create();

		mat4.translate(matrizTraslacion,matrizTraslacion,[x,y,z]);
		mat4.rotateX(matrizRotacion,matrizRotacion,Math.PI/4.0);
		mat4.scale(matrizEscalado,matrizEscalado,[0.1,1.5,0.1]);

		pilaMatrizDeModelado.meter();

			mat4.multiply(mvMatrix,mvMatrix,matrizTraslacion);
			mat4.multiply(mvMatrix,mvMatrix,matrizRotacion);
			mat4.multiply(mvMatrix,mvMatrix,matrizEscalado);

			this.cubo.dibujar();

		pilaMatrizDeModelado.sacar();

}

PatasNave.prototype.dibujarBase=function(x,y,z){

	var matrizTraslacion = mat4.create();
		var matrizRotacion = mat4.create();
		var matrizEscalado = mat4.create();

		mat4.translate(matrizTraslacion,matrizTraslacion,[x,y,z]);
		mat4.rotateX(matrizRotacion,matrizRotacion,Math.PI/2.0);
		mat4.scale(matrizEscalado,matrizEscalado,[0.3,0.3,0.1]);

		pilaMatrizDeModelado.meter();

			mat4.multiply(mvMatrix,mvMatrix,matrizTraslacion);
			mat4.multiply(mvMatrix,mvMatrix,matrizRotacion);
			mat4.multiply(mvMatrix,mvMatrix,matrizEscalado);

			this.cilindro.dibujar();

		pilaMatrizDeModelado.sacar();

}
PatasNave.prototype.actualizar=function(){

	if(this.estados[this.ABRIR]&&this.altura>-0.5){
		this.altura-=0.01;
	}else if(this.estados[this.ABRIR]&&this.altura<=-0.5){
		this.estados[this.ABRIR] = false;
		this.abierto = true;
		this.cerrado = false;
	}

	if(this.estados[this.CERRAR]&&this.altura<0.0){
		this.altura+=0.01;
	}else if(this.estados[this.CERRAR]&&this.altura>=0.0){
		this.estados[this.CERRAR] = false;
		this.abierto = false;
		this.cerrado = true;
	}
}

PatasNave.prototype.abrirTren=function(){
	if(!this.estados[this.ABRIR] && !this.estados[this.CERRAR] && this.cerrado){
		this.estados[this.ABRIR] = true;
	}

}

PatasNave.prototype.cerrarTren=function(){
	if(!this.estados[this.ABRIR] && !this.estados[this.CERRAR] && this.abierto){
		this.estados[this.CERRAR] = true;
	}
}

PatasNave.prototype.dibujar = function(){

    this.actualizar();
    var matrizTraslacion = mat4.create();

    mat4.translate(matrizTraslacion,matrizTraslacion,[0.0,this.altura,0.0]);

    pilaMatrizDeModelado.meter();
      mat4.multiply(mvMatrix,mvMatrix,matrizTraslacion);
      this.dibujarEje(0.75,-0.25,0.0);
      this.dibujarEje(0.75,-0.25,-0.4);
      this.dibujarEje(-0.75,-0.25,0.0);
      this.dibujarEje(-0.75,-0.25,-0.4);
      this.dibujarEje(0.0,-0.25,-1.0);
      this.dibujarEje(0.0,-0.25,-1.4);
      this.dibujarBase(0.0,-0.81,-1.635);
      this.dibujarBase(-0.75,-0.81,-0.635);
      this.dibujarBase(0.75,-0.81,-0.635);
    pilaMatrizDeModelado.sacar();

}

PatasNave.prototype.inicializarTextura=function(){
  this.cubo.inicializarTextura(RUTAIMAGENMARTE);
  this.cilindro.inicializarTextura(RUTAIMAGENMARTE);
}
PatasNave.prototype.generarMipMap=function (){
  this.cubo.generarMipMap();
  this.cilindro.generarMipMap();
}
