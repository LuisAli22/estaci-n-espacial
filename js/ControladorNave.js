function ControladorNave(){

	var posicion=vec3.fromValues(0,0,DISTANCIAZNAVE);
	var estadoTeclas=[false,false,false,false,false,false,false,false];

	//var orientacion=vec3.fromValues(0,-1,0);
	var rotacion=mat4.create();
	mat4.identity(rotacion);

	/*
		+X frente de la nave
		+Y techo de la nave
		+Z

	*/

	var potenciaMotor=0.01;

	var velocidad=0;
	var angCabezeo=0; // Z
	var angRolido=0; // respecto del X de la Nave
	var angVirada=0;

	var momento=vec3.fromValues(0,0,0);

	this.actualizar=function(){

		var ejeX=vec3.fromValues(1,0,0);
		mat4.rotate(rotacion,rotacion,angRolido,ejeX);

		var ejeZ=vec3.fromValues(0,0,1);
		mat4.rotate(rotacion,rotacion,angCabezeo,ejeZ);

		var ejeY=vec3.fromValues(0,1,0);
		mat4.rotate(rotacion,rotacion,angVirada,ejeY);


		var direccion=vec3.fromValues(0,0,Math.max(0,velocidad));
		vec3.transformMat4(direccion,direccion,rotacion);

		var inercia=0.99;
		momento[0]=momento[0]*inercia+direccion[0]*0.0001;
		momento[1]=momento[1]*inercia+direccion[1]*0.0001;
		momento[2]=momento[2]*inercia+direccion[2]*0.0001;

		vec3.add(posicion,posicion,momento);

	};

	this.giroHorario=function(){

		angCabezeo=0;
		angCabezeo= -0.005;
		estadoTeclas[2] = true;

	}


	this.giroAntiHorario=function(){

		angCabezeo=0;
		angCabezeo= 0.005;
		estadoTeclas[3] = true;

	}

	this.moverArriba=function(){

		angRolido=0;
		angRolido= -0.005;
		estadoTeclas[4] = true;

	}

	this.moverAbajo=function(){

		angRolido=0;
		angRolido= 0.005;
		estadoTeclas[5] = true;

	}

	this.moverDerecha=function(){

		angRolido=0;
		angVirada=0;
		angVirada=0.005;
		angRolido=-0.001;
		estadoTeclas[6] = true;

	}

	this.moverIzquierda=function(){

		angRolido=0;
		angVirada=0;
		angVirada=-0.005;
		angRolido=0.001;
		estadoTeclas[7] = true;

	}

	this.acelerar=function(){

		var impulso=0;
		impulso=0.1;
		velocidad+=impulso;

	}

	this.desacelerar=function(){

		var impulso=0;
		impulso=-0.1;
		velocidad+=impulso;
		velocidad=Math.max(velocidad,0);

	}

	this.soltarTecla=function(estado){
		if(estadoTeclas[estado]){
			angRolido=0;
			angVirada=0;
			angCabezeo=0;
			estadoTeclas[estado] = false;
		}
		
	}


	this.getMatriz=function(){


		var m=mat4.create();
		mat4.translate(m,m,posicion);
		mat4.multiply(m,m,rotacion);

		return m;
	}
	
}