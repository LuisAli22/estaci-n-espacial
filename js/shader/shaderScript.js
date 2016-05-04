function shaderScript(id){
  console.log("Constructor de shaderScript");
  this.script=document.getElementById(id);
  console.log("Si no puede obtener un script con el id "+id+" a continuacion va a tirar un Error");
  if (!this.script) throw new Error(SHADERERRORMESSAGE+": "+id);
  console.log("Si el script no es de tipo"+ XSHADERXFRAGMENT+" ni de tipo"+XSHADERXVERTEX+" va a tirar un error");
  if (this.isNotXFragmentAndNotXVertex()) throw new Error(SCRIPTTYPEINCORRECT);
  this.textContent=this.calculateTextContent();
  this.shader=(this.isTypeXFragment())?
              (gl.createShader(gl.FRAGMENT_SHADER)):
              (gl.createShader(gl.VERTEX_SHADER));
  console.log("Sale del constructor de shaderScript");
}
shaderScript.prototype.isNotXFragmentAndNotXVertex=function(){
  return (!this.isTypeXFragment()&&!this.isTypeXVertex());
}
shaderScript.prototype.isTypeXFragment=function(){
  return (this.script.type == XSHADERXFRAGMENT);
}
shaderScript.prototype.isTypeXVertex=function(){
  return (this.script.type == XSHADERXVERTEX);
}
shaderScript.prototype.isNodeTypeText=function(node){
  return (node.nodeType == 3);
}
shaderScript.prototype.calculateTextContent=function (){
  console.log("calculateTextContent busca el texto del script del shader, buscando entre sus hijos al nodo que tiene el texto");
  var str = "";
  var k = this.script.firstChild;
  while (k) {
      if (this.isNodeTypeText(k)) {
        console.log("El nodo es un nodo de texto");
          str += k.textContent;
          console.log("Str: "+str);
      }
      k = k.nextSibling;
  }
  return str;
}
shaderScript.prototype.getCompiledShader=function(){
  gl.shaderSource(this.shader, this.textContent);
  gl.compileShader(this.shader);
  if (!gl.getShaderParameter(this.shader, gl.COMPILE_STATUS))
      throw new Error(gl.getShaderInfoLog(this.shader));
  return this.shader;
}
