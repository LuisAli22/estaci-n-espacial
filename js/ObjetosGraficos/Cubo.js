Cubo.prototype=new ComponenteEstacionEspacial;
Cubo.prototype.constructor=Cubo;
function Cubo(material){

  this.tapInferior = new TapaCubo(material,0.0,-1.0);
  this.tapSuperior = new TapaCubo(material,1.0,1.0);

  this.bufferInicialCoordenadas = [];
  this.bufferInicialNormales = [];

  this.bufferInicialCoordenadasTapa = [];
  this.bufferInicialNormalesTapa = [];

  this.puntosDeControl = [-0.5, -0.5, 0.0, -0.333, -0.5, 0.0, 0.333, -0.5, 0.0, 0.5, -0.5, 0.0, 
                           0.5, -0.5, 0.0, 0.5, -0.333, 0.0, 0.5, 0.333, 0.0, 0.5, 0.5, 0.0,
                           0.5, 0.5, 0.0, 0.333, 0.5, 0.0, -0.333, 0.5, 0.0, -0.5, 0.5, 0.0,
                           -0.5, 0.5, 0.0, -0.5, 0.333, 0.0, -0.5, -0.333, 0.0, -0.5, -0.5, 0.0 ];

  this.puntosDeControlTapa = [-0.5, 0.5, 0.0, -0.5, 0.333, 0.0, -0.5, -0.333, 0.0, -0.5, -0.5, 0.0 ];

  ComponenteEstacionEspacial.call(this,40,40,material);

  this.inicializarLosBuffer();

}

Cubo.prototype.cargarPerfil = function(bufferInicialCoordenadas,bufferInicialNormales){

  var intervaloDelPaso = [10,10,10,10];

  var calculardorDePuntosDeCurva = new CalcularCurva();

  calculardorDePuntosDeCurva.obtenerPuntosDeBezierXY(this.puntosDeControl,intervaloDelPaso,bufferInicialCoordenadas,bufferInicialNormales,-1);

}

Cubo.prototype.cargarPerfilTapa = function(){

  var intervaloDelPaso = [10];

  var calculardorDePuntosDeCurva = new CalcularCurva();

  calculardorDePuntosDeCurva.obtenerPuntosDeBezierXY(this.puntosDeControlTapa,intervaloDelPaso,this.bufferInicialCoordenadasTapa,this.bufferInicialNormalesTapa,-1);

}

Cubo.prototype.inicializarLosBuffer=function(){

  this.cargarPerfil(this.bufferInicialCoordenadas,this.bufferInicialNormales);
  this.cargarPerfilTapa();

  this.texture_coord_buffer = [];
  this.position_buffer = [];
  this.normal_buffer = [];

  this.bufferInicial = [];
  this.bufferFinal = [];

  //Cargo las coordenadas de textura
  for (var i = 0.0; i < this.rows; i++){
      for (var j = 0.0; j < this.cols; j++){

          var u = 1.0 - (j / (this.cols-1.0));
          var v = 1.0 - (i / (this.rows-1.0));

          this.texture_coord_buffer.push(u);
          this.texture_coord_buffer.push(v);
          //Defino material 1 --> dorado
          this.texture_coord_buffer.push(this.material);
          this.texture_coord_buffer.push(0);
      };

  };

  this.transformar(this.bufferInicialCoordenadas,this.bufferInicialNormales);

  // Buffer de indices de los triangulos
  this.crearBufferDeIndices();
  this.atarLosBuffer(this.position_buffer,this.normal_buffer,this.texture_coord_buffer,this.index_buffer);

}

Cubo.prototype.cargarTapa = function(altura,normal){

  for (var i = 0; i < 2; i++) {

    signo = (i==0) ? 1 : -1;
    
    for (var j = 0; j < this.cols; j++) {

      var t = -0.5 + j/(this.cols-1);

      this.position_buffer.push(t);
      this.position_buffer.push(signo*0.5);
      this.position_buffer.push(altura);
      this.normal_buffer.push(0.0);
      this.normal_buffer.push(0.0);
      this.normal_buffer.push(normal);

    };

  };

}

