function transformarXZ(bufferCoordenadas,bufferNormales,t,puntosDeControlX,puntosDeControlZ){

    var cantidadIteraciones = bufferCoordenadas.length/3.0;

    //Defino los puntos de control para la curva de bezier
    //que define la curba de barrido
    var puntosDeControlY = vec4.fromValues(0.0,0.0,0.0,0.0);

    var vectorTangente = vec3.create();
    var vectorNormal = vec3.create();
    var vectorBinomial = vec3.create();

    vectorTangente[0] = 3.0*Math.pow(t,2)*puntosDeControlX[0]+2.0*t*puntosDeControlX[1]+puntosDeControlX[2];
    vectorTangente[1] = 3.0*Math.pow(t,2)*puntosDeControlY[0]+2.0*t*puntosDeControlY[1]+puntosDeControlY[2];
    vectorTangente[2] = 3.0*Math.pow(t,2)*puntosDeControlZ[0]+2.0*t*puntosDeControlZ[1]+puntosDeControlZ[2];

    vectorNormal[0] = vectorTangente[2];
    vectorNormal[1] = vectorTangente[1];
    vectorNormal[2] = -1.0*vectorTangente[0];

    vec3.normalize(vectorNormal,vectorNormal);
    vec3.normalize(vectorTangente,vectorTangente);

    vec3.cross(vectorBinomial,vectorTangente,vectorNormal);

    vec3.normalize(vectorBinomial,vectorBinomial);

    var matrizFinal = mat4.create();
    var matrizRotacion = mat4.create();

    matrizRotacion[0] = vectorNormal[0];
    matrizRotacion[1] = vectorNormal[1];
    matrizRotacion[2] = vectorNormal[2];
    matrizRotacion[4] = vectorBinomial[0];
    matrizRotacion[5] = vectorBinomial[1];
    matrizRotacion[6] = vectorBinomial[2];
    matrizRotacion[8] = vectorTangente[0];
    matrizRotacion[9] = vectorTangente[1];
    matrizRotacion[10] = vectorTangente[2];
    
    var vectorDesplazamiento = vec3.create();

    //Caculo el desplazamiento en la curva
    vectorDesplazamiento[0] = Math.pow(t,3)*puntosDeControlX[0]+Math.pow(t,2)*puntosDeControlX[1]+t*puntosDeControlX[2]+puntosDeControlX[3];
    vectorDesplazamiento[1] = Math.pow(t,3)*puntosDeControlY[0]+Math.pow(t,2)*puntosDeControlY[1]+t*puntosDeControlY[2]+puntosDeControlY[3];
    vectorDesplazamiento[2] = Math.pow(t,3)*puntosDeControlZ[0]+Math.pow(t,2)*puntosDeControlZ[1]+t*puntosDeControlZ[2]+puntosDeControlZ[3];

    var matrizTraslacion = mat4.create();

    mat4.translate(matrizTraslacion,matrizTraslacion,vectorDesplazamiento);

    mat4.multiply(matrizFinal,matrizTraslacion,matrizRotacion);

    for(var i = 0;i<cantidadIteraciones;i++){

        var vectorCoordenadas = vec4.create();
        var vectorNormales = vec4.create();

        vec4.set(vectorCoordenadas,bufferCoordenadas[3*i],bufferCoordenadas[3*i+1],bufferCoordenadas[3*i+2],1.0);
        vec4.set(vectorNormales,bufferNormales[3*i],bufferNormales[3*i+1],bufferNormales[3*i+2],1.0);

        vec4.normalize(vectorNormales,vectorNormales);

        vec4.transformMat4(vectorCoordenadas,vectorCoordenadas,matrizFinal);
        vec4.transformMat4(vectorNormales,vectorNormales,matrizRotacion);
        vec4.normalize(vectorNormales,vectorNormales);

        bufferCoordenadas[3*i] = vectorCoordenadas[0];
        bufferCoordenadas[3*i+1] = vectorCoordenadas[1];
        bufferCoordenadas[3*i+2] = vectorCoordenadas[2];

        bufferNormales[3*i] = vectorNormales[0];
        bufferNormales[3*i+1] = vectorNormales[1];
        bufferNormales[3*i+2] = vectorNormales[2];
        
    };

};
