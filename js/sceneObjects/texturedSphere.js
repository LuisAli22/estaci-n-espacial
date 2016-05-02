function TexturedSphere(latitude_bands, longitude_bands){

    this.latitudeBands = latitude_bands;
    this.longitudeBands = longitude_bands;

    this.position_buffer = null;
    this.normal_buffer = null;
    this.texture_coord_buffer = null;
    this.index_buffer = null;

    this.webgl_position_buffer = null;
    this.webgl_normal_buffer = null;
    this.webgl_texture_coord_buffer = null;
    this.webgl_index_buffer = null;

    this.texture = null;
    this.position_buffer = [];
    this.normal_buffer = [];
    this.texture_coord_buffer = [];
    this.index_buffer = [];
    this.latNumber=0;
    this.longNumber=0;
    this.initTexture = function(texture_file){

        var aux_texture = gl.createTexture();
        this.texture = aux_texture;
        this.texture.image = new Image();

        this.texture.image.onload = function () {
               handleLoadedTexture()
        }
        this.texture.image.src = texture_file;
    }

    this.getCoordinateValue=function(coordinate,phi,sinTheta,cosTheta){
      var sinPhi = Math.sin(phi);
      var cosPhi = Math.cos(phi);

      return (coordinate==XCOORD)?
            (cosPhi * sinTheta):
            ((coordinate==YCOORD)?
              (cosTheta):
              (sinPhi * sinTheta));
    }
    this.loadPositionAndNormalBuffer=function(sinTheta,cosTheta){
      var phi = this.longNumber * 2 * Math.PI / this.longitudeBands;
      var spaceCoordinates=[XCOORD,YCOORD,ZCOORD];
      for (index in spaceCoordinates){
        var coordinateValue=this.getCoordinateValue(spaceCoordinates[index],phi,sinTheta,cosTheta);
        this.normal_buffer.push(coordinateValue);
        this.position_buffer.push(coordinateValue);
      }
    }
    this.loadTextureCoordBuffer=function(){
      var u = 1.0 - (this.longNumber / this.longitudeBands);
      var v = 1.0 - (this.latNumber / this.latitudeBands);
      this.texture_coord_buffer.push(u);
      this.texture_coord_buffer.push(v);
      //Coordenada del material
      this.texture_coord_buffer.push(1);
      this.texture_coord_buffer.push(0);
    }
    this.loadCoordinatesInPositionNormalAndTextureBuffers=function(){
      for (this.latNumber=0; this.latNumber <= this.latitudeBands; this.latNumber++) {
          var theta = this.latNumber * Math.PI / this.latitudeBands;
          var sinTheta = Math.sin(theta);
          var cosTheta = Math.cos(theta);
          for (this.longNumber=0; this.longNumber <= this.longitudeBands; this.longNumber++) {
              this.loadPositionAndNormalBuffer(sinTheta,cosTheta);
              this.loadTextureCoordBuffer();
          }
      }
    }
    // Buffer de indices de los triangulos

    this.loadIndexBuffer=function(){
      for (this.latNumber=0; this.latNumber < this.latitudeBands; this.latNumber++) {
          for (this.longNumber=0; this.longNumber < this.longitudeBands; this.longNumber++) {
              var first = (this.latNumber * (this.longitudeBands + 1)) + this.longNumber;
              var second = first + this.longitudeBands + 1;
              this.index_buffer.push(first);
              this.index_buffer.push(second);
              this.index_buffer.push(first + 1);

              this.index_buffer.push(second);
              this.index_buffer.push(second + 1);
              this.index_buffer.push(first + 1);
          }
      }
    }
    // Se generan los vertices para la esfera, calculando los datos para una esfera de radio 1
    // Y tambi�n la informaci�n de las normales y coordenadas de textura para cada vertice de la esfera
    // La esfera se renderizara utilizando triangulos, para ello se arma un buffer de �ndices
    // a todos los tri�ngulos de la esfera
    this.initBuffers = function(){
        this.loadCoordinatesInPositionNormalAndTextureBuffers();
        this.loadIndexBuffer();


        // Creaci�n e Inicializaci�n de los buffers a nivel de OpenGL
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

    this.draw = function(modelMatrix){

        // Se configuran los buffers que alimentar�n el pipeline
        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, this.webgl_position_buffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_texture_coord_buffer);
        gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, this.webgl_texture_coord_buffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
        gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, this.webgl_normal_buffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.uniform1i(shaderProgram.samplerUniform, 0);

        gl.uniformMatrix4fv(shaderProgram.ModelMatrixUniform, false, modelMatrix);
        var normalMatrix = mat3.create();
        mat3.fromMat4(normalMatrix, modelMatrix);
        mat3.invert(normalMatrix, normalMatrix);
        mat3.transpose(normalMatrix, normalMatrix);
        gl.uniformMatrix3fv(shaderProgram.nMatrixUniform, false, normalMatrix);

        gl.bindTexture(gl.TEXTURE_2D, this.texture);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);
        //gl.drawElements(gl.LINE_LOOP, this.webgl_index_buffer.numItems, gl.UNSIGNED_SHORT, 0);
        gl.drawElements(gl.TRIANGLES, this.webgl_index_buffer.numItems, gl.UNSIGNED_SHORT, 0);
        /////////////////////////////////
    }

}
