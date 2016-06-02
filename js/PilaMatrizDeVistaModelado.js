function PilaMatrizDeVistaModelado(){
  this.pilaMatrizMv = [];
}
PilaMatrizDeVistaModelado.prototype.meter=function() {
    var copiaMatrizMv = mat4.clone(mvMatrix);
    this.pilaMatrizMv.push(copiaMatrizMv);
}

PilaMatrizDeVistaModelado.prototype.sacar=function() {
    if (this.pilaMatrizMv.length == 0) {
        throw "Invalid popMatrix!";
    }
    mvMatrix = this.pilaMatrizMv.pop();
}
