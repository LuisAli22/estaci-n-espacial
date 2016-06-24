function Material(rows,cols){

	this.esIluminadoPorElSol = true;
	this.esIluminadoPorLaTierra = true;
	this.interiorBahia = false;
	this.ambiente = vec3.fromValues(0.25,0.25,0.25);
    this.difusa = vec3.fromValues(0.8,0.8,0.8);
    this.especular = vec3.fromValues(0.8,0.8,0.8);
    this.brillo = 10.0;

    this.tieneReflexionEspecular = false;

    this.tieneMapaNormal = false;
    this.rutaTexturaNormal;
    this.texturaNormal= null;

    this.tieneMapaIluminacion = false;
    this.rutaTexturaIluminacion;
    this.texturaIluminacion= null;

    this.autoiluminacion = false;

    this.lucesBahia = [];
    this.intensidadLuzBahia;
    this.intensidadLuzAmbienteBahia;
	
	this.repeticionU = 1;
	this.repeticionV = 1;
	this.texture_coord_buffer = [];
	this.rutaTextura;
	this.textura = null;
	this.tieneTextura = 1.0;
	this.indiceDelMaterial = 1.0;
	this.UInicial = 0.0;
	this.VInicial = 0.0;
	this.USigno = 1.0;
	this.VSigno = 1.0;
	this.rows = rows;
	this.cols = cols;

}
Material.prototype.autoIluminacion=function(){
	this.autoiluminacion = true;
}
Material.prototype.noEsIluminadoPorLaTierra=function(){
	this.esIluminadoPorLaTierra = false;
}
Material.prototype.agregarLuzBahia=function(){
	
    this.lucesBahia.push(vec3.fromValues(-2.238,0.45,0.372));
    this.lucesBahia.push(vec3.fromValues(-1.089,0.45,2.025));
    this.lucesBahia.push(vec3.fromValues(1.171,0.45,1.981));
    this.lucesBahia.push(vec3.fromValues(2.245,0.45,0.287));
    this.intensidadLuzBahia = vec3.fromValues(0.22,0.22,0.22);
    this.intensidadLuzAmbienteBahia = vec3.fromValues(0.1,0.1,0.1);

	this.interiorBahia = true;

}
Material.prototype.inicializarTexturaFinal = function(ruta){
    var textura = gl.createTexture();
    textura.imagen = new Image();

    textura.imagen.onload = function () {
           manejarTexturaCargada();
    }
    
    textura.imagen.src = ruta;
    return textura;
}
Material.prototype.inicializarTextura = function(){

	this.textura = this.inicializarTexturaFinal(this.rutaTextura);
	if(this.tieneMapaNormal){
		this.texturaNormal = this.inicializarTexturaFinal(this.rutaTexturaNormal);
	}
	if(this.tieneMapaIluminacion){
		this.texturaIluminacion = this.inicializarTexturaFinal(this.rutaTexturaIluminacion);
	}
    
}
Material.prototype.generarMipMapFinal=function (textura){
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.bindTexture(gl.TEXTURE_2D, textura);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textura.imagen);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
  gl.generateMipmap(gl.TEXTURE_2D);
  gl.bindTexture(gl.TEXTURE_2D, null);
}
Material.prototype.generarMipMap=function (){
	this.generarMipMapFinal(this.textura);
	if(this.tieneMapaNormal){
		this.generarMipMapFinal(this.texturaNormal);
	}
	if(this.tieneMapaIluminacion){
		this.generarMipMapFinal(this.texturaIluminacion);
	}
}
Material.prototype.conReflexionEspecular=function(){
	this.tieneReflexionEspecular = true;
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
Material.prototype.agregarTexturaNormal=function(ruta){

	this.tieneMapaNormal = true;
	this.rutaTexturaNormal = ruta;
}
Material.prototype.agregarTexturaIluminacion=function(ruta){

	this.tieneMapaIluminacion = true;
    this.rutaTexturaIluminacion = ruta;

}
Material.prototype.configurarPropiedades=function(){

	gl.uniform1i(shaderProgram.autoiluminacion, this.autoiluminacion);
	gl.uniform1i(shaderProgram.iluminacionTextura, this.tieneMapaIluminacion);
	gl.uniform1i(shaderProgram.iluminadoPorLaTierra, this.esIluminadoPorLaTierra);

	gl.uniform1i(shaderProgram.useLightingUniform, this.esIluminadoPorElSol);
	
	gl.uniform3f(shaderProgram.ambientColorUniform, this.ambiente[0],this.ambiente[1],this.ambiente[2] );
	gl.uniform3f(shaderProgram.directionalColorUniform, this.difusa[0],this.difusa[1],this.difusa[2]);

	gl.uniform1i(shaderProgram.tieneReflexionEspecular, this.tieneReflexionEspecular);

	if(this.tieneReflexionEspecular){
		gl.uniform1f(shaderProgram.brillo, this.brillo);
		gl.uniform3f(shaderProgram.especular, this.especular[0],this.especular[1],this.especular[2]);

	}

	gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.textura);
    gl.uniform1i(shaderProgram.samplerUniform, 0);

	gl.uniform1i(shaderProgram.tieneNormal, this.tieneMapaNormal);

	if(this.tieneMapaNormal){
		gl.activeTexture(gl.TEXTURE1);
    	gl.bindTexture(gl.TEXTURE_2D, this.texturaNormal);
    	gl.uniform1i(shaderProgram.samplerUniformN, 1);

	}
	if(this.tieneMapaIluminacion){
		gl.activeTexture(gl.TEXTURE2);
    	gl.bindTexture(gl.TEXTURE_2D, this.texturaIluminacion);
    	gl.uniform1i(shaderProgram.samplerUniformIluminacion, 2);
	}

	gl.uniform1i(shaderProgram.interiorBahia, this.interiorBahia);
	if(this.interiorBahia){
		gl.uniform3fv(shaderProgram.luzBahia1,this.lucesBahia[0]);
		gl.uniform3fv(shaderProgram.luzBahia2,this.lucesBahia[1]);
		gl.uniform3fv(shaderProgram.luzBahia3,this.lucesBahia[2]);
		gl.uniform3fv(shaderProgram.luzBahia4,this.lucesBahia[3]);
		gl.uniform3fv(shaderProgram.intensidadLuzBahia,this.intensidadLuzBahia);
		gl.uniform3fv(shaderProgram.intensidadLuzAmbienteBahia,this.intensidadLuzAmbienteBahia);
	}

    gl.bindTexture(gl.TEXTURE_2D, this.textura);
    if(this.tieneMapaNormal)gl.bindTexture(gl.TEXTURE_2D, this.texturaNormal);
    if(this.tieneMapaIluminacion)gl.bindTexture(gl.TEXTURE_2D, this.texturaIluminacion);

}