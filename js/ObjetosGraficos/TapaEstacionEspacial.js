TapaEstacionEspacial.prototype=new ComponenteEstacionEspacial;
TapaEstacionEspacial.prototype.constructor=TapaEstacionEspacial;

//bufferExterior y bufferInterior deben tener la misma cantidad de puntos
function TapaEstacionEspacial(bufferExterior,bufferInterior,material){

	this.bufferExterior = bufferExterior;
	this.bufferInterior = bufferInterior;

	const FILAS = 2;

    ComponenteEstacionEspacial.call(this,FILAS,COLUMNASESTACIONESPACIAL,material);

    this.initBuffers = function(){

        var material = new Material(RUTAIMAGENTAPA,1.0,1.0,120,2);
        material.cargar();

        this.setMaterial(material);

        this.normal_buffer = [];

        this.position_buffer = [];

        this.position_buffer = this.position_buffer.concat(this.bufferExterior);
        this.position_buffer = this.position_buffer.concat(this.bufferInterior);

        //Calculo el vector normal a las tapas
       	this.pos1 = vec3.fromValues(this.bufferExterior[0],this.bufferExterior[1],this.bufferExterior[2]);
        this.pos2 = vec3.fromValues(this.bufferInterior[0],this.bufferInterior[1],this.bufferInterior[2]);

        var vectorNormal = vec3.create();
        vec3.cross(vectorNormal,this.pos1,this.pos2);
        vec3.normalize(vectorNormal,vectorNormal);

        var vectorTangente = vec3.create();
        vec3.subtract(vectorTangente,this.pos1,this.pos2);
        vec3.normalize(vectorTangente,vectorTangente);

        var vectorBinormal = vec3.create();
        vec3.cross(vectorBinormal,vectorTangente,vectorNormal);
        vec3.normalize(vectorBinormal,vectorBinormal);

        //Cargo las coordenadas de textura
        for (var i = 0.0; i < this.rows; i++){
            for (var j = 0.0; j < this.cols; j++){

                this.normal_buffer.push(-1.0*vectorNormal[0]);
                this.normal_buffer.push(-1.0*vectorNormal[1]);
                this.normal_buffer.push(-1.0*vectorNormal[2]);

                this.tangente_buffer.push(-1.0*vectorTangente[0]);
                this.tangente_buffer.push(-1.0*vectorTangente[1]);
                this.tangente_buffer.push(-1.0*vectorTangente[2]);

                this.binormal_buffer.push(-1.0*vectorBinormal[0]);
                this.binormal_buffer.push(-1.0*vectorBinormal[1]);
                this.binormal_buffer.push(-1.0*vectorBinormal[2]);

            };

        };

        // Buffer de indices de los triangulos
				this.crearBufferDeIndices();

				this.atarLosBuffer(this.position_buffer,this.normal_buffer,this.texture_coord_buffer,this.index_buffer);

    }
		this.initBuffers();
}
