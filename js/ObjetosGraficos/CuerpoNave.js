CuerpoNave.prototype=new ComponenteEstacionEspacial;
CuerpoNave.prototype.constructor=CuerpoNave;
function CuerpoNave(){

    ComponenteEstacionEspacial.call(this,8,7,8.0);
    this.parabrisa = new ParabrisaNave();
    this.tapaDelantera = new TapaNave();
    this.tapaDelantera.tapaDelantera();
    this.tapaTrasera = new TapaNave();
    this.tapaTrasera.tapaTrasera();

    this.inicializarLosBuffer = function(){

        this.texture_coord_buffer = [];
        this.normal_buffer = [];

        this.position_buffer = [/*2.875, 1.5, 0.0, 2.875, 1.125, 0.0, 2.875, 0.75, 0.0, 2.875, 0.375, 0.0,
                                2.875, 0.0, 0.0, 2.875, -0.375, 0.0, 2.875, -1.5, 0.0,*/
                                2.625, 1.0, -0.25, 2.625, -1.0, -0.25, 2.875, -1.5, 0.0, 3.0, -1.25, 0.25,
                                3.0, 1.25, 0.25, 2.875, 1.5, 0.0, 2.625, 1.0, -0.25,
                                1.5, 1.0, -0.45, 1.5, -1.0, -0.45, 1.5, -1.5, 0.0, 1.5, -1.25, 0.5,
                                1.5, 1.25, 0.5, 1.5, 1.5, 0.0, 1.5, 1.0, -0.45,
                                1.25, 1.0, -0.5, 1.25, -1.0, -0.5, 1.25, -1.5, 0.0, 1.25, -1.25, 2.0/3.0,
                                1.25, 1.25, 2.0/3.0, 1.25, 1.5, 0.0, 1.25, 1.0, -0.5,
                                0.75, 1.0, -0.5, 0.75, -1.0, -0.5, 0.75, -1.5, 0.0, 0.75, -1.25, 1.0,
                                0.75, 1.25, 1.0, 0.75, 1.5, 0.0, 0.75, 1.0, -0.5,
                                -0.25, 1.0, -0.5, -0.25, -1.0, -0.5, -0.25, -1.5, 0.0, -0.25, -1.25, 1.0,
                                -0.25, 1.25, 1.0, -0.25, 1.5, 0.0, -0.25, 1.0, -0.5,
                                -0.5, 1.0, -0.375, -0.5, -1.0, -0.375, -0.5, -1.5, 0.0, -0.5, -1.25, 11.0/12.0,
                                -0.5, 1.25, 11.0/12.0, -0.5, 1.5, 0.0, -0.5, 1.0, -0.375,
                                -1.0, 1.0, -0.4375, -1.0, -1.0, -0.4375, -1.0, -1.5, 0.0, -1.0, -1.25, 0.75,
                                -1.0, 1.25, 0.75, -1.0, 1.5, 0.0, -1.0, 1.0, -0.4375,
                                -1.5, 1.0, -0.5, -1.5, -1.0, -0.5, -1.75, -1.5, 0.0, -1.5, -1.25, 0.75,
                                -1.5, 1.25, 0.75, -1.75, 1.5, 0.0, -1.5, 1.0, -0.5/*,
                                -1.75, 1.5, 0.0, -1.75, 1.125, 0.0,-1.75, 0.75, 0.0,-1.75, 0.375, 0.0,
                                -1.75, 0.0, 0.0,-1.75, -0.375, 0.0,-1.75, -1.5, 0.0*/];

        this.normal_buffer  = [/* 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
                                1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,*/
                                0.46, 0.0, -0.88, 0.46, 0.0, -0.88, 1.0, 0.0, 0.0, 0.89, 0.0, 0.45,
                                0.89, 0.0, 0.45, 1.0, 0.0, 0.0, 0.46, 0.0, -0.88,
                                0.17, 0.0, -0.98, 0.17, 0.0, -0.98, 0.0, 1.0, 0.0, 0.36, 0.0, 0.92,
                                0.36, 0.0, 0.92, 0.0, -1.0, 0.0, 0.17, 0.0, -0.98,
                                0.089, 0.0, -0.99, 0.089, 0.0, -0.99, 0.0, 1.0, 0.0, 0.55, 0.0, 0.83,
                                0.55, 0.0, 0.83, 0.0, -1.0, 0.0, 0.089, 0.0, -0.99,
                                0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 1.0, 0.0, 0.28, 0.0, 0.95,
                                0.28, 0.0, 0.95, 0.0, -1.0, 0.0, 0.0, 0.0, -1.0,
                                -0.38, 0.0, -0.92, -0.38, 0.0, -0.92, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0,
                                0.0, 0.0, 1.0, 0.0, -1.0, 0.0, -0.38, 0.0, -0.92,
                                -0.26, 0.0, -0.96, -0.25, 0.0, -0.96, 0.0, 1.0, 0.0, -0.31, 0.0, 0.94,
                                -0.31, 0.0, 0.94, 0.0, -1.0, 0.0, -0.26, 0.0, -0.96,
                                -0.24, 0.0, -0.97, -0.24, 0.0, -0.97, 0.0, 1.0, 0.0, -0.16, 0.0, 0.98,
                                -0.16, 0.0, 0.98, 0.0, -1.0, 0.0, -0.24, 0.0, -0.97,
                                -0.41, 0.0, -0.91, -0.41, 0.0, -0.91, 0.0, 1.0, 0.0, -0.58, 0.0, 0.81,
                                -0.58, 0.0, 0.81, 0.0, -1.0, 0.0, -0.41, 0.0, -0.91/*,
                                -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0,
                                -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0*/];

        //Cargo las coordenadas de textura
        for (var i = 0.0; i < this.rows; i++){
            for (var j = 0.0; j < this.cols; j++){

                var u = 1.0 - (j / (this.cols-1.0));
                var v = 1.0 - (i / (this.rows-1.0));

                this.texture_coord_buffer.push(u);
                this.texture_coord_buffer.push(v);
                this.texture_coord_buffer.push(this.material);
                this.texture_coord_buffer.push(0);
            };

        };
        // Buffer de indices de los triangulos
        this.crearBufferDeIndices();

        this.atarLosBuffer(this.position_buffer,this.normal_buffer,this.texture_coord_buffer,this.index_buffer);

    }
    this.inicializarLosBuffer();

    this.dibujar=function(){
        ObjetoGrafico.prototype.dibujar.call(this);
        this.parabrisa.dibujar();
        this.tapaDelantera.dibujar();
        this.tapaTrasera.dibujar();
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

        this.crearBufferDeIndices();

        this.atarLosBuffer(this.position_buffer,this.normal_buffer,this.texture_coord_buffer,this.index_buffer);

    }
    this.inicializarLosBuffer();
}

