function ControladorPaneles(){
	this.angulo = 0;
	this.alturaPanel1 = 0;
  	this.alturaPanel2 = 0;
  	this.alturaPanel3 = 0;
  	this.alturaPanel4 = 0;
  	this.altura = [0.0,0.0,0.0,0.0];
  	this.alturaMaxima = [1.3,2.5,3.7,4.9];
	this.rotarAbrir = false;
	this.rotarCerrar = false;
	this.cerrarPanel = false;
	this.abrirPanel = false;
	this.panelAbierto = true;
	this.panelCerrado = false;

	this.revisarEstados = function(){
		if(cerrarPaneles && this.panelAbierto){
			cerrarPaneles = false;
			this.rotarCerrar = true;
			listo = false;
		}else if (cerrarPaneles){
			cerrarPaneles = false;
		}
		if(abrirPaneles&&this.panelCerrado){
			abrirPaneles = false;
			this.abrirPanel = true;
			listo = false;
		}else if(abrirPaneles){
			abrirPaneles = false;
		}
	}
	this.rotarPaneles = function(){
		if(this.rotarCerrar){
			this.angulo += 0.01;
			if(this.angulo > Math.PI/2){
				this.cerrarPanel = true;
				this.rotarCerrar = false;
			}
		}else if(this.rotarAbrir){
			this.angulo -= 0.01;
			if(this.angulo < 0){
				this.rotarAbrir = false;
				listo = true;
				this.panelAbierto = true;
				this.panelCerrado = false;
			}
		}
	}
	this.puedoCerrarPaneles = function(){

		return this.cerrarPanel;

	}
	this.puedoAbrirPaneles = function(){

		return this.abrirPanel;

	}
	this.moverPanel = function(id){

		if(this.puedoCerrarPaneles() && this.altura[id] <  this.alturaMaxima[id]){
			this.altura[id] += 0.01;
		}else if (this.puedoCerrarPaneles() && id==3){
			this.cerrarPanel = false;
			listo = true;
			this.panelAbierto = false;
			this.panelCerrado = true;
		}else if(this.puedoAbrirPaneles() && this.altura[id] > 0){
			this.altura[id] -= 0.01;
		}else if(this.puedoAbrirPaneles() && id==3){
			this.abrirPanel = false;
			this.rotarAbrir = true;
		}

	}
	this.moverPaneles = function(){
		for (var i = 0; i < 4; i++) {
			this.moverPanel(i);
		};
	}
	this.getAltura = function(id){
		return this.altura[id];
	}
	this.getAngulo = function(){
		return this.angulo;
	}

	this.controlar = function(){

		this.revisarEstados();
		this.rotarPaneles();
		this.moverPaneles();

	}

}