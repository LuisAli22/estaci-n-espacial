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

function obternerPuntosDeBSpline(bufferPuntosDeControl,intervaloDelPaso,bufferCoordenadas,bufferNormales){
    
    var cantidadDePuntosDeControl = bufferPuntosDeControl.length / 3;

    for (var i = 2; i < cantidadDePuntosDeControl; i++) {
        for (var j = 0; j < intervaloDelPaso; j++) {
            
            var u = j/(intervaloDelPaso-1);
            
            var punto0 = vec3.fromValues(bufferPuntosDeControl[3*(i-2)],bufferPuntosDeControl[3*(i-2)+1],bufferPuntosDeControl[3*(i-2)+2]);
            var punto1 = vec3.fromValues(bufferPuntosDeControl[3*(i-1)],bufferPuntosDeControl[3*(i-1)+1],bufferPuntosDeControl[3*(i-1)+2]);
            var punto2 = vec3.fromValues(bufferPuntosDeControl[3*i],bufferPuntosDeControl[3*i+1],bufferPuntosDeControl[3*i+2]);
            var punto3 = vec3.fromValues(bufferPuntosDeControl[3*(i+1)],bufferPuntosDeControl[3*(i+1)+1],bufferPuntosDeControl[3*(i+1)+2]);

            var x,y,z;

            
            x = Base0Spline(u)*punto0[0]+Base1Spline(u)*punto1[0]+Base2Spline(u)*punto2[0]+Base3Spline(u)*punto3[0];
            y = Base0Spline(u)*punto0[1]+Base1Spline(u)*punto1[1]+Base2Spline(u)*punto2[1]+Base3Spline(u)*punto3[1];
            z = Base0Spline(u)*punto0[2]+Base1Spline(u)*punto1[2]+Base2Spline(u)*punto2[2]+Base3Spline(u)*punto3[2];

            bufferCoordenadas.push(x);
            bufferCoordenadas.push(y);
            bufferCoordenadas.push(z);

            bufferNormales.push(1.0);
            bufferNormales.push(0.0);
            bufferNormales.push(0.0);

        };
    };
};

function Base0Spline(u) { 
    return (1-3*u+3*u*u-u*u*u)*1/6;
}

function Base1Spline(u) { 
    return (4-6*u*u+3*u*u*u)*1/6;
}

function Base2Spline(u) { 
    return (1+3*u+3*u*u-3*u*u*u)*1/6
}

function Base3Spline(u) { 
    return (u*u*u)*1/6;
}