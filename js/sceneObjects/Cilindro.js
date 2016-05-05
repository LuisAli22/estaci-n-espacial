Cilindro.prototype=new sceneObject;
Cilindro.prototype.constructor=Cilindro;
function Cilindro(latitude_bands, longitude_bands,_material){
  
  this.HEIGHTCYLINDER = 1.0;

  this.latitudeBands = latitude_bands;
  this.longitudeBands = longitude_bands;
  this.material = _material;
  this.latNumber=0;
  this.longNumber=0;
  this.position_buffer=[];
  this.normal_buffer=[];
  this.texture_coord_buffer=[];
  this.index_buffer=[];
  this.initBuffers();
}

Cilindro.prototype.loadPositionAndNormalBuffer=function(height){
  var phi = this.longNumber * 2 * Math.PI / this.longitudeBands;
  var x = Math.cos(phi);
  var y = Math.sin(phi);
  var z = height;

  this.normal_buffer.push(x);
  this.normal_buffer.push(y);
  this.normal_buffer.push(z);

  this.position_buffer.push(x);
  this.position_buffer.push(y);
  this.position_buffer.push(z);

}

Cilindro.prototype.loadTextureCoordBuffer=function(){
  var u = 1.0 - (this.longNumber / this.longitudeBands);
  var v = 1.0 - (this.latNumber / this.latitudeBands);
  this.texture_coord_buffer.push(u);
  this.texture_coord_buffer.push(v);
  //Coordenada del material
  this.texture_coord_buffer.push(this.material);
  this.texture_coord_buffer.push(0);
}

Cilindro.prototype.loadCover=function(height){

  for (var i = 0; i <= this.longitudeBands; i++) {
    this.normal_buffer.push(0.0);
    this.normal_buffer.push(0.0);
    this.normal_buffer.push(height);

    this.position_buffer.push(0.0);
    this.position_buffer.push(0.0);
    this.position_buffer.push(height);
    this.loadTextureCoordBuffer();

  };

}

Cilindro.prototype.loadCoordinatesInPositionNormalAndTextureBuffers=function(){
  this.loadCover(this.HEIGHTCYLINDER/2);
  for (this.latNumber=0; this.latNumber < this.latitudeBands-1; this.latNumber++) {
      var height = this.HEIGHTCYLINDER/2 - this.latNumber * this.HEIGHTCYLINDER / (this.latitudeBands-2);
      for (this.longNumber=0; this.longNumber <= this.longitudeBands; this.longNumber++) {
          this.loadPositionAndNormalBuffer(height);
          this.loadTextureCoordBuffer();
      }
  }
  this.loadCover(-this.HEIGHTCYLINDER/2);
}
// Buffer de indices de los triangulos

Cilindro.prototype.loadIndexBuffer=function(){
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

Cilindro.prototype.initBuffers=function(){
  this.loadCoordinatesInPositionNormalAndTextureBuffers();
  this.loadIndexBuffer();
  this.bindBuffers(this.position_buffer,this.normal_buffer,this.texture_coord_buffer,this.index_buffer);
}