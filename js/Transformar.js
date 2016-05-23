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

//Funcion creada a partir de http://www.sg6671.com.ar/files/demos/clase06/demoCurvas2d.html
function CalcularCurva(){

    var Base0,Base1,Base2,Base3;
    var Base0der,Base1der,Base2der,Base3der;
    var inicio,fin;
    var factor,sumador;

    //Calcula sobre el plano XY con Z = 0
    this.obtenerPuntosDeBezierXY = function(bufferPuntosDeControl,intervaloDelPaso,bufferCoordenadas,bufferNormales,factorNormal){

        Base0=function(u) { return (1-u)*(1-u)*(1-u);}

        Base1=function(u) { return 3*(1-u)*(1-u)*u; }

        Base2=function(u) { return 3*(1-u)*u*u;}

        Base3=function(u) { return u*u*u; }


        Base0der=function(u) { return -3*u*u+6*u-3;}

        Base1der=function(u) { return 9*u*u-12*u+3; }

        Base2der=function(u) { return -9*u*u+6*u;}

        Base3der=function(u) { return 3*u*u; }

        //Cada punto de control tiene coordenadas xyz, y cada curva 4 puntos de control
        var cantidadDeCurvasDeBezier = ( bufferPuntosDeControl.length / 3 ) / 4;
        //alert(cantidadDeCurvasDeBezier);
        for (var i = 0; i < cantidadDeCurvasDeBezier; i++) {
          
            inicio = 0 + i;
            fin = 1 + i;
            factor = 4;
            sumador = 2;

            calcular(bufferPuntosDeControl,intervaloDelPaso[i],bufferCoordenadas,bufferNormales,factorNormal);

        };

    };

    //Calcula sobre el plano XY con Z = 0
    //Recibe  los puntos de control en bufferPuntosDeControl
    //un valor intervaloDelPaso para los puntos de la curva de BSpline
    //Los buffers de coordendas y normales a cargar
    this.obtenerPuntosDeBSplineXY = function(bufferPuntosDeControl,intervaloDelPaso,bufferCoordenadas,bufferNormales,factorNormal){

        Base0=function(u) { return (1-3*u+3*u*u-u*u*u)*1/6;}

        Base1=function(u) { return (4-6*u*u+3*u*u*u)*1/6; }

        Base2=function(u) { return (1+3*u+3*u*u-3*u*u*u)*1/6}

        Base3=function(u) { return (u*u*u)*1/6; }


        Base0der=function(u) { return (-3 +6*u -3*u*u)/6 }

        Base1der=function(u) { return (-12*u+9*u*u)/6 }

        Base2der=function(u) { return (3+6*u-9*u*u)/6;}

        Base3der=function(u) { return (3*u*u)*1/6; }

        inicio = 2;
        fin = bufferPuntosDeControl.length / 3 - 1;
        factor = 1;
        sumador = 0;

        calcular(bufferPuntosDeControl,intervaloDelPaso,bufferCoordenadas,bufferNormales,factorNormal);

    }

    function calcular(bufferPuntosDeControl,intervaloDelPaso,bufferCoordenadas,bufferNormales,factorNormal){

        for ( i = inicio; i < fin; i++) {

            for (var j = 0; j < intervaloDelPaso; j++) {
                
                var u = j/(intervaloDelPaso-1);
                
                var indice = factor * i + sumador;

                var punto0 = vec3.fromValues(bufferPuntosDeControl[3*(indice-2)],bufferPuntosDeControl[3*(indice-2)+1],bufferPuntosDeControl[3*(indice-2)+2]);
                var punto1 = vec3.fromValues(bufferPuntosDeControl[3*(indice-1)],bufferPuntosDeControl[3*(indice-1)+1],bufferPuntosDeControl[3*(indice-1)+2]);
                var punto2 = vec3.fromValues(bufferPuntosDeControl[3*indice],bufferPuntosDeControl[3*indice+1],bufferPuntosDeControl[3*indice+2]);
                var punto3 = vec3.fromValues(bufferPuntosDeControl[3*(indice+1)],bufferPuntosDeControl[3*(indice+1)+1],bufferPuntosDeControl[3*(indice+1)+2]);


                var x,y,z,tx,ty,tz;

                //Calculo las coordenadas mediante las bases de BSpline
                x = Base0(u)*punto0[0]+Base1(u)*punto1[0]+Base2(u)*punto2[0]+Base3(u)*punto3[0];
                y = Base0(u)*punto0[1]+Base1(u)*punto1[1]+Base2(u)*punto2[1]+Base3(u)*punto3[1];
                z = Base0(u)*punto0[2]+Base1(u)*punto1[2]+Base2(u)*punto2[2]+Base3(u)*punto3[2];

                //Calculo el vector tangete
                tx = Base0der(u)*punto0[0]+Base1der(u)*punto1[0]+Base2der(u)*punto2[0]+Base3der(u)*punto3[0];
                ty = Base0der(u)*punto0[1]+Base1der(u)*punto1[1]+Base2der(u)*punto2[1]+Base3der(u)*punto3[1];
                tz = Base0der(u)*punto0[2]+Base1der(u)*punto1[2]+Base2der(u)*punto2[2]+Base3der(u)*punto3[2];

                //Calculo el vector normal
                var vectorNormal = vec3.fromValues(factorNormal*-ty,factorNormal*tx,factorNormal*tz);

                //Normalizo el vector normal
                vec3.normalize(vectorNormal,vectorNormal);

                bufferCoordenadas.push(x);
                bufferCoordenadas.push(y);
                bufferCoordenadas.push(z);

                bufferNormales.push(vectorNormal[0]);
                bufferNormales.push(vectorNormal[1]);
                bufferNormales.push(vectorNormal[2]);

            };
        };

    }

}