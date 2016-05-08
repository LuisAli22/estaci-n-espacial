function CilindrosLaterales(material){



	this.cilindros = [];
	this.material = material;

	this.inicializarLosBuffer = function(){

		for (var i = 0; i < CANTIDADDECILINDROS; i++) {
			var cilindro = new Cilindro(64,64,this.material);
			this.cilindros.push(cilindro);
		};

	}

	this.generarMipMap = function (){
  		for(idxCilindro in this.cilindros){
    		this.cilindros[idxCilindro].generarMipMap();
  		}
	}

	this.dibujar = function(matrizModelado){


		for(var idxCilindro = 0;idxCilindro<CANTIDADDECILINDROS; idxCilindro++){
			var matrizModeladoClonada = mat4.clone(matrizModelado);
			var matrizEscalado = mat4.create();
        	mat4.scale(matrizEscalado,matrizEscalado,[0.2,0.2,2.5]);
    	    var matrizTraslacion = mat4.create();
	        mat4.translate(matrizTraslacion,matrizTraslacion,[0.0,0.0,0.5]);

			var matrizRotacion = mat4.create();
			var anguloRotacion = ((ANGULOINCIALCILINDRO + VARIACIONDELANGULO * idxCilindro)*2.0*Math.PI)/180;
        	mat4.rotateY(matrizRotacion,matrizRotacion,anguloRotacion);
        	mat4.multiply(matrizModeladoClonada,matrizModeladoClonada,matrizRotacion);
        	mat4.multiply(matrizModeladoClonada,matrizModeladoClonada,matrizEscalado);
        	mat4.multiply(matrizModeladoClonada,matrizModeladoClonada,matrizTraslacion);
			this.cilindros[idxCilindro].dibujar(matrizModeladoClonada);
		}
	}

	this.inicializarTextura=function(){
		for(idxCilindro in this.cilindros){
			this.cilindros[idxCilindro].inicializarTextura(RUTAIMAGENMARTE);
		}
	}

	this.inicializarLosBuffer();
}
