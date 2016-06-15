Persecucion.prototype=new CamaraNave;
Persecucion.prototype.constructor=Persecucion;
function Persecucion(canvas){
  CamaraNave.call(this,canvas);
}
Persecucion.prototype.obtenerPosicionInicial=function(esPosicionOjo){
  return ((esPosicionOjo)?(vec4.fromValues(0,2,50,1)):(vec4.fromValues(0,2,0,1)));
}
