function Compilador(id){
  this.script=document.getElementById(id);
  if (!this.script) throw new Error(MENSAJEERRORSHADER+": "+id);
  if (this.noEsXFragmentYNoEsXVertex()) throw new Error(TIPODESCRIPTINCORRECTO);
  this.textContent=this.obtenerElCodigoFuente();
  this.shaderObjectReference=(this.esDeTipoXFragment())?
              (gl.createShader(gl.FRAGMENT_SHADER)):
              (gl.createShader(gl.VERTEX_SHADER));
}
Compilador.prototype.noEsXFragmentYNoEsXVertex=function(){
  return (!this.esDeTipoXFragment()&&!this.esDeTipoXVertex());
}
Compilador.prototype.esDeTipoXFragment=function(){
  return (this.script.type == XSHADERXFRAGMENT);
}
Compilador.prototype.esDeTipoXVertex=function(){
  return (this.script.type == XSHADERXVERTEX);
}
Compilador.prototype.esNodoTipoTexto=function(nodo){
  return (nodo.nodeType == 3);
}
Compilador.prototype.obtenerElCodigoFuente=function (){
  var str = "";
  var k = this.script.firstChild;
  while (k) {
      if (this.esNodoTipoTexto(k)) {
          str += k.textContent;
      }
      k = k.nextSibling;
  }
  return str;
}
Compilador.prototype.arrancar=function(){
  gl.shaderSource(this.shaderObjectReference, this.textContent);
  gl.compileShader(this.shaderObjectReference);
  if (!gl.getShaderParameter(this.shaderObjectReference, gl.COMPILE_STATUS))
      throw new Error(gl.getShaderInfoLog(this.shaderObjectReference));
  return this.shaderObjectReference;
}
