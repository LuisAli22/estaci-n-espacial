//bufferExterior y bufferInterior deben tener la misma cantidad de puntos
function TapaEstacionEspacial(_bufferExterior,_bufferInterior){

	this.bufferExterior = _bufferExterior;
	this.bufferInterior = _bufferInterior;

	const FILAS = 2;

    //Llamo a la clase padre
    DrawObject.call(this);
    //Seteo las dimensiones de la grilla
    DrawObject.call(this.setDimensions(FILAS,COLUMNASESTACIONESPACIAL));

    this.initBuffers = function(){

        this.texture_coord_buffer = [];
        this.normal_buffer = [];

        
        
        this.position_buffer = [];

        this.position_buffer = this.position_buffer.concat(this.bufferExterior);
        this.position_buffer = this.position_buffer.concat(this.bufferInterior);

        //Calculo el vector normal a las tapas
        var pos1 = vec3.fromValues(this.bufferExterior[0],this.bufferExterior[1],this.bufferExterior[2]);
        var pos2 = vec3.fromValues(this.bufferInterior[0],this.bufferInterior[1],this.bufferInterior[2]);

        var vectorNormal = vec3.create();
        vec3.cross(vectorNormal,pos1,pos2);
        vec3.normalize(vectorNormal,vectorNormal);

        //Cargo las coordenadas de textura
        for (var i = 0.0; i < this.rows; i++){
            for (var j = 0.0; j < this.cols; j++){

                var u = 1.0 - (j / (this.cols-1.0));
                var v = 1.0 - (i / (this.rows-1.0));

                this.texture_coord_buffer.push(u);
                this.texture_coord_buffer.push(v);
                //Defino material --> color dorado
                this.texture_coord_buffer.push(DORADO);
                this.texture_coord_buffer.push(0);

                this.normal_buffer.push(-1.0*vectorNormal[0]);
                this.normal_buffer.push(-1.0*vectorNormal[1]);
                this.normal_buffer.push(-1.0*vectorNormal[2]);

            };

        };

        // Buffer de indices de los triangulos
        this.createIndexBuffer();

        // Creación e Inicialización de los buffers a nivel de OpenGL
        this.webgl_normal_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normal_buffer), gl.STATIC_DRAW);
        this.webgl_normal_buffer.itemSize = 3;
        this.webgl_normal_buffer.numItems = this.normal_buffer.length / 3;

        this.webgl_texture_coord_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_texture_coord_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.texture_coord_buffer), gl.STATIC_DRAW);
        this.webgl_texture_coord_buffer.itemSize = 4;
        this.webgl_texture_coord_buffer.numItems = this.texture_coord_buffer.length / 4;

        this.webgl_position_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.position_buffer), gl.STATIC_DRAW);
        this.webgl_position_buffer.itemSize = 3;
        this.webgl_position_buffer.numItems = this.position_buffer.length / 3;

        this.webgl_index_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.index_buffer), gl.STATIC_DRAW);
        this.webgl_index_buffer.itemSize = 1;
        this.webgl_index_buffer.numItems = this.index_buffer.length;

    }

}

inheritPrototype(TapaEstacionEspacial, DrawObject);