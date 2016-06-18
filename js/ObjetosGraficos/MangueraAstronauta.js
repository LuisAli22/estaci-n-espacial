MangueraAstronauta.prototype=new ComponenteEstacionEspacial;
MangueraAstronauta.prototype.constructor=MangueraAstronauta;
function MangueraAstronauta(material){

    this.bufferInicialCoordenadas = [];
    this.bufferInicialNormales = [];
    this.bufferInicialTangentes = [];
    this.bufferInicialBinormales = [];
    this.trayectoria = [];
    this.normalTrayectoria = [];
    this.tangenteTrayectoria = [];
    this.binormalTrayectoria = [];

    var puntosDeControl = [ 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 3.0, 5.0, 0.0,
                            6.0, 7.0, 0.0, 13.0, 8.0, 0.0, 17.0, 4.0, 0.0, 20.0, 4.0, 2.0,
                            20.0, 8.0, 2.0, 15.0, 8.0, 1.0, 10.0, 6.0, 2.0, 10.0, 8.0, 2.0,
                            12.0, 10.0, 1.5, 15.0, 10.0, 1.5, 18.0, 10.0, 1.5, 20.0, 12.0, 1.5,
                            36.0, 12.0, 1.5, 36.0, 12.0, 1.5, 36.0, 12.0, 1.5];


    const INTERVALODELPASO = 10;
    const FILAS = INTERVALODELPASO*((puntosDeControl.length/3));
    const COLUMNAS = 70;

    //Seteo las dimensiones de la grilla
    ComponenteEstacionEspacial.call(this,FILAS,COLUMNAS,material);

    var material = new Material(RUTAIMAGENTAPA,1.0,1.0,FILAS,COLUMNAS);
    material.cargar();
    this.setMaterial(material);

    this.calcularTrayectoria = function(){

        var calculardorDePuntosDeCurva = new CalcularCurva();
        calculardorDePuntosDeCurva.obtenerPuntosDeBSplineXY(puntosDeControl,INTERVALODELPASO,this.trayectoria,this.normalTrayectoria,this.tangenteTrayectoria,this.binormalTrayectoria,1);

    }

    this.cargarPerfil = function(){
        for (var i = 0; i < this.cols ; i++) {
            var angulo = 2*Math.PI*i/(this.cols-1);
            var x = 0.0625*Math.cos(angulo);
            var y = 0.0625*Math.sin(angulo);
            var z = 0.0;

            this.bufferInicialCoordenadas.push(x);
            this.bufferInicialCoordenadas.push(y);
            this.bufferInicialCoordenadas.push(z);

            var normales = vec3.fromValues(x,y,z);
            vec3.normalize(normales,normales);

            this.bufferInicialNormales.push(normales[0]);
            this.bufferInicialNormales.push(normales[1]);
            this.bufferInicialNormales.push(normales[2]);

            var tangentes = vec3.fromValues(-y,x,z);
            vec3.normalize(tangentes,tangentes);

            this.bufferInicialTangentes.push(tangentes[0]);
            this.bufferInicialTangentes.push(tangentes[1]);
            this.bufferInicialTangentes.push(tangentes[2]);

            var binormales = vec3.create();
            vec3.cross(binormales,tangentes,normales);
            vec3.normalize(binormales,binormales);

            this.bufferInicialBinormales.push(binormales[0]);
            this.bufferInicialBinormales.push(binormales[1]);
            this.bufferInicialBinormales.push(binormales[2]);

        };

    }

    this.transformar = function(){

        for (var i = 0; i < this.rows ; i++) {

            var trax = this.trayectoria[3*i];
            var tray = this.trayectoria[3*i+1];
            var traz = this.trayectoria[3*i+2];

            var nx = this.normalTrayectoria[3*i];
            var ny = this.normalTrayectoria[3*i+1];
            var nz = this.normalTrayectoria[3*i+2];

            var tx = ny;
            var ty = -nx;
            var tz = nz;

            var tangente = vec3.fromValues(tx,ty,tz);
            var normal = vec3.fromValues(nx,ny,nz);
            var binomial = vec3.create();

            vec3.cross(binomial,tangente,normal);

            vec3.normalize(binomial,binomial);

            var matrizFinal = mat4.create();
            var matrizRotacion = mat4.create();

            matrizRotacion[0] = normal[0];
            matrizRotacion[1] = normal[1];
            matrizRotacion[2] = normal[2];
            matrizRotacion[4] = binomial[0];
            matrizRotacion[5] = binomial[1];
            matrizRotacion[6] = binomial[2];
            matrizRotacion[8] = tangente[0];
            matrizRotacion[9] = tangente[1];
            matrizRotacion[10] = tangente[2];

            var vectorDesplazamiento = vec3.fromValues(trax,tray,traz);

            var matrizTraslacion = mat4.create();

            mat4.translate(matrizFinal,matrizTraslacion,vectorDesplazamiento);

            mat4.multiply(matrizFinal,matrizFinal,matrizRotacion);


            for(var j = 0;j<this.cols;j++){

                var vectorCoordenadas = vec4.create();
                var vectorNormales = vec4.create();
                var vectorTangentes = vec4.create();
                var vectorBinormales = vec4.create();

                vec4.set(vectorCoordenadas,this.bufferInicialCoordenadas[3*j],this.bufferInicialCoordenadas[3*j+1],this.bufferInicialCoordenadas[3*j+2],1.0);
                vec4.set(vectorNormales,this.bufferInicialNormales[3*j],this.bufferInicialNormales[3*j+1],this.bufferInicialNormales[3*j+2],1.0);
                vec4.set(vectorTangentes,this.bufferInicialTangentes[3*j],this.bufferInicialTangentes[3*j+1],this.bufferInicialTangentes[3*j+2],1.0);
                vec4.set(vectorBinormales,this.bufferInicialBinormales[3*j],this.bufferInicialBinormales[3*j+1],this.bufferInicialBinormales[3*j+2],1.0);

                /*vec4.normalize(vectorNormales,vectorNormales);
                vec4.normalize(vectorNormales,vectorNormales);
                vec4.normalize(vectorNormales,vectorNormales);
*/
                vec4.transformMat4(vectorCoordenadas,vectorCoordenadas,matrizFinal);
                vec4.transformMat4(vectorNormales,vectorNormales,matrizRotacion);
                vec4.transformMat4(vectorTangentes,vectorTangentes,matrizRotacion);
                vec4.transformMat4(vectorBinormales,vectorBinormales,matrizRotacion);
                vec4.normalize(vectorNormales,vectorNormales);
                vec4.normalize(vectorTangentes,vectorTangentes);
                vec4.normalize(vectorBinormales,vectorBinormales);

                this.position_buffer.push(vectorCoordenadas[0]);
                this.position_buffer.push(vectorCoordenadas[1]);
                this.position_buffer.push(vectorCoordenadas[2]);

                this.normal_buffer.push(vectorNormales[0]);
                this.normal_buffer.push(vectorNormales[1]);
                this.normal_buffer.push(vectorNormales[2]);

                this.tangente_buffer.push(vectorNormales[0]);
                this.tangente_buffer.push(vectorNormales[1]);
                this.tangente_buffer.push(vectorNormales[2]);


                this.binormal_buffer.push(vectorNormales[0]);
                this.binormal_buffer.push(vectorNormales[1]);
                this.binormal_buffer.push(vectorNormales[2]);

            };

        };

    }

    this.inicializarLosBuffer = function(){

        //this.texture_coord_buffer = [];
        this.position_buffer = [];
        this.normal_buffer = [];

        this.calcularTrayectoria();
        this.cargarPerfil();
        this.transformar();

        // Buffer de indices de los triangulos
        this.crearBufferDeIndices();

        this.atarLosBuffer(this.position_buffer,this.normal_buffer,this.texture_coord_buffer,this.index_buffer);

    }

    this.inicializarLosBuffer();

}

MangueraAstronauta.prototype.dibujar = function(){

    var matrizTraslacion = mat4.create();
    var matrizRotacion = mat4.create();

    mat4.rotateX(matrizRotacion,matrizRotacion,Math.PI/2.0);
    mat4.rotateZ(matrizRotacion,matrizRotacion,Math.PI/2.0);
    mat4.translate(matrizTraslacion,matrizTraslacion,[-0.25,0.0,5.75]);

    pilaMatrizDeModelado.meter();

      mat4.multiply(mvMatrix,mvMatrix,matrizTraslacion);
      mat4.multiply(mvMatrix,mvMatrix,matrizRotacion);

      ComponenteEstacionEspacial.prototype.dibujar.call(this);

    pilaMatrizDeModelado.sacar();

}
