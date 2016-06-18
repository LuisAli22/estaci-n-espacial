ComponenteBahia.prototype=new ComponenteEstacionEspacial;
ComponenteBahia.prototype.constructor=ComponenteBahia;
function ComponenteBahia(filas,columnas,material){

	//Puntos para definir la trayectoria
	var puntoDeControlXInicial = vec4.fromValues(0.0,18.0,-18.0,0.0);
    var puntoDeControlZInicial = vec4.fromValues(-18.0,27.0,0.0,-4.5);
    var puntoDeControlXFinal = vec4.fromValues(0.0,-18.0,18.0,0.0);
    var puntoDeControlZFinal = vec4.fromValues(18.0,-27.0,0.0,4.5);

    //Buffers que contienen el perfil inicial
    this.bufferCoordenadas = [];
    this.bufferNormales = [];
    this.buffeTangentes = [];
    this.buffeBinormales = [];

    //Buffers auxiliares utilizados para las tapas
    this.bufferInicial = [];
    this.bufferFinal = [];

	ComponenteEstacionEspacial.call(this,filas,columnas,material);

	this.inicializarLosBuffer = function(){
        
        this.trayectoria = [];

        this.position_buffer = [];
        this.normal_buffer = [];

        this.inicio = 0.25;
        this.fin = 1.0;

        this.transformar(puntoDeControlXInicial,puntoDeControlZInicial);

        this.inicio = 0.0;
        this.fin = 0.75;

        this.transformar(puntoDeControlXFinal,puntoDeControlZFinal);

        this.crearBufferDeIndices();
        this.atarLosBuffer(this.position_buffer,this.normal_buffer,this.texture_coord_buffer,this.index_buffer);


	}

	this.transformar = function(puntosDeControlXTransformar,puntosDeControlZTransformar){


        //Calculo las coordenadas para el perfil rotado
        for (var i = 0.0; i < this.rows/2; i++) {
            //Parametro t de la curva
            var t = this.inicio + i *(this.fin-this.inicio)/ (this.rows/2-1);

            //Buffers auxiliares para no modificar los valores de los buffers iniciales
            var bufferCoordenadasATransformar = [];
            var bufferNormalesATransformar = [];
            var bufferTangentesATransformar = [];
            var bufferBinormalesATransformar = [];

            bufferCoordenadasATransformar = bufferCoordenadasATransformar.concat(this.bufferCoordenadas);
            bufferNormalesATransformar = bufferNormalesATransformar.concat(this.bufferNormales);
            bufferTangentesATransformar = bufferTangentesATransformar.concat(this.buffeTangentes);
            bufferBinormalesATransformar = bufferBinormalesATransformar.concat(this.buffeBinormales);

            var desplazamiento = transformarXZ(bufferCoordenadasATransformar,bufferNormalesATransformar,bufferTangentesATransformar,bufferBinormalesATransformar,t,puntosDeControlXTransformar,puntosDeControlZTransformar);

            this.trayectoria.push(desplazamiento);

            this.position_buffer = this.position_buffer.concat(bufferCoordenadasATransformar);
            this.normal_buffer = this.normal_buffer.concat(bufferNormalesATransformar);
            this.tangente_buffer = this.tangente_buffer.concat(bufferTangentesATransformar);
            this.binormal_buffer = this.binormal_buffer.concat(bufferBinormalesATransformar);

            if( i == (this.rows/2-1) && this.fin == 0.75 ){

                this.bufferFinal = this.bufferFinal.concat(bufferCoordenadasATransformar);

            }

            if ( i == 0.0 && this.inicio == 0.25 ){

                this.bufferInicial = this.bufferInicial.concat(bufferCoordenadasATransformar);

            }

        };

    }

    this.obtenerTrayectoria=function(){
        return this.trayectoria;
    }

}

ComponenteBahia.prototype.cargarBuffers=function(coordenadas,normales,tangentes,binormales){
	
    this.bufferCoordenadas = coordenadas;
	this.bufferNormales = normales;
    this.buffeTangentes = tangentes;
    this.buffeBinormales = binormales;
    this.inicializarLosBuffer();

}
