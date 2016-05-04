ComponenteEstacionEspacial.prototype=new sceneObject;
ComponenteEstacionEspacial.prototype.constructor=ComponenteEstacionEspacial;
function ComponenteEstacionEspacial(rows,cols){

	this.rows=rows;
	this.cols=cols;

	this.position_buffer = null;
    this.normal_buffer = null;
    this.texture_coord_buffer = null;
    this.index_buffer = null;


    this.indices=(this.rows-1) * (2*this.cols);

}

/*
ComponenteEstacionEspacial.prototype.setDimensions=function(_rows,_cols){
     this.rows = _rows;
     this.cols = _cols;

     this.indices = (this.rows-1) * (2*this.cols);
}*/

/*ComponenteEstacionEspacial.prototype.getIndices=function(){
	return this.indices;
}*/

ComponenteEstacionEspacial.prototype.createIndexBuffer=function(){

    this.index_buffer = [];
    this.index_buffer.push(0);
    var sumador = 1;

    for (var i = 1;i<this.indices;i++) {

        if ( i % (2*this.cols) == 0 ){

            this.index_buffer.push(this.index_buffer[i-1]);
            sumador = sumador * -1;


        }else if ( i % 2 != 0 ){

            this.index_buffer.push(this.index_buffer[i-1] + this.cols);

        }else{

            this.index_buffer.push(this.index_buffer[i-2] + sumador );

        }

    }

}
