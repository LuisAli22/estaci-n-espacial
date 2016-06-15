Cabina.prototype=new CamaraNave;
Cabina.prototype.constructor=Cabina;
function Cabina(canvas){
  CamaraNave.call(this,canvas);
}
Cabina.prototype.obtenerPosicionInicial=function(esPosicionOjo){
  return ((esPosicionOjo)?(vec4.fromValues(0,2,3,1)):(vec4.fromValues(0,2,0,1)));
}
