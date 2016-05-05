function CilindrosLaterales(material){

	const CANTIDADDECILINDROS = 7;
	const ANGULOINCIALCILINDRO = -60.0;
	const VARIACIONDELANGULO = 20.0;

	this.cilindros = [];
	this.material = material;

	this.initBuffers = function(){

		for (var i = 0; i < CANTIDADDECILINDROS; i++) {
			var cilindro = new Cilindro(64,64,this.material);
			this.cilindros.push(cilindro);
		};

	}

	this.generateMipMap = function (){
  		for(idxCilindro in this.cilindros){
    		this.cilindros[idxCilindro].generateMipMap();
  		}
	}

	this.draw = function(modelMatrix){


		for(var idxCilindro = 0;idxCilindro<CANTIDADDECILINDROS; idxCilindro++){
			var modelClone = mat4.clone(modelMatrix);
			var matrizEscalado = mat4.create();
        	mat4.scale(matrizEscalado,matrizEscalado,[0.2,0.2,2.5]);
    	    var matrizTraslacion = mat4.create();
	        mat4.translate(matrizTraslacion,matrizTraslacion,[0.0,0.0,0.5]);

			var matrizRotacion = mat4.create();
			var anguloRotacion = ((ANGULOINCIALCILINDRO + VARIACIONDELANGULO * idxCilindro)*2.0*Math.PI)/180;
        	mat4.rotateY(matrizRotacion,matrizRotacion,anguloRotacion);
        	mat4.multiply(modelClone,modelClone,matrizRotacion);
        	mat4.multiply(modelClone,modelClone,matrizEscalado);
        	mat4.multiply(modelClone,modelClone,matrizTraslacion);
			this.cilindros[idxCilindro].draw(modelClone);
		}
	}

	this.initTexture=function(IMGMARSPATH){
		for(idxCilindro in this.cilindros){
			this.cilindros[idxCilindro].initTexture(IMGMARSPATH);
		}
	}

	this.initBuffers();
}