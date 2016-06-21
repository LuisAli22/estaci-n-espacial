function Material(rows,cols){

	this.esIluminadoPorElSol = true;
	this.interiorBahia = false;
	this.ambiente;
    this.difusa;
    this.especular;
    this.brillo;

	this.repeticionU = 1;
	this.repeticionV = 1;
	this.texture_coord_buffer = [];
	this.rutaTextura = RUTAIMAGENDEFAULT;
	this.tieneTextura = 1.0;
	this.indiceDelMaterial = 1.0;
	this.UInicial = 0.0;
	this.VInicial = 0.0;
	this.USigno = 1.0;
	this.VSigno = 1.0;
	this.rows = rows;
	this.cols = cols;

}
Material.prototype.sinTextura=function(indiceDelMaterial){
	this.tieneTextura = 0.0;
	this.indiceDelMaterial = indiceDelMaterial;
}

Material.prototype.cargarRepeticionDeTextura=function(repeticionU,repeticionV){
	
	this.repeticionU = repeticionU;
	this.repeticionV = repeticionV;

}
Material.prototype.noEsIluminadoPorElSol=function(){

	this.esIluminadoPorElSol = false;

}
Material.prototype.esInteriorBahia=function(){

	this.interiorBahia = true;

}
Material.prototype.cargarTextura=function(textura){

	this.rutaTextura = textura;

}
Material.prototype.cargarAmbiente=function(ambiente){

	this.ambiente = ambiente;

}
Material.prototype.cargarDifusa=function(difusa){

	this.difusa = difusa;

}
Material.prototype.cargarEspecular=function(especular){

	this.especular = especular;

}
Material.prototype.cargarBrillo=function(brillo){

	this.brillo = brillo;

}
Material.prototype.cargarCoordenadasDeTextura=function(){

	for (var i = 0.0; i < this.rows; i++){
		for (var j = 0.0; j < this.cols; j++){

            var u = this.UInicial + this.USigno*(i / (this.rows-1.0));
            var v = this.VInicial + this.VSigno*(j / (this.cols-1.0));

            this.texture_coord_buffer.push(this.repeticionU*u);
            this.texture_coord_buffer.push(this.repeticionV*v);
            this.texture_coord_buffer.push(this.indiceDelMaterial);
            this.texture_coord_buffer.push(this.tieneTextura);

        };

    };

}
Material.prototype.cargarSigno=function(USigno,VSigno){

	this.USigno = USigno;
	this.VSigno = VSigno;

}
Material.prototype.cargarInico=function(UInicial,VInicial){

	this.UInicial = UInicial;
	this.VInicial = VInicial;

}
Material.prototype.configurarPropiedades=function(){

	if (this.esIluminadoPorElSol){
		gl.uniform1i(shaderProgram.useLightingUniform, true);
	}else {
		gl.uniform1i(shaderProgram.useLightingUniform, false);
	}

	/*.uniform3f(shaderProgram.ambientColorUniform, this.ambiente );
  	gl.uniform3f(shaderProgram.directionalColorUniform, this.difusa);*/

}