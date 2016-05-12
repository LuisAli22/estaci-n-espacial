function FabricaCilindrosAntenaEstacionEspacial(){}
FabricaCilindrosAntenaEstacionEspacial.prototype.crear=function(posicion){
  console.log("Crear cilindros de la antena estacion espacial");

  var cilindro = new Cilindro(64,64,DORADO,0);
  var CilindrosAntenaEstacionEspacialDecorado= new CilindrosAntenaEstacionEspacial(cilindro);

  if (posicion == ARRIBA){
  	this.cargarFactorTraslacion(CilindrosAntenaEstacionEspacialDecorado,1.0);
  }else if (posicion == ABAJO){
	this.cargarFactorTraslacion(CilindrosAntenaEstacionEspacialDecorado,-1.0);
  }

  return CilindrosAntenaEstacionEspacialDecorado;
}
FabricaCilindrosAntenaEstacionEspacial.prototype.cargarFactorTraslacion=function(cilindrosEjes,factor){
  
  for (var i = 0.0; i < 4.0; i++) {
  	var traslacion = factor * (1.0 + i);
  	cilindrosEjes.cargarFactorTraslacion(traslacion);
  };

}