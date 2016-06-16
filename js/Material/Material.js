function Material(textura,repeticionU,repeticionV,rows,cols){

	this.repeticionU = repeticionU;
	this.repeticionV = repeticionV;
	this.texture_coord_buffer = [];
	this.rutaTextura = textura;
	this.UInicial = 0.0;
	this.VInicial = 0.0;
	this.USigno = 1.0;
	this.VSigno = 1.0;
	this.rows = rows;
	this.cols = cols;

}

Material.prototype.cargar=function(){

	for (var i = 0.0; i < this.rows; i++){
		for (var j = 0.0; j < this.cols; j++){

            var u = this.UInicial + this.USigno*(i / (this.rows-1.0));
            var v = this.VInicial + this.VSigno*(j / (this.cols-1.0));

            this.texture_coord_buffer.push(this.repeticionU*u);
            this.texture_coord_buffer.push(this.repeticionV*v);
            this.texture_coord_buffer.push(0.0);
            this.texture_coord_buffer.push(1.0);

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