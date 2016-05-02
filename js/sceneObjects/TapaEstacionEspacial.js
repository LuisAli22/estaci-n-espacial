//bufferExterior y bufferInterior deben tener la misma cantidad de puntos
function TapaEstacionEspacial(_bufferExterior,_bufferInterior){

	this.bufferExterior = _bufferExterior;
	this.bufferInterior = _bufferInterior;

	//Tiene que tener la misma cantidad que los puntos
	//de los buffers
	const COLUMNAS = 120;
	const FILAS = 2;

	this.position_buffer = null;
    this.normal_buffer = null;
    this.texture_coord_buffer = null;
    this.index_buffer = null;

    this.webgl_position_buffer = null;
    this.webgl_normal_buffer = null;
    this.webgl_texture_coord_buffer = null;
    this.webgl_index_buffer = null;
    
    this.texture = null;

    this.getIndices = function(){

        return (FILAS-1) * (2*COLUMNAS);

    }

    this.initTexture = function(texture_file){
        
        var aux_texture = gl.createTexture();
        this.texture = aux_texture;
        this.texture.image = new Image();

        this.texture.image.onload = function () {
               handleLoadedTexture()
        }
        this.texture.image.src = texture_file;

    }

    this.createIndexBuffer = function(){

        this.index_buffer = [];
        this.index_buffer.push(0);
        var indices = (2*COLUMNAS)*(FILAS-1);
        var sumador = 1;

        for (var i = 1;i<indices;i++) {

            if ( i % (2*COLUMNAS) == 0 ){

                this.index_buffer.push(this.index_buffer[i-1]);
                sumador = sumador * -1;


            }else if ( i % 2 != 0 ){

                this.index_buffer.push(this.index_buffer[i-1] + COLUMNAS);
            
            }else{

                this.index_buffer.push(this.index_buffer[i-2] + sumador );
        
            }

        }

    }

    this.initBuffers = function(){

        this.texture_coord_buffer = [];
        this.normal_buffer = [];

        //Cargo las coordenadas de textura
        for (var i = 0.0; i < FILAS; i++){
            for (var j = 0.0; j < COLUMNAS; j++){

                var u = 1.0 - (j / (COLUMNAS-1.0));
                var v = 1.0 - (i / (FILAS-1.0));

                this.texture_coord_buffer.push(u);
                this.texture_coord_buffer.push(v);
                //Defino material 1--> color dorado
                this.texture_coord_buffer.push(DORADO);
                this.texture_coord_buffer.push(0);

                this.normal_buffer.push(0.0);
                this.normal_buffer.push(-1.0);
                this.normal_buffer.push(0.0);

            };

        };
        
        this.position_buffer = [];

        this.position_buffer = this.position_buffer.concat(this.bufferExterior);
        this.position_buffer = this.position_buffer.concat(this.bufferInterior);

        // Buffer de indices de los triangulos
        this.createIndexBuffer();

        // Creación e Inicialización de los buffers a nivel de OpenGL
        this.webgl_normal_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normal_buffer), gl.STATIC_DRAW);
        this.webgl_normal_buffer.itemSize = 3;
        this.webgl_normal_buffer.numItems = this.normal_buffer.length / 3;

        this.webgl_texture_coord_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_texture_coord_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.texture_coord_buffer), gl.STATIC_DRAW);
        this.webgl_texture_coord_buffer.itemSize = 4;
        this.webgl_texture_coord_buffer.numItems = this.texture_coord_buffer.length / 4;

        this.webgl_position_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.position_buffer), gl.STATIC_DRAW);
        this.webgl_position_buffer.itemSize = 3;
        this.webgl_position_buffer.numItems = this.position_buffer.length / 3;

        this.webgl_index_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.index_buffer), gl.STATIC_DRAW);
        this.webgl_index_buffer.itemSize = 1;
        this.webgl_index_buffer.numItems = this.index_buffer.length;

    }

}