TexturedSphere.prototype=new sceneObject;
TexturedSphere.prototype.constructor=TexturedSphere;
function TexturedSphere(latitude_bands, longitude_bands,_material){
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

TexturedSphere.prototype.getCoordinateValue=function(coordinate,phi,sinTheta,cosTheta){
  var sinPhi = Math.sin(phi);
  var cosPhi = Math.cos(phi);

  return (coordinate==XCOORD)?
        (cosPhi * sinTheta):
        ((coordinate==YCOORD)?
          (cosTheta):
          (sinPhi * sinTheta));
}
TexturedSphere.prototype.loadPositionAndNormalBuffer=function(sinTheta,cosTheta){
  var phi = this.longNumber * 2 * Math.PI / this.longitudeBands;
  var spaceCoordinates=[XCOORD,YCOORD,ZCOORD];
  for (index in spaceCoordinates){
    var coordinateValue=this.getCoordinateValue(spaceCoordinates[index],phi,sinTheta,cosTheta);
    this.normal_buffer.push(coordinateValue);
    this.position_buffer.push(coordinateValue);
  }
}
TexturedSphere.prototype.loadTextureCoordBuffer=function(){
  var u = 1.0 - (this.longNumber / this.longitudeBands);
  var v = 1.0 - (this.latNumber / this.latitudeBands);
  this.texture_coord_buffer.push(u);
  this.texture_coord_buffer.push(v);
  //Coordenada del material
  this.texture_coord_buffer.push(this.material);
  this.texture_coord_buffer.push(0);
}
TexturedSphere.prototype.loadCoordinatesInPositionNormalAndTextureBuffers=function(){
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

TexturedSphere.prototype.loadIndexBuffer=function(){
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

TexturedSphere.prototype.initBuffers=function(){
  this.loadCoordinatesInPositionNormalAndTextureBuffers();
  this.loadIndexBuffer();
  this.bindBuffers(this.position_buffer,this.normal_buffer,this.texture_coord_buffer,this.index_buffer);
}
