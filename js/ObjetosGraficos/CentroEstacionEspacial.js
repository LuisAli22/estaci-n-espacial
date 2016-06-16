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

        var calculardorDePuntosDeCurva = new CalcularCurva();
        calculardorDePuntosDeCurva.obtenerPuntosDeBSplineXY(puntosDeControl,10,bufferInicialCoordenadas,bufferInicialNormales,1);
        
        //Cargo las coordenadas de textura
        /*for (var i = 0.0; i < this.rows; i++){
            for (var j = 0.0; j < this.cols; j++){

                var u = 1.0 - (j / (this.cols-1.0));
                var v = 1.0 - (i / (this.rows-1.0));

                this.texture_coord_buffer.push(u);
                this.texture_coord_buffer.push(v);
                //Defino material 1 --> dorado
                this.texture_coord_buffer.push(this.material);
                this.texture_coord_buffer.push(0);
            };

        };*/

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

                normales[0] = bufferInicialNormales[3*j];
                normales[1] = bufferInicialNormales[3*j+1];
                normales[2] = bufferInicialNormales[3*j+2];

                //Aplico la transformacion de revolucion a las normales
                vec3.transformMat4(normales,normales,matizModelado);
                vec3.normalize(normales,normales);

                this.normal_buffer.push(normales[0]);
                this.normal_buffer.push(normales[1]);
                this.normal_buffer.push(normales[2]);

            };

        };


    }

    this.inicializarLosBuffer = function(){

        //this.texture_coord_buffer = [];
        this.position_buffer = [];
        this.normal_buffer = [];

        var material = new Material(RUTAIMAGENEXTERIOR,1.0,16.0,this.rows,this.cols);
        material.cargar();
        this.setMaterial(material);

        this.cargarCentro();

        // Buffer de indices de los triangulos
        this.crearBufferDeIndices();

        this.atarLosBuffer(this.position_buffer,this.normal_buffer,this.texture_coord_buffer,this.index_buffer);

    }
    this.inicializarLosBuffer();
}
