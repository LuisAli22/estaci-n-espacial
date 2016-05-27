function ControladorEjesYTurbinas(){

	this.angulo = 0.0;
	this.anguloTurbinas = 0.0;

	this.calcularMaximoMinimos=function(){
		this.anguloTurbinas = Math.min(this.anguloTurbinas,Math.PI/4.0);
		this.anguloTurbinas = Math.max(this.anguloTurbinas,-Math.PI/4.0);
		this.angulo = Math.min(this.angulo,Math.PI/2.0);
		this.angulo = Math.max(this.angulo,-Math.PI/2.0);
	}

	this.actualizar=function(){

		this.anguloTurbinas=(estadoTeclas[this.TECLA_GIRO_HORARIO_TURBINAS])? this.anguloTurbinas-0.005:this.anguloTurbinas;
		this.anguloTurbinas=(estadoTeclas[this.TECLA_GIRO_ANTIHORARIO_TURBINAS])? this.anguloTurbinas+0.005:this.anguloTurbinas;

	}

	this.giroHorario=function(){
		this.angulo=this.angulo-0.005;
		this.calcularMaximoMinimos();
	}

	this.giroAntiHorario=function(){
		this.angulo=this.angulo+0.005;
		this.calcularMaximoMinimos();
	}

	this.giroHorarioTurbinas=function(){
		this.anguloTurbinas=this.anguloTurbinas-0.005;
		this.calcularMaximoMinimos();
	}

	this.giroAntihorarioTurbinas=function(){
		this.anguloTurbinas=this.anguloTurbinas+0.005;
		this.calcularMaximoMinimos();
	}

	this.getAngulo=function(){
		return this.angulo;
	}

	this.getAnguloTurbinas=function(){
		return this.anguloTurbinas;
	}

}