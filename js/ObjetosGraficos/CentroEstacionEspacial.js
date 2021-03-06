CentroEstacionEspacial.prototype=new ComponenteEstacionEspacial;
CentroEstacionEspacial.prototype.constructor=CentroEstacionEspacial;
function CentroEstacionEspacial(material){

    //Puntos de control para la curva de B-spline para definir el centro
    //de la estacion espacial
    var puntosDeControl = [ 0.0, 1.75, 0.0, 0.0, 1.75, 0.0, 0.0, 1.75, 0.0, 0.0, 1.75, 0.0,
                            0.25, 1.75, 0.0, 0.25, 1.75, 0.0, 0.25, 1.75, 0.0, 0.25, 1.75, 0.0,
                            0.25, 1.64, 0.0, 0.25, 1.64, 0.0, 0.25, 1.64, 0.0, 0.25, 1.64, 0.0,
                            0.375, 1.60, 0.0, 0.375, 1.47, 0.0, 0.375, 1.47, 0.0, 0.375, 1.47, 0.0,
                            0.375, 1.47, 0.0, 0.4375, 1.47, 0.0, 0.4375, 1.47, 0.0, 0.4375, 1.47, 0.0,
                            0.4375, 1.47, 0.0, 0.4375, 0.91, 0.0, 0.4375, 0.91, 0.0, 0.4375, 0.91, 0.0,
                            0.4375, 0.91, 0.0, 1.0, 0.84, 0.0, 1.125, 0.63, 0.0, 1.125, 0.63, 0.0,
                            1.125, 0.63, 0.0, 1.125, 0.63, 0.0, 1.125, 0.42, 0.0, 1.125, 0.42, 0.0,
                            1.125, 0.42, 0.0, 1.125, 0.42, 0.0, 1.375, 0.42, 0.0, 1.375, 0.23, 0.0,
                            1.125, 0.21, 0.0, 1.125, 0.21, 0.0, 1.125, 0.21, 0.0, 1.125, 0.21, 0.0,
                            1.125, -0.21, 0.0, 1.125, -0.21, 0.0, 1.125, -0.21, 0.0, 1.125, -0.21, 0.0,
                            1.1875, -0.21, 0.0, 1.1875, -0.21, 0.0, 1.1875, -0.21, 0.0, 1.1875, -0.21, 0.0,
                            1.1875, -0.35, 0.0, 1.1875, -0.35, 0.0, 1.1875, -0.35, 0.0, 1.1875, -0.35, 0.0,
                            0.875, -0.49, 0.0, 0.875, -0.49, 0.0, 0.875, -0.49, 0.0, 0.875, -0.49, 0.0,
                            0.9375, -0.49, 0.0, 0.9375, -0.49, 0.0, 0.9375, -0.49, 0.0, 0.9375, -0.49, 0.0,
                            0.4375, -0.7, 0.0, 0.25, -0.77, 0.0, 0.25, -0.77, 0.0, 0.25, -0.77, 0.0,
                            0.25, -0.77, 0.0, 0.25, -1.61, 0.0, 0.25, -1.61, 0.0, 0.25, -1.61, 0.0,
                            0.25, -1.61, 0.0, 0.0, -1.61, 0.0, 0.0, -1.61, 0.0, 0.0, -1.61, 0.0,
                            0.0, -1.61, 0.0 ];


    const INTERVALODELPASO = 10;
    const COLUMNAS = INTERVALODELPASO*((puntosDeControl.length/3)-2);
    const FILAS = 70;

    //Seteo las dimensiones de la grilla
    ComponenteEstacionEspacial.call(this,FILAS,COLUMNAS,material);

    this.cargarCentro = function(){

        var bufferInicialCoordenadas = [];
        var bufferInicialNormales = [];
        var bufferInicialTangentes = [];
        var bufferInicialBinormales = [];

        var calculardorDePuntosDeCurva = new CalcularCurva();
        calculardorDePuntosDeCurva.obtenerPuntosDeBSplineXY(puntosDeControl,10,bufferInicialCoordenadas,bufferInicialNormales,bufferInicialTangentes,bufferInicialBinormales,1);

        var matrizRotacion = mat4.create();

        //Calculo las coordenadas para el perfil rotado
        for (var i = 0.0; i < this.rows; i++) {

            var angulo = 2.0*i*Math.PI/(this.rows-1);
            var matizModelado = mat4.create();
            mat4.rotateY(matizModelado,matrizRotacion,angulo);

            for (var j = 0; j < this.cols; j++) {

                var coordenada = vec3.create();

                coordenada[0] = bufferInicialCoordenadas[3*j];
                coordenada[1] = bufferInicialCoordenadas[3*j+1];
                coordenada[2] = bufferInicialCoordenadas[3*j+2];

                //Aplico la transformacion de revolucion a las coordenadas
                vec3.transformMat4(coordenada,coordenada,matizModelado);
                
                this.position_buffer.push(coordenada[0]);
                this.position_buffer.push(coordenada[1]);
                this.position_buffer.push(coordenada[2]);

                var normales = vec3.create();
                var tangentes = vec3.create();
                var binormales = vec3.create();

                normales[0] = bufferInicialNormales[3*j];
                normales[1] = bufferInicialNormales[3*j+1];
                normales[2] = bufferInicialNormales[3*j+2];

                tangentes[0] = bufferInicialTangentes[3*j];
                tangentes[1] = bufferInicialTangentes[3*j+1];
                tangentes[2] = bufferInicialTangentes[3*j+2];

                binormales[0] = bufferInicialBinormales[3*j];
                binormales[1] = bufferInicialBinormales[3*j+1];
                binormales[2] = bufferInicialBinormales[3*j+2];

                //Aplico la transformacion de revolucion a las normales
                vec3.transformMat4(normales,normales,matizModelado);
                vec3.normalize(normales,normales);

                vec3.transformMat4(tangentes,tangentes,matizModelado);
                vec3.normalize(tangentes,tangentes);

                vec3.transformMat4(binormales,binormales,matizModelado);
                vec3.normalize(binormales,binormales);

                this.normal_buffer.push(normales[0]);
                this.normal_buffer.push(normales[1]);
                this.normal_buffer.push(normales[2]);

                this.tangente_buffer.push(tangentes[0]);
                this.tangente_buffer.push(tangentes[1]);
                this.tangente_buffer.push(tangentes[2]);

                this.binormal_buffer.push(binormales[0]);
                this.binormal_buffer.push(binormales[1]);
                this.binormal_buffer.push(binormales[2]);


            };

        };


    }

    this.inicializarLosBuffer = function(){

        this.position_buffer = [];
        this.normal_buffer = [];

        this.cargarCentro();

    }

    this.compilar= function(){

        this.crearBufferDeIndices();

        this.atarLosBuffer(this.position_buffer,this.normal_buffer,this.texture_coord_buffer,this.index_buffer);

    }

    this.inicializarLosBuffer();
}