Cubo.prototype.transformar = function(bufferInicialCoordenadas,bufferInicialNormales){
    //Calculo las coordenadas para el perfil rotado
    for (var i = 0.0; i < this.rows; i++) {
        //Parametro t de la curva
        var t = i / (this.rows-1);

        //Buffers auxiliares para no modificar los valores de los buffers iniciales
        var bufferCoordenadas = [];
        var bufferNormales = [];

        bufferCoordenadas = bufferCoordenadas.concat(bufferInicialCoordenadas);
        bufferNormales = bufferNormales.concat(bufferInicialNormales);

        var matTraslacion = mat4.create();
        var matTraslacion = mat4.translate(matTraslacion,matTraslacion,[0.0,0.0,t]);

        var cantidadIteraciones = bufferInicialCoordenadas.length/3.0;

        for(var j = 0;j<cantidadIteraciones;j++){

          var vectorCoordenadas = vec4.create();
          var vectorNormales = vec4.create();

          vec4.set(vectorCoordenadas,bufferCoordenadas[3*j],bufferCoordenadas[3*j+1],bufferCoordenadas[3*j+2],1.0);
          vec4.set(vectorNormales,bufferNormales[3*j],bufferNormales[3*j+1],bufferNormales[3*j+2],1.0);

          vec4.normalize(vectorNormales,vectorNormales);

          vec4.transformMat4(vectorCoordenadas,vectorCoordenadas,matTraslacion);

          bufferCoordenadas[3*j] = vectorCoordenadas[0];
          bufferCoordenadas[3*j+1] = vectorCoordenadas[1];
          bufferCoordenadas[3*j+2] = vectorCoordenadas[2];

          bufferNormales[3*j] = vectorNormales[0];
          bufferNormales[3*j+1] = vectorNormales[1];
          bufferNormales[3*j+2] = vectorNormales[2];

        }

        this.position_buffer = this.position_buffer.concat(bufferCoordenadas);
        this.normal_buffer = this.normal_buffer.concat(bufferNormales);

    };

}

Cubo.prototype.transformarTapa = function(altura){

  for (var i = 0; i < 4; i++) {

    var t =  i / (3);

    var bufferCoordenadas = [];
    var bufferNormales = [];

    bufferCoordenadas = bufferCoordenadas.concat(this.bufferInicialCoordenadasTapa);
    bufferNormales = bufferNormales.concat(this.bufferInicialNormalesTapa);

    var matTraslacion = mat4.create();
    var matTraslacion = mat4.translate(matTraslacion,matTraslacion,[t,0.0,altura]);

    var cantidadIteraciones = this.bufferInicialCoordenadasTapa.length/3.0;

    for(var j = 0;j<cantidadIteraciones;j++){

      var vectorCoordenadas = vec4.create();
      var vectorNormales = vec4.create();

      vec4.set(vectorCoordenadas,bufferCoordenadas[3*j],bufferCoordenadas[3*j+1],bufferCoordenadas[3*j+2],1.0);
      vec4.set(vectorNormales,bufferNormales[3*j],bufferNormales[3*j+1],bufferNormales[3*j+2],1.0);

      vec4.normalize(vectorNormales,vectorNormales);

      vec4.transformMat4(vectorCoordenadas,vectorCoordenadas,matTraslacion);

      bufferCoordenadas[3*j] = vectorCoordenadas[0];
      bufferCoordenadas[3*j+1] = vectorCoordenadas[1];
      bufferCoordenadas[3*j+2] = vectorCoordenadas[2];

      bufferNormales[3*j] = vectorNormales[0];
      bufferNormales[3*j+1] = vectorNormales[1];
      bufferNormales[3*j+2] = vectorNormales[2];


    }

    this.position_buffer = this.position_buffer.concat(bufferCoordenadas);
    this.normal_buffer = this.normal_buffer.concat(bufferNormales);
    alert(this.position_buffer[this.position_buffer.length-3]);

  };

}

Cubo.prototype.dibujar = function(){

  ObjetoGrafico.prototype.dibujar.call(this);
  this.tapInferior.dibujar();
  this.tapSuperior.dibujar();

}


TapaCubo.prototype=new ComponenteEstacionEspacial;
TapaCubo.prototype.constructor=TapaCubo;
function TapaCubo(material,altura,normal){

  ComponenteEstacionEspacial.call(this,2,40,material);

  this.altura = altura;
  this.normal = normal;
  this.inicializarLosBuffer();

}

TapaCubo.prototype.inicializarLosBuffer=function(){

  this.texture_coord_buffer = [];
  this.position_buffer = [];
  this.normal_buffer = [];

  //Cargo las coordenadas de textura
  for (var i = 0.0; i < this.rows; i++){
      for (var j = 0.0; j < this.cols; j++){

          var u = 1.0 - (j / (this.cols-1.0));
          var v = 1.0 - (i / (this.rows-1.0));

          this.texture_coord_buffer.push(u);
          this.texture_coord_buffer.push(v);
          //Defino material 1 --> dorado
          this.texture_coord_buffer.push(this.material);
          this.texture_coord_buffer.push(0);
      };

  };

  this.cargarTapa(this.altura,this.normal);

  // Buffer de indices de los triangulos
  this.crearBufferDeIndices();
  this.atarLosBuffer(this.position_buffer,this.normal_buffer,this.texture_coord_buffer,this.index_buffer);

}

TapaCubo.prototype.cargarTapa = function(altura,normal){

  for (var i = 0; i < 2; i++) {

    signo = (i==0) ? 1 : -1;
    
    for (var j = 0; j < this.cols; j++) {

      var t = -0.5 + j/(this.cols-1);

      this.position_buffer.push(t);
      this.position_buffer.push(signo*0.5);
      this.position_buffer.push(altura);
      this.normal_buffer.push(0.0);
      this.normal_buffer.push(0.0);
      this.normal_buffer.push(normal);

    };

  };

}


