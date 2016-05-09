ComponenteEstacionEspacial.prototype=new ObjetoGrafico;
ComponenteEstacionEspacial.prototype.constructor=ComponenteEstacionEspacial;
function ComponenteEstacionEspacial(rows,cols,material){
	this.material=material
	this.rows=rows;
	this.cols=cols;
	this.position_buffer = [];
    this.normal_buffer = [];
    this.texture_coord_buffer =[];
    this.index_buffer = [];
		this.indices=(this.rows-1) * (2*this.cols);
		this.sumador=1;
		//ObjetoGrafico.call(this);
}
ComponenteEstacionEspacial.prototype.esMultiploDeDosVecesLaCantidadDeColumnas=function(pos){
	return ( pos % (2*this.cols) == 0 );
}
ComponenteEstacionEspacial.prototype.esImpar=function(pos){
	return ( pos % 2 != 0 );
}
ComponenteEstacionEspacial.prototype.asignarValorAIndexBufferEnUnaPosicionDistintaADosVecesCantidadColumnas=function(pos){
	if (this.esImpar(pos)){
			this.index_buffer.push(this.index_buffer[pos-1] + this.cols);
	}else{
			this.index_buffer.push(this.index_buffer[pos-2] + this.sumador );
	}
}
ComponenteEstacionEspacial.prototype.agregarUnValorAIndexBuffer=function(pos){
	if (this.esMultiploDeDosVecesLaCantidadDeColumnas(pos)){
			this.index_buffer.push(this.index_buffer[pos-1]);
			this.sumador = this.sumador * -1;
	}else this.asignarValorAIndexBufferEnUnaPosicionDistintaADosVecesCantidadColumnas(pos);

}
ComponenteEstacionEspacial.prototype.crearBufferDeIndices=function(){
    this.index_buffer.push(0);
    for (var i = 1;i<this.indices;i++) {
			this.agregarUnValorAIndexBuffer(i);
    }
}
ComponenteEstacionEspacial.prototype.aceptar=function(visitante){
	visitante.visitarComponenteEstacionEspacial(this);
}
