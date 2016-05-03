function ExteriorEstacionEspacial(){

    const PUNTOSCURVASUPERIOR = 30;
    const PUNTOSCURVAINFERIOR = 30;
    const PUNTOSCURVALATERAL = 10;
    const PUNTOSUNIONDECURVAS = 10;

    //Llamo a la clase padre
    DrawObject.call(this);
    //Seteo las dimensiones de la grilla
    DrawObject.call(this.setDimensions(FILASESTACIONESPACIAL,COLUMNASESTACIONESPACIAL));

    this.cargarPerfil = function(bufferInicialCoordenadas,bufferInicialNormales){
        
        //Curva superior del perfil
        var puntosDeControlXSuperior = vec4.fromValues(-2.5,3.75,0.75,-1.0);
        var puntosDeControlYSuperior = vec4.fromValues(0.0,-3.75,3.75,0.25);

        ObtenerPuntosCurva(bufferInicialCoordenadas,bufferInicialNormales,puntosDeControlXSuperior,puntosDeControlYSuperior,PUNTOSCURVASUPERIOR);

        //Cargo lado superior de la curva derecha

        for(var i = 0.0 ; i < PUNTOSUNIONDECURVAS ; i++ ) {

            var t = i / (PUNTOSUNIONDECURVAS - 1);

            var x = -0.25*t+1.0;
            var y = 0.25;
            var z = 0.0;

            bufferInicialCoordenadas.push(x);
            bufferInicialCoordenadas.push(y);
            bufferInicialCoordenadas.push(z);

            var nx = 0.0;
            var ny = -1.0;
            var nz = 0.0;

            bufferInicialNormales.push(nx);
            bufferInicialNormales.push(ny);
            bufferInicialNormales.push(nz);

        };

        //Curva derecha del perfil
        var puntosDeControlXDerecha = vec4.fromValues(0.0,-0.75,0.75,0.75);
        var puntosDeControlYDerecha = vec4.fromValues(0.25,-0.375,-0.375,0.25);

        ObtenerPuntosCurva(bufferInicialCoordenadas,bufferInicialNormales,puntosDeControlXDerecha,puntosDeControlYDerecha,PUNTOSCURVALATERAL);

        //Cargo lado inferior de la curva derecha

        for(var i = 0.0 ; i < PUNTOSUNIONDECURVAS ; i++ ) {

            var t = i / (PUNTOSUNIONDECURVAS - 1);

            var x = 0.25*t+0.75;
            var y = -0.25;
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

        //Curva inferior del perfil
        var puntosDeControlXInferior = vec4.fromValues(2.5,-3.75,-0.75,1.0);
        var puntosDeControlYInferior = vec4.fromValues(0.0,3.75,-3.75,-0.25);

        ObtenerPuntosCurva(bufferInicialCoordenadas,bufferInicialNormales,puntosDeControlXInferior,puntosDeControlYInferior,PUNTOSCURVAINFERIOR);

        //Cargo lado inferior de la curva izquieda

        for(var i = 0.0 ; i < PUNTOSUNIONDECURVAS ; i++ ) {

            var t = i / (PUNTOSUNIONDECURVAS - 1);

            var x = 0.25*t-1.0;
            var y = -0.25;
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

        //Curva izquierda del perfil
        var puntosDeControlXIzquierda = vec4.fromValues(0.0,0.75,-0.75,-0.75);
        var puntosDeControlYIzquierda = vec4.fromValues(-0.25,0.375,0.375,-0.25);

        ObtenerPuntosCurva(bufferInicialCoordenadas,bufferInicialNormales,puntosDeControlXIzquierda,puntosDeControlYIzquierda,PUNTOSCURVALATERAL);

        //Cargo lado superior de la curva izquierda

        for(var i = 0.0 ; i < PUNTOSUNIONDECURVAS ; i++ ) {

            var t = i / (PUNTOSUNIONDECURVAS - 1);

            var x = -0.25*t-0.75;
            var y = 0.25;
            var z = 0.0;

            bufferInicialCoordenadas.push(x);
            bufferInicialCoordenadas.push(y);
            bufferInicialCoordenadas.push(z);

            var nx = 0.0;
            var ny = -1.0;
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
                //Defino material 1 --> dorado
                this.texture_coord_buffer.push(DORADO);
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

    function ObtenerPuntosCurva(bufferInicialCoordenadas,bufferInicialNormales,puntosDeControlX,puntosDeControlY,puntos){

        for(var i = 0.0 ; i < puntos ; i++ ) {

            var t = i / (puntos - 1);

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
            bufferInicialNormales.push(-1.0*vectorNormal[0]);
            bufferInicialNormales.push(-1.0*vectorNormal[1]);
            bufferInicialNormales.push(-1.0*vectorNormal[2]);

        };

    }

}

inheritPrototype(ExteriorEstacionEspacial, DrawObject);