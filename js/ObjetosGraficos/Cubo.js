Cubo.prototype=new ComponenteEstacionEspacial;
Cubo.prototype.constructor=Cubo;
function Cubo(material){

  this.tapas = [];

  this.bufferInicialCoordenadas = [];
  this.bufferInicialNormales = [];
  this.bufferInicialTangentes = [];
  this.bufferInicialBinormales = [];

  this.bufferInicialCoordenadasTapa = [];
  this.bufferInicialNormalesTapa = [];

  this.puntosDeControl = [-0.5, -0.5, -0.5, -0.333, -0.5, -0.5, 0.333, -0.5, -0.5, 0.5, -0.5, -0.5,
                           0.5, -0.5, -0.5, 0.5, -0.333, -0.5, 0.5, 0.333, -0.5, 0.5, 0.5, -0.5,
                           0.5, 0.5, -0.5, 0.333, 0.5, -0.5, -0.333, 0.5, -0.5, -0.5, 0.5, -0.5,
                           -0.5, 0.5, -0.5, -0.5, 0.333, -0.5, -0.5, -0.333, -0.5, -0.5, -0.5, -0.5 ];

  ComponenteEstacionEspacial.call(this,40,40,material);

  this.agregarTapa=function(tapa){
      this.tapas.push(tapa);
  }

}

Cubo.prototype.cargarPerfil = function(bufferInicialCoordenadas,bufferInicialNormales,bufferInicialTangentes,bufferInicialBinormales){

  var intervaloDelPaso = [10,10,10,10];

  var calculardorDePuntosDeCurva = new CalcularCurva();

  calculardorDePuntosDeCurva.obtenerPuntosDeBezierXY(this.puntosDeControl,intervaloDelPaso,bufferInicialCoordenadas,bufferInicialNormales,bufferInicialTangentes,bufferInicialBinormales,-1);

}

Cubo.prototype.inicializarLosBuffer=function(){

  this.cargarPerfil(this.bufferInicialCoordenadas,this.bufferInicialNormales,this.bufferInicialTangentes,this.bufferInicialBinormales);

  this.position_buffer = [];
  this.normal_buffer = [];

  this.bufferInicial = [];
  this.bufferFinal = [];

  this.transformar(this.bufferInicialCoordenadas,this.bufferInicialNormales,this.bufferInicialTangentes,this.bufferInicialBinormales);

}

Cubo.prototype.compilar= function(){

    this.crearBufferDeIndices();

    this.atarLosBuffer(this.position_buffer,this.normal_buffer,this.texture_coord_buffer,this.index_buffer);

}


Cubo.prototype.transformar = function(bufferInicialCoordenadas,bufferInicialNormales,bufferInicialTangentes,bufferInicialBinormales){
    //Calculo las coordenadas para el perfil rotado
    for (var i = 0.0; i < this.rows; i++) {
        //Parametro t de la curva
        var t = i / (this.rows-1);

        //Buffers auxiliares para no modificar los valores de los buffers iniciales
        var bufferCoordenadas = [];
        var bufferNormales = [];
        var bufferTangentes = [];
        var bufferBinormales = [];

        bufferCoordenadas = bufferCoordenadas.concat(bufferInicialCoordenadas);
        bufferNormales = bufferNormales.concat(bufferInicialNormales);
        bufferTangentes = bufferTangentes.concat(bufferInicialTangentes);
        bufferBinormales = bufferBinormales.concat(bufferInicialBinormales);

        var matTraslacion = mat4.create();
        var matTraslacion = mat4.translate(matTraslacion,matTraslacion,[0.0,0.0,t]);

        var cantidadIteraciones = bufferInicialCoordenadas.length/3.0;

        for(var j = 0;j<cantidadIteraciones;j++){

          var vectorCoordenadas = vec4.create();
          var vectorNormales = vec4.create();
          var vectorTangentes = vec4.create();
          var vectorBinormales = vec4.create();

          vec4.set(vectorCoordenadas,bufferCoordenadas[3*j],bufferCoordenadas[3*j+1],bufferCoordenadas[3*j+2],1.0);
          vec4.set(vectorNormales,bufferNormales[3*j],bufferNormales[3*j+1],bufferNormales[3*j+2],1.0);
          vec4.set(vectorTangentes,bufferTangentes[3*j],bufferTangentes[3*j+1],bufferTangentes[3*j+2],1.0);
          vec4.set(vectorBinormales,bufferBinormales[3*j],bufferBinormales[3*j+1],bufferBinormales[3*j+2],1.0);

          vec4.normalize(vectorNormales,vectorNormales);
          vec4.normalize(vectorTangentes,vectorTangentes);
          vec4.normalize(vectorBinormales,vectorBinormales);

          vec4.transformMat4(vectorCoordenadas,vectorCoordenadas,matTraslacion);

          bufferCoordenadas[3*j] = vectorCoordenadas[0];
          bufferCoordenadas[3*j+1] = vectorCoordenadas[1];
          bufferCoordenadas[3*j+2] = vectorCoordenadas[2];

          bufferNormales[3*j] = vectorNormales[0];
          bufferNormales[3*j+1] = vectorNormales[1];
          bufferNormales[3*j+2] = vectorNormales[2];

          bufferTangentes[3*j] = vectorTangentes[0];
          bufferTangentes[3*j+1] = vectorTangentes[1];
          bufferTangentes[3*j+2] = vectorTangentes[2];

          bufferBinormales[3*j] = vectorBinormales[0];
          bufferBinormales[3*j+1] = vectorBinormales[1];
          bufferBinormales[3*j+2] = vectorBinormales[2];

        }

        this.position_buffer = this.position_buffer.concat(bufferCoordenadas);
        this.normal_buffer = this.normal_buffer.concat(bufferNormales);
        this.tangente_buffer = this.tangente_buffer.concat(bufferTangentes);
        this.binormal_buffer = this.binormal_buffer.concat(bufferBinormales);

    };

}

Cubo.prototype.agregarMaterial = function(material,materialTapa){

    this.texture_coord_buffer = [];
    this.rutaTextura = material.rutaTextura;
    this.texture_coord_buffer = this.texture_coord_buffer.concat(material.texture_coord_buffer);

}

Cubo.prototype.dibujar = function(){

  ObjetoGrafico.prototype.dibujar.call(this);
  for(indiceComponente in this.tapas){
    this.tapas[indiceComponente].dibujar();
  }

}

Cubo.prototype.inicializarTextura=function(){
  ObjetoGrafico.prototype.inicializarTextura.call(this);
  for(indiceComponente in this.tapas){
    this.tapas[indiceComponente].inicializarTextura();
  }
}
Cubo.prototype.generarMipMap=function (){
  ObjetoGrafico.prototype.generarMipMap.call(this);
  for(indiceComponente in this.tapas){
    this.tapas[indiceComponente].generarMipMap();
  }
}


TapaCubo.prototype=new ComponenteEstacionEspacial;
TapaCubo.prototype.constructor=TapaCubo;
function TapaCubo(material,altura,normal){

  ComponenteEstacionEspacial.call(this,2,40,material);

  this.altura = altura;
  this.normal = normal;

}

TapaCubo.prototype.inicializarLosBuffer=function(){

  this.position_buffer = [];
  this.normal_buffer = [];

  this.cargarTapa(this.altura,this.normal);
  
}

TapaCubo.prototype.compilar= function(){

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
      this.tangente_buffer.push(normal);
      this.tangente_buffer.push(0.0);
      this.tangente_buffer.push(0.0);
      this.binormal_buffer.push(0.0);
      this.binormal_buffer.push(normal);
      this.binormal_buffer.push(0.0);

    };

  };

}
TapaCubo.prototype.agregarMaterial = function(material){

    this.texture_coord_buffer = [];
    this.rutaTextura = material.rutaTextura;
    this.texture_coord_buffer = this.texture_coord_buffer.concat(material.texture_coord_buffer);

}