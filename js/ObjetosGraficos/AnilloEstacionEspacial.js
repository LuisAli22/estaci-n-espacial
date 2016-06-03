AnilloEstacionEspacial.prototype=new ComponenteEstacionEspacial;
AnilloEstacionEspacial.prototype.constructor=AnilloEstacionEspacial;
function AnilloEstacionEspacial(material){

    const PUNTOSCURVASUPERIOR = 30;
    const PUNTOSCURVAINFERIOR = 30;
    const PUNTOSCURVALATERAL = 10;
    const PUNTOSUNIONDECURVAS = 10;

    this.bufferInicialCoordenadas = [];
    this.bufferInicialNormales = [];

    var puntosDeControlExterior = [-1.5, 0.25, 0.0, -0.75, 1.5, 0.0, 0.75, 1.5, 0.0, 1.5, 0.25, 0.0,
                                    1.5, 0.25, 0.0, 1.4166, 0.25, 0.0, 1.333, 0.25, 0.0, 1.25, 0.25, 0.0,
                                    1.25, 0.25, 0.0, 1.5, 0.125, 0.0, 1.5, -0.125, 0.0, 1.25, -0.25, 0.0,
                                    1.25, -0.25, 0.0, 1.333, -0.25, 0.0, 1.4166, -0.25, 0.0, 1.5, -0.25, 0.0,
                                    1.5, -0.25, 0.0, 0.75, -1.5, 0.0, -0.75, -1.5, 0.0, -1.5, -0.25, 0.0,
                                    -1.5, -0.25, 0.0, -1.4166, -0.25, 0.0, -1.333, -0.25, 0.0, -1.25, -0.25, 0.0,
                                    -1.25, -0.25, 0.0, -1.5, -0.125, 0.0, -1.5, 0.125, 0.0, -1.25, 0.25, 0.0,
                                    -1.25, 0.25, 0.0, -1.333, 0.25, 0.0, -1.4166, 0.25, 0.0, -1.5, 0.25, 0.0];

    var puntosDeControlInterior = [-1.0, 0.5, 0.0, -0.25, 1.0, 0.0, 0.25, 1.0, 0.0, 1.0, 0.5, 0.0, 
                                   1.0, 0.5, 0.0, 1.0, 0.166, 0.0, 1.0, -0.166, 0.0, 1.0, -0.5, 0.0, 
                                   1.0, -0.5, 0.0, 0.333, -0.5, 0.0, -0.333, -0.5, 0.0, -1.0, -0.5, 0.0,
                                   -1.0, -0.5, 0.0, -1.0, -0.166, 0.0, -1.0, 0.166, 0.0, -1.0, 0.5, 0.0];

    this.trayectoria = [];

    ComponenteEstacionEspacial.call(this,FILASESTACIONESPACIAL,COLUMNASESTACIONESPACIAL,material);

    this.cargarPerfilExterior = function(bufferInicialCoordenadas,bufferInicialNormales){

       var intervaloDelPaso = [30,10,10,10,30,10,10,10];

        var calculardorDePuntosDeCurva = new CalcularCurva();
        calculardorDePuntosDeCurva.obtenerPuntosDeBezierXY(puntosDeControlExterior,intervaloDelPaso,bufferInicialCoordenadas,bufferInicialNormales,1);

    }

    this.cargarPerfilInterior = function(bufferInicialCoordenadas,bufferInicialNormales){

        var intervaloDelPaso = [30,30,30,30];

        var calculardorDePuntosDeCurva = new CalcularCurva();
        calculardorDePuntosDeCurva.obtenerPuntosDeBezierXY(puntosDeControlInterior,intervaloDelPaso,bufferInicialCoordenadas,bufferInicialNormales,-1);

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

        var puntoDeControlXInicial = vec4.fromValues(0.0,18.0,-18.0,0.0);
        var puntoDeControlZInicial = vec4.fromValues(-18.0,27.0,0.0,-4.5);

        this.inicio = 0.25;
        this.fin = 1.0;

        this.transformar(puntoDeControlXInicial,puntoDeControlZInicial,bufferInicialCoordenadas,bufferInicialNormales);

        var puntoDeControlXFinal = vec4.fromValues(0.0,-18.0,18.0,0.0);
        var puntoDeControlZFinal = vec4.fromValues(18.0,-27.0,0.0,4.5);

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

            var desplazamiento = transformarXZ(bufferCoordenadasATransformar,bufferNormalesATransformar,t,puntosDeControlXTransformar,puntosDeControlZTransformar);
            
            this.trayectoria.push(desplazamiento);

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

    this.cargarExteriorEstacionEspacial = function(){

        //interior = false;
        this.cargarPerfilExterior(this.bufferInicialCoordenadas,this.bufferInicialNormales);
        this.inicializarLosBuffer(this.bufferInicialCoordenadas,this.bufferInicialNormales);
    }
    this.cargarInteriorEstacionEspacial = function(){

        //interior = true;
        //trayectoria = [];
        this.cargarPerfilInterior(this.bufferInicialCoordenadas,this.bufferInicialNormales);
        this.inicializarLosBuffer(this.bufferInicialCoordenadas,this.bufferInicialNormales);
    }
    
}

//inheritPrototype(ExteriorEstacionEspacial, DrawObject);
