AnilloEstacionEspacial.prototype=new ComponenteEstacionEspacial;
AnilloEstacionEspacial.prototype.constructor=AnilloEstacionEspacial;
function AnilloEstacionEspacial(material,matrizModelado){

    const PUNTOSCURVASUPERIOR = 30;
    const PUNTOSCURVAINFERIOR = 30;
    const PUNTOSCURVALATERAL = 10;
    const PUNTOSUNIONDECURVAS = 10;

    this.bufferInicialCoordenadas = [];
    this.bufferInicialNormales = [];

    ComponenteEstacionEspacial.call(this,FILASESTACIONESPACIAL,COLUMNASESTACIONESPACIAL,material,matrizModelado);
    this.cargarPerfilExterior = function(bufferInicialCoordenadas,bufferInicialNormales){

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

    this.cargarPerfilInterior = function(bufferInicialCoordenadas,bufferInicialNormales){

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

    this.inicializarLosBuffer = function(bufferInicialCoordenadas,bufferInicialNormales){

        this.texture_coord_buffer = [];
        this.position_buffer = [];
        this.normal_buffer = [];

        this.bufferInicial = [];
        this.bufferFinal = [];

        //Cargo las coordenadas de textura
        for (var i = 0.0; i < this.rows; i++){
            for (var j = 0.0; j < this.cols; j++){

                var u = 1.0 - (j / (this.cols-1.0));
                var v = 1.0 - (i / (this.rows-1.0));

                this.texture_coord_buffer.push(u);
                this.texture_coord_buffer.push(v);
                //Defino material 1 --> dorado
                this.texture_coord_buffer.push(this.material);
                this.texture_coord_buffer.push(0);
            };

        };

        var puntoDeControlXInicial = vec4.fromValues(0.0,12.0,-12.0,0.0);
        var puntoDeControlZInicial = vec4.fromValues(-12.0,18.0,0.0,-3.0);

        this.inicio = 0.25;
        this.fin = 1.0;

        this.transformar(puntoDeControlXInicial,puntoDeControlZInicial,bufferInicialCoordenadas,bufferInicialNormales);

        var puntoDeControlXFinal = vec4.fromValues(0.0,-12.0,12.0,0.0);
        var puntoDeControlZFinal = vec4.fromValues(12.0,-18.0,0.0,3.0);

        this.inicio = 0.0;
        this.fin = 0.75;

        this.transformar(puntoDeControlXFinal,puntoDeControlZFinal,bufferInicialCoordenadas,bufferInicialNormales);


        // Buffer de indices de los triangulos
        this.crearBufferDeIndices();
        this.atarLosBuffer(this.position_buffer,this.normal_buffer,this.texture_coord_buffer,this.index_buffer);

    }

    this.transformar = function(puntosDeControlXTransformar,puntosDeControlZTransformar,bufferInicialCoordenadas,bufferInicialNormales,t0,tf){
        //Calculo las coordenadas para el perfil rotado
        for (var i = 0.0; i < this.rows/2; i++) {
            //Parametro t de la curva
            var t = this.inicio + i *(this.fin-this.inicio)/ (this.rows/2-1);

            //Buffers auxiliares para no modificar los valores de los buffers iniciales
            var bufferCoordenadasATransformar = [];
            var bufferNormalesATransformar = [];

            bufferCoordenadasATransformar = bufferCoordenadasATransformar.concat(bufferInicialCoordenadas);
            bufferNormalesATransformar = bufferNormalesATransformar.concat(bufferInicialNormales);

            transformarXZ(bufferCoordenadasATransformar,bufferNormalesATransformar,t,puntosDeControlXTransformar,puntosDeControlZTransformar);

            this.position_buffer = this.position_buffer.concat(bufferCoordenadasATransformar);
            this.normal_buffer = this.normal_buffer.concat(bufferNormalesATransformar);

            if( i == (this.rows/2-1) && this.fin == 0.75 ){

                this.bufferFinal = this.bufferFinal.concat(bufferCoordenadasATransformar);

            }

            if ( i == 0.0 && this.inicio == 0.25 ){

                this.bufferInicial = this.bufferInicial.concat(bufferCoordenadasATransformar);

            }

        };

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
    this.cargarExteriorEstacionEspacial = function(){

        this.cargarPerfilExterior(this.bufferInicialCoordenadas,this.bufferInicialNormales);
        this.inicializarLosBuffer(this.bufferInicialCoordenadas,this.bufferInicialNormales);
    }
    this.cargarInteriorEstacionEspacial = function(){

        this.cargarPerfilInterior(this.bufferInicialCoordenadas,this.bufferInicialNormales);
        this.inicializarLosBuffer(this.bufferInicialCoordenadas,this.bufferInicialNormales);
    }
}

//inheritPrototype(ExteriorEstacionEspacial, DrawObject);
