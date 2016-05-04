/*function inheritPrototype(childObject, parentObject) {

    var copyOfParent = Object.create(parentObject.prototype);
    copyOfParent.constructor = childObject;

    childObject.prototype = copyOfParent;   // finalmente este es el nuevo prototype del hijo

}*/
DrawObject.prototype=new SceneObject;
DrawObject.prototype.constructor=DrawObject;
function DrawObject(){

	this.rows;
	this.cols;

	this.position_buffer = null;
    this.normal_buffer = null;
    this.texture_coord_buffer = null;
    this.index_buffer = null;

  
    this.indices;

}


DrawObject.prototype.setDimensions=function(_rows,_cols){
     this.rows = _rows;
     this.cols = _cols;

     this.indices = (this.rows-1) * (2*this.cols);
}

DrawObject.prototype.getIndices=function(){
	return this.indices;
}

DrawObject.prototype.createIndexBuffer=function(){

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