TapaNave.prototype=new ComponenteEstacionEspacial;
TapaNave.prototype.constructor=TapaNave;
function TapaNave(){

    ComponenteEstacionEspacial.call(this,3,2,8.0);

    this.cargarTapaDelantera = function(){
        this.position_buffer = [2.625, 1.0, -0.25, 2.625, -1.0, -0.25, 2.875, 1.5, 0.0,  2.875, -1.5, 0.0,
                                3.0, 1.25, 0.25, 3.0, -1.25, 0.25];

        this.normal_buffer = [0.46,0.0,-0.88, 0.46,0.0,-0.88, 0.81,0.0,-0.58, 0.81,0.0,-0.58,
                              0.89,0.0,0.45, 0.89,0.0,0.45];
        this.material = 6.0;
    }

    this.cargarTapaTrasera = function(){

        this.position_buffer = [-1.5, 1.0, -0.5, -1.5, -1.0, -0.5, -1.75, 1.5, 0.0,  -1.75, -1.5, 0.0,
                                -1.5, 1.25, 0.75, -1.5, -1.25, 0.75];

        this.normal_buffer = [-0.41,0.0,-0.91, -0.41,0.0,-0.91, -0.99,0.0,-0.07, -0.99,0.0,-0.07,
                              -0.58,0.0,0.81, -0.58,0.0,0.81];

        //this.material = 10.0;
    }

    this.inicializarLosBuffer = function(){

        for (var i = 0.0; i < this.rows; i++){
            for (var j = 0.0; j < this.cols; j++){

                var u = 1.0 - (j / (this.cols-1.0));
                var v = 1.0 - (i / (this.rows-1.0));

                this.texture_coord_buffer.push(u);
                this.texture_coord_buffer.push(v);
                this.texture_coord_buffer.push(this.material);
                this.texture_coord_buffer.push(0);
            };

        };

        this.crearBufferDeIndices();

        this.atarLosBuffer(this.position_buffer,this.normal_buffer,this.texture_coord_buffer,this.index_buffer);

    }

    this.tapaDelantera=function(){
        this.cargarTapaDelantera();
        this.inicializarLosBuffer();
    }

    this.tapaTrasera=function(){
        this.cargarTapaTrasera();
        this.inicializarLosBuffer();
    }

}
