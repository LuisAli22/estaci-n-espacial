function shaderScript(id){
  console.log("Constructor de shaderScript");
  this.script=document.getElementById(id);
  console.log("Si no puede obtener un script con el id "+id+" a continuacion va a tirar un Error");
  if (!this.script) throw new Error(MENSAJEERRORSHADER+": "+id);
  console.log("Si el script no es de tipo"+ XSHADERXFRAGMENT+" ni de tipo"+XSHADERXVERTEX+" va a tirar un error");
  if (this.noEsXFragmentYNoEsXVertex()) throw new Error(TIPODESCRIPTINCORRECTO);
  this.textContent=this.obtenerElConentidoDeTexto();
  this.shader=(this.esDeTipoXFragment())?
              (gl.createShader(gl.FRAGMENT_SHADER)):
              (gl.createShader(gl.VERTEX_SHADER));
  console.log("Sale del constructor de shaderScript");
}
shaderScript.prototype.noEsXFragmentYNoEsXVertex=function(){
  return (!this.esDeTipoXFragment()&&!this.esDeTipoXVertex());
}
shaderScript.prototype.esDeTipoXFragment=function(){
  return (this.script.type == XSHADERXFRAGMENT);
}
shaderScript.prototype.esDeTipoXVertex=function(){
  return (this.script.type == XSHADERXVERTEX);
}
shaderScript.prototype.esNodoTipoTexto=function(nodo){
  return (nodo.nodeType == 3);
}
shaderScript.prototype.obtenerElConentidoDeTexto=function (){
  console.log("calculateTextContent busca el texto del script del shader, buscando entre sus hijos al nodo que tiene el texto");
  var str = "";
  var k = this.script.firstChild;
  while (k) {
      if (this.esNodoTipoTexto(k)) {
        console.log("El nodo es un nodo de texto");
          str += k.textContent;
          console.log("Str: "+str);
      }
      k = k.nextSibling;
  }
  return str;
}
shaderScript.prototype.obtenerShaderCompilado=function(){
  gl.shaderSource(this.shader, this.textContent);
  gl.compileShader(this.shader);
  if (!gl.getShaderParameter(this.shader, gl.COMPILE_STATUS))
      throw new Error(gl.getShaderInfoLog(this.shader));
  return this.shader;
}
