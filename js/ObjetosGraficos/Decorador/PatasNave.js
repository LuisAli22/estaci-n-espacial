function PatasNave(controladorPatasNave){

	this.cubo = new Cubo(7.0);
	this.cilindro = new Cilindro(64,64,8.0,0);
	this.controladorPatasNave=controladorPatasNave;

	this.dibujarEje=function(x,y,z){

		var matrizTraslacion = mat4.create();
	    var matrizRotacion = mat4.create();
	    var matrizEscalado = mat4.create();

	    mat4.translate(matrizTraslacion,matrizTraslacion,[x,y,z]);
	    mat4.rotateX(matrizRotacion,matrizRotacion,Math.PI/4.0);
	    mat4.scale(matrizEscalado,matrizEscalado,[0.1,1.5,0.1]);

	    mvPushMatrix();

	      mat4.multiply(mvMatrix,mvMatrix,matrizTraslacion);
	      mat4.multiply(mvMatrix,mvMatrix,matrizRotacion);
	      mat4.multiply(mvMatrix,mvMatrix,matrizEscalado);
	    
	      this.cubo.dibujar();

	    mvPopMatrix();

	}

	this.dibujarBase=function(x,y,z){

		var matrizTraslacion = mat4.create();
	    var matrizRotacion = mat4.create();
	    var matrizEscalado = mat4.create();

	    mat4.translate(matrizTraslacion,matrizTraslacion,[x,y,z]);
	    mat4.rotateX(matrizRotacion,matrizRotacion,Math.PI/2.0);
	    mat4.scale(matrizEscalado,matrizEscalado,[0.3,0.3,0.1]);

	    mvPushMatrix();

	      mat4.multiply(mvMatrix,mvMatrix,matrizTraslacion);
	      mat4.multiply(mvMatrix,mvMatrix,matrizRotacion);
	      mat4.multiply(mvMatrix,mvMatrix,matrizEscalado);
	    
	      this.cilindro.dibujar();

	    mvPopMatrix();

	}

}

PatasNave.prototype.dibujar = function(){

    this.controladorPatasNave.actualizar();
    var matrizTraslacion = mat4.create();

    mat4.translate(matrizTraslacion,matrizTraslacion,[0.0,this.controladorPatasNave.getAltura(),0.0]);

    mvPushMatrix();
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
    mvPopMatrix();
 
}

PatasNave.prototype.inicializarTextura=function(){
  this.cubo.inicializarTextura(RUTAIMAGENMARTE);
  this.cilindro.inicializarTextura(RUTAIMAGENMARTE);
}
PatasNave.prototype.generarMipMap=function (){
  this.cubo.generarMipMap();
  this.cilindro.generarMipMap();
}