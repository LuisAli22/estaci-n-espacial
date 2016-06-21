CuerpoNave.prototype=new ComponenteEstacionEspacial;
CuerpoNave.prototype.constructor=CuerpoNave;
function CuerpoNave(){

    ComponenteEstacionEspacial.call(this,9,7,8.0);
    this.parabrisa = new ParabrisaNave();
    this.tapas = [];
    
    this.normalizarBuffer = function(){
        for (var i = 0; i < 63; i++) {
            var normal = vec3.fromValues(this.normal_buffer[3*i],this.normal_buffer[3*i+1],this.normal_buffer[3*i+2]);
            vec3.normalize(normal,normal);
            this.normal_buffer[3*i] = normal[0];
            this.normal_buffer[3*i+1] = normal[1];
            this.normal_buffer[3*i+2] = normal[2];
        };
    }

    this.agregarTapa = function(tapa){

        this.tapas.push(tapa);

    }

    this.inicializarLosBuffer = function(){

        this.texture_coord_buffer = [];
        this.normal_buffer = [];

        this.position_buffer = [ 2.625, 1.0, -0.25, 2.625, -1.0, -0.25, 2.875, -1.5, 0.0, 3.0, -1.25, 0.25,
                            3.0, 1.25, 0.25, 2.875, 1.5, 0.0, 2.625, 1.0, -0.25,
                            1.5, 1.0, -0.45, 1.5, -1.0, -0.45, 1.5, -1.5, 0.0, 1.5, -1.25, 0.5,
                            1.5, 1.25, 0.5, 1.5, 1.5, 0.0, 1.5, 1.0, -0.45,
                            1.25, 1.0, -0.5, 1.25, -1.0, -0.5, 1.25, -1.5, 0.0, 1.25, -1.25, 2.0/3.0,
                            1.25, 1.25, 2.0/3.0, 1.25, 1.5, 0.0, 1.25, 1.0, -0.5,
                            0.75, 1.0, -0.5, 0.75, -1.0, -0.5, 0.75, -1.5, 0.0, 0.75, -1.25, 1.0,
                            0.75, 1.25, 1.0, 0.75, 1.5, 0.0, 0.75, 1.0, -0.5,
                            -0.25, 1.0, -0.5, -0.25, -1.0, -0.5, -0.25, -1.5, 0.0, -0.25, -1.25, 1.0,
                            -0.25, 1.25, 1.0, -0.25, 1.5, 0.0, -0.25, 1.0, -0.5,
                            -0.5, 1.0, -0.4375, -0.5, -1.0, -0.4375, -0.5, -1.5, 0.0, -0.5, -1.25, 1.0,
                            -0.5, 1.25, 1.0, -0.5, 1.5, 0.0, -0.5, 1.0, -0.4375,
                            -0.75, 1.0, -0.375, -0.75, -1.0, -0.375, -0.75, -1.5, 0.0, -0.75, -1.25, 11.0/12.0,
                            -0.75, 1.25, 11.0/12.0, -0.75, 1.5, 0.0, -0.75, 1.0, -0.375,
                            -1.25, 1.0, -0.4375, -1.25, -1.0, -0.4375, -1.25, -1.5, 0.0, -1.25, -1.25, 0.75,
                            -1.25, 1.25, 0.75, -1.25, 1.5, 0.0, -1.25, 1.0, -0.4375,
                            -1.75, 1.0, -0.5, -1.75, -1.0, -0.5, -2.0, -1.5, 0.0, -1.75, -1.25, 0.75,
                            -1.75, 1.25, 0.75, -2.0, 1.5, 0.0, -1.75, 1.0, -0.5];

        this.normal_buffer  = [0.462 , 0.230 , -0.887 , 0.462 , -0.230 , -0.887 , 0.811 , -0.987 , -0.585 , 0.891 , -0.383 , 0.454 ,
                               0.891 , 0.383 , 0.454 , 0.811 , 0.987 , -0.585 , 0.462 , 0.230 , -0.887 ,
                               0.186 , 0.358 , -0.983 , 0.186 , -0.358 , -0.983 , 0.0 , -0.983 , -0.186 , 0.368 , -0.526 , 0.930 ,
                               0.368 , 0.526 , 0.930 , 0.0 , 0.983 , -0.186 , 0.186 , 0.358 , -0.983 ,
                               0.099 , 0.383 , -0.995 , 0.099 , -0.383 , -0.995 , 0.0 , -0.977 , -0.212 , 0.555 , -0.570 , 0.832 ,
                               0.555 , 0.570 , 0.832 ,  0.0 , 0.977 , -0.212 , 0.099 , 0.383 , -0.995 ,
                               0.0 , 0.383 , -1.0 , 0.0 , -0.383 , -1.0 , 0.0 , -0.964 , -0.267  , 0.290 , -0.615 , 0.957 ,
                               0.290 , 0.615 , 0.957 , 0.0 , 0.964 , -0.267 , 0.0 , 0.383 , -1.0 ,
                               -0.122 , 0.383 , -0.993 , -0.122 , -0.383 , -0.993 , 0.0 , -0.964 , -0.267 , 0.0, -0.615, 1.0,
                               0.0, 0.615, 1.0, 0.0 , 0.964 , -0.267 , -0.122 , 0.383 , -0.993 ,
                               -0.243 , 0.352 , -0.970 , -0.243 , -0.352 , -0.970 , 0.0 , -0.954 , -0.299 , -0.160 , -0.615 , 0.987 ,
                               -0.160 , 0.615 , 0.987 , 0.0 , 0.954 , -0.299 , -0.243 , 0.352 , -0.970 ,
                               -0.060 , 0.316 , -0.998 , -0.060 , -0.316 , -0.998 , 0.0 , -0.946 , -0.325 , -0.316 , -0.607 , 0.949 ,
                               -0.316 , 0.607 , 0.949 , 0.0 , 0.946 , -0.325 , -0.060 , 0.316 , -0.998 , 
                               0.124 , 0.352 , -0.992 , 0.124 , -0.352 , -0.992 , 0.0 , -0.965 , -0.262 , -0.160 , -0.585 , 0.987 ,
                               -0.160 , 0.585 , 0.987 , 0.0 , 0.965 , -0.262 , 0.124 , 0.352 , -0.992 ,
                               -0.472 , 0.383 , -0.882 , -0.472 , -0.383 , -0.882 , -0.997 , -0.973 , -0.071 , -0.585 , -0.585 , 0.811 ,
                               -0.585 , 0.585 , 0.811 ,  -0.997 , 0.973 , -0.071 , -0.472 , 0.383 , -0.882 ];
        
        this.normalizarBuffer();


    }

    this.compilar= function(){

        this.crearBufferDeIndices();

        this.atarLosBuffer(this.position_buffer,this.normal_buffer,this.texture_coord_buffer,this.index_buffer);

    }

    this.inicializarLosBuffer();

    this.dibujar=function(){

        ObjetoGrafico.prototype.dibujar.call(this);

        this.parabrisa.dibujar();

        for(indiceComponente in this.tapas){
            this.tapas[indiceComponente].dibujar();
        }
    }


    this.inicializarTextura=function(ruta){
      ObjetoGrafico.prototype.inicializarTextura.call(this,ruta);
      for(indiceComponente in this.tapas){
        this.tapas[indiceComponente].inicializarTextura(ruta);
      }
    }
    this.generarMipMap=function (){
      ObjetoGrafico.prototype.generarMipMap.call(this);
      for(indiceComponente in this.tapas){
        this.tapas[indiceComponente].generarMipMap();
      }
    }


}

ParabrisaNave.prototype=new ComponenteEstacionEspacial;
ParabrisaNave.prototype.constructor=ParabrisaNave;
function ParabrisaNave(){

    ComponenteEstacionEspacial.call(this,2,2,9.0);

    this.inicializarLosBuffer = function(){

        this.position_buffer = [1.51, 1.25, 0.5,  0.76, 1.25, 1.0, 1.51, -1.25, 0.5, 0.76, -1.25, 1.0];
        this.normal_buffer  = [0.70,0.0,0.70,0.70,0.0,0.70,0.70,0.0,0.70,0.70,0.0,0.70];
        for (var i = 0.0; i < this.rows; i++){
            for (var j = 0.0; j < this.cols; j++){

                var u = 1.0 - (j / (this.cols-1.0));
                var v = 1.0 - (i / (this.rows-1.0));

                this.texture_coord_buffer.push(u);
                this.texture_coord_buffer.push(v);
                this.texture_coord_buffer.push(9.0);
                this.texture_coord_buffer.push(0);
            };

        };

        this.compilar();

    }

    this.compilar= function(){

        this.crearBufferDeIndices();

        this.atarLosBuffer(this.position_buffer,this.normal_buffer,this.texture_coord_buffer,this.index_buffer);

    }


    this.inicializarLosBuffer();
}

TapaNave.prototype=new ComponenteEstacionEspacial;
TapaNave.prototype.constructor=TapaNave;
function TapaNave(){

    ComponenteEstacionEspacial.call(this,3,2,8.0);

    this.normalizarBuffer = function(){
        for (var i = 0; i < 6; i++) {
            var normal = vec3.fromValues(this.normal_buffer[3*i],this.normal_buffer[3*i+1],this.normal_buffer[3*i+2]);
            vec3.normalize(normal,normal);
            this.normal_buffer[3*i] = normal[0];
            this.normal_buffer[3*i+1] = normal[1];
            this.normal_buffer[3*i+2] = normal[2];
        };
    }

    this.cargarTapaDelantera = function(){
        this.position_buffer = [2.625, 1.0, -0.25, 2.625, -1.0, -0.25, 2.875, 1.5, 0.0,  2.875, -1.5, 0.0,
                                3.0, 1.25, 0.25, 3.0, -1.25, 0.25];

        this.normal_buffer = [0.462 , 0.230 , -0.887 , 0.462 , -0.230 , -0.887,  0.811 , 0.987 , -0.585, 0.811 , -0.987 , -0.585,
                              0.891 , 0.383 , 0.454 , 0.891 , -0.383 , 0.454 ];

        this.normalizarBuffer();
    }

    this.cargarTapaTrasera = function(){

        this.position_buffer = [-1.75, 1.0, -0.5, -1.75, -1.0, -0.5, -2.0, 1.5, 0.0,  -2.0, -1.5, 0.0,
                                -1.75, 1.25, 0.75, -1.75, -1.25, 0.75];
        
        this.normal_buffer = [-0.472 , 0.383  , -0.882 , -0.472 , -0.383 , -0.882 , -0.997 , 0.973 , -0.071, -0.997 , -0.973 , -0.071,
                              -0.585 , 0.585 , 0.811 , -0.585 , -0.585 , 0.811 ];

        this.normalizarBuffer();

    }

    this.compilar= function(){

        this.crearBufferDeIndices();

        this.atarLosBuffer(this.position_buffer,this.normal_buffer,this.texture_coord_buffer,this.index_buffer);

    }

    this.tapaDelantera=function(){
        this.cargarTapaDelantera();
    }

    this.tapaTrasera=function(){
        this.cargarTapaTrasera();
    }

}
