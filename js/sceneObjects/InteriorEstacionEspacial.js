function InteriorEstacionEspacial(){
    
    //Llamo a la clase padre
    DrawObject.call(this);
    //Seteo las dimensiones de la grilla
    DrawObject.call(this.setDimensions(FILASESTACIONESPACIAL,COLUMNASESTACIONESPACIAL));

    this.cargarPerfil = function(bufferInicialCoordenadas,bufferInicialNormales){
        
        //Curva superior del perfil
        var puntosDeControlX = vec4.fromValues(-0.5,0.75,0.75,-0.5);
        var puntosDeControlY = vec4.fromValues(0.0,-1.5,1.5,0.5);

        for(var i = 0.0 ; i < (this.cols / 4) ; i++ ) {

            var t = i / ((this.cols / 4) - 1);

            var x = Math.pow(t,3)* puntosDeControlX[0] + Math.pow(t,2)* puntosDeControlX[1] + t* puntosDeControlX[2] + puntosDeControlX[3];
            var y = Math.pow(t,3)* puntosDeControlY[0] + Math.pow(t,2)* puntosDeControlY[1] + t* puntosDeControlY[2] + puntosDeControlY[3];
            var z = 0.0;

            bufferInicialCoordenadas.push(x);
            bufferInicialCoordenadas.push(y);
            bufferInicialCoordenadas.push(z);

            var nx = 6.0*t* puntosDeControlX[0] + 2.0* puntosDeControlX[1];
            var ny = 3.0*t* puntosDeControlY[0] + 2.0* puntosDeControlY[1];
            var nz = 0.0;

            var vectorNormal = vec3.fromValues(nx,ny,nz);
            vec3.normalize(vectorNormal,vectorNormal);
            bufferInicialNormales.push(vectorNormal[0]);
            bufferInicialNormales.push(vectorNormal[1]);
            bufferInicialNormales.push(vectorNormal[2]);

        };
        //Cargo lateral derecho
        for(var i = 0.0 ; i < (this.cols / 4) ; i++ ) {

            var t = i / ((this.cols / 4) - 1);

            var x = 0.5;
            var y = -1.0*t+0.5;
            var z = 0.0;

            bufferInicialCoordenadas.push(x);
            bufferInicialCoordenadas.push(y);
            bufferInicialCoordenadas.push(z);

            var nx = -1.0;
            var ny = 0.0;
            var nz = 0.0;

            bufferInicialNormales.push(nx);
            bufferInicialNormales.push(ny);
            bufferInicialNormales.push(nz);

        };
        //Cargo base
        for(var i = 0.0 ; i < (this.cols / 4) ; i++ ) {

            var t = i / ((this.cols / 4) - 1);

            var x = -1.0*t+0.5;
            var y = -0.5;
            var z = 0.0;

            bufferInicialCoordenadas.push(x);
            bufferInicialCoordenadas.push(y);
            bufferInicialCoordenadas.push(z);

            var nx = 0.0;
            var ny = 1.0;
            var nz = 0.0;

            bufferInicialNormales.push(nx);
            bufferInicialNormales.push(ny);
            bufferInicialNormales.push(nz);

        };
        //Cargo lateral izquierdo
        for(var i = 0.0 ; i < (this.cols / 4) ; i++ ) {

            var t = i / ((this.cols / 4) - 1);

            var x = -0.5;
            var y = 1.0*t-0.5;
            var z = 0.0;

            bufferInicialCoordenadas.push(x);
            bufferInicialCoordenadas.push(y);
            bufferInicialCoordenadas.push(z);

            var nx = 1.0;
            var ny = 0.0;
            var nz = 0.0;

            bufferInicialNormales.push(nx);
            bufferInicialNormales.push(ny);
            bufferInicialNormales.push(nz);

        };
    }

    this.initBuffers = function(){

        this.texture_coord_buffer = [];
        this.position_buffer = [];
        this.normal_buffer = [];

        this.bufferInicial = [];
        this.bufferFinal = [];

        var bufferInicialCoordenadas = [];
        var bufferInicialNormales = [];

        //Cargo el buffer inicial de coordenadas y normales del perfil
        this.cargarPerfil(bufferInicialCoordenadas,bufferInicialNormales);

        //Cargo las coordenadas de textura
        for (var i = 0.0; i < this.rows; i++){
            for (var j = 0.0; j < this.cols; j++){

                var u = 1.0 - (j / (this.cols-1.0));
                var v = 1.0 - (i / (this.rows-1.0));

                this.texture_coord_buffer.push(u);
                this.texture_coord_buffer.push(v);
                //Defino material 2 --> color violeta
                this.texture_coord_buffer.push(VIOLETA);
                this.texture_coord_buffer.push(0);
            };

        };
        
        //Puntos de control para la curba de bezier del recorrido del perfil
        var puntosDeControlXTransformar = vec4.fromValues(-48.0,72.0,-18.0,3.0);
        var puntosDeControlZTransformar = vec4.fromValues(0.0,-30.0,30.0,0.0);

        //Calculo las coordenadas para el perfil rotado
        for (var i = 0.0; i < this.rows; i++) {

            //Parametro t de la curva
            var t = i / (this.rows-1);

            //Buffers auxiliares para no modificar los valores de los buffers iniciales
            var bufferCoordenadasATransformar = [];
            var bufferNormalesATransformar = [];

            bufferCoordenadasATransformar = bufferCoordenadasATransformar.concat(bufferInicialCoordenadas);
            bufferNormalesATransformar = bufferNormalesATransformar.concat(bufferInicialNormales);

            transformarXZ(bufferCoordenadasATransformar,bufferNormalesATransformar,t,puntosDeControlXTransformar,puntosDeControlZTransformar);

            this.position_buffer = this.position_buffer.concat(bufferCoordenadasATransformar);
            this.normal_buffer = this.normal_buffer.concat(bufferNormalesATransformar);

            if( i == (this.rows-1) ){
                this.bufferFinal = this.bufferFinal.concat(bufferCoordenadasATransformar);
            }
            if ( i == 0.0 ){

                this.bufferInicial = this.bufferInicial.concat(bufferCoordenadasATransformar);

            }

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

inheritPrototype(InteriorEstacionEspacial, DrawObject);
