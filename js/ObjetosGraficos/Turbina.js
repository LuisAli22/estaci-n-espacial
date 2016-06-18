Turbina.prototype=new ComponenteEstacionEspacial;
Turbina.prototype.constructor=Turbina;
function Turbina(){

    var puntosDeControl = [ 0.0, -0.875, 0.0, 0.0, -0.875, 0.0, 0.0, -0.875, 0.0, 0.5, -0.875, 0.0,
    						0.5, -0.875, 0.0, 0.5, -0.875, 0.0, 0.5, -1.0, 0.0, 0.5, -1.0, 0.0,
    						0.5, -1.0, 0.0, 1.0, -1.0, 0.0, 0.25, 1.0, 0.0, 0.25, 1.0, 0.0,
    						0.25, 1.0, 0.0, 0.25, 0.875, 0.0, 0.25, 0.875, 0.0, 0.25, 0.875, 0.0,
    						0.0, 0.875, 0.0, 0.0, 0.875, 0.0, 0.0, 0.875, 0.0];

    const INTERVALODELPASO = 10;
    const COLUMNAS = INTERVALODELPASO*((puntosDeControl.length/3));
    const FILAS = 70;

    ComponenteEstacionEspacial.call(this,FILAS,COLUMNAS,1.0);

    this.cargarTurbina = function(){

        var bufferInicialCoordenadas = [];
        var bufferInicialNormales = [];
        var bufferInicialTangentes = [];
        var bufferInicialBinormales = [];

        var calculardorDePuntosDeCurva = new CalcularCurva();
        calculardorDePuntosDeCurva.obtenerPuntosDeBSplineXY(puntosDeControl,INTERVALODELPASO,bufferInicialCoordenadas,bufferInicialNormales,bufferInicialTangentes,bufferInicialBinormales,-1);

        //Cargo las coordenadas de textura
        for (var i = 0.0; i < this.rows; i++){
            for (var j = 0.0; j < this.cols; j++){

                var u = 1.0 - (j / (this.cols-1.0));
                var v = 1.0 - (i / (this.rows-1.0));

                this.texture_coord_buffer.push(u);
                this.texture_coord_buffer.push(v);
                //Defino material 1 --> dorado
                if(bufferInicialCoordenadas[3*j]>0.0 && bufferInicialCoordenadas[3*j]<0.5 && bufferInicialCoordenadas[3*j+1] > -0.876 && bufferInicialCoordenadas[3*j+1] < -0.874){
                	this.texture_coord_buffer.push(3.0);
                }else if(bufferInicialCoordenadas[3*j]>0.0 && bufferInicialCoordenadas[3*j]<0.25 && bufferInicialCoordenadas[3*j+1] < 0.876 && bufferInicialCoordenadas[3*j+1] > 0.874){
                	this.texture_coord_buffer.push(3.0);
                }else{
                	this.texture_coord_buffer.push(7.0);
                }

                this.texture_coord_buffer.push(0);
            };

        };

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

        this.texture_coord_buffer = [];
        this.position_buffer = [];
        //this.normal_buffer = [];

        this.cargarTurbina();

        // Buffer de indices de los triangulos
        this.crearBufferDeIndices();

        this.atarLosBuffer(this.position_buffer,this.normal_buffer,this.texture_coord_buffer,this.index_buffer);

    }
    this.inicializarLosBuffer();

}
