function composedSceneObject(){
  this.components=[];
}
composedSceneObject.prototype.draw = function(modelMatrix){
  for(idxComponent in this.components){
    this.components[idxComponent].draw(modelMatrix);
  }
}
composedSceneObject.prototype.initTexture=function(){
  for(idxComponent in this.components){
    this.components[idxComponent].initTexture(IMGMARSPATH);
  }
}
composedSceneObject.prototype.generateMipMap=function (){
  for(idxComponent in this.components){
    this.components[idxComponent].generateMipMap();
  }
}
composedSceneObject.prototype.push=function(sceneObject){
  this.components.push(sceneObject);
}
composedSceneObject.prototype.getChild=function(pos){
  return this.components[pos];
}
