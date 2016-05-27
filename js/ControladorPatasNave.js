function ControladorPatasNave(){

	this.altura=0;
	this.ABRIR = 0;
	this.CERRAR = 1;
	this.estados = [false,false];
	this.abierto = false;
	this.cerrado = true;

	this.actualizar=function(){

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

	this.abrirTren=function(){
		if(!this.estados[this.ABRIR] && !this.estados[this.CERRAR] && this.cerrado){
			this.estados[this.ABRIR] = true;
		}
		
	}

	this.cerrarTren=function(){
		if(!this.estados[this.ABRIR] && !this.estados[this.CERRAR] && this.abierto){
			this.estados[this.CERRAR] = true;
		}
	}

	this.getAltura=function(){
		return this.altura;
	}

}