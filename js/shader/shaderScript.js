function shaderScript(gl,id){
  console.log("Constructor de shaderScript");
  this.script=document.getElementById(id);
  this.gl=gl;
  this.isNotXFragmentAndNotXVertex=function(){
    return (!this.isTypeXFragment()&&!this.isTypeXVertex());
  }
  this.isTypeXFragment=function(){
    return (this.script.type == XSHADERXFRAGMENT);
  }
  this.isTypeXVertex=function(){
    return (this.script.type == XSHADERXVERTEX);
  }
  this.isNodeTypeText=function(node){
    return (node.nodeType == 3);
  }
  this.calculateTextContent=function (){
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
  this.getCompiledShader=function(){
    this.gl.shaderSource(this.shader, this.textContent);
    this.gl.compileShader(this.shader);
    if (!this.gl.getShaderParameter(this.shader, this.gl.COMPILE_STATUS))
        throw new Error(this.gl.getShaderInfoLog(this.shader));
    return this.shader;
  }
  console.log("Si no puede obtener un script con el id "+id+" a continuacion va a tirar un Error");
  if (!this.script) throw new Error(SHADERERRORMESSAGE+": "+id);
  console.log("Si el script no es de tipo"+ XSHADERXFRAGMENT+" ni de tipo"+XSHADERXVERTEX+" va a tirar un error");
  if (this.isNotXFragmentAndNotXVertex()) throw new Error(SCRIPTTYPEINCORRECT);
  this.textContent=this.calculateTextContent();
  this.shader=(this.isTypeXFragment())?
              (this.gl.createShader(this.gl.FRAGMENT_SHADER)):
              (this.gl.createShader(this.gl.VERTEX_SHADER));
  console.log("Sale del constructor de shaderScript");
}
