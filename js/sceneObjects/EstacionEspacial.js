function EstacionEspacial(){

	this.interiorEstacionEspacial = null;
	this.exteriorEstacionEspacial = null;
    this.tapaInicial = null;
    this.tapaFinal = null;

	this.initBuffers = function(){

		this.interiorEstacionEspacial = new InteriorEstacionEspacial();
		this.exteriorEstacionEspacial = new ExteriorEstacionEspacial();

        this.interiorEstacionEspacial.initBuffers();
        this.exteriorEstacionEspacial.initBuffers();

        this.tapaInicial = new TapaEstacionEspacial(this.exteriorEstacionEspacial.bufferInicial,this.interiorEstacionEspacial.bufferInicial);
        this.tapaFinal = new TapaEstacionEspacial(this.exteriorEstacionEspacial.bufferFinal,this.interiorEstacionEspacial.bufferFinal);

        this.tapaInicial.initBuffers();
        this.tapaFinal.initBuffers();

    }

    this.draw = function(modelMatrix){
        
        drawElement(this.interiorEstacionEspacial,modelMatrix);
        drawElement(this.exteriorEstacionEspacial,modelMatrix);
        drawElement(this.tapaInicial,modelMatrix);
        drawElement(this.tapaFinal,modelMatrix);

    }

    function drawElement(element,modelMatrix){

        gl.bindBuffer(gl.ARRAY_BUFFER, element.webgl_position_buffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, element.webgl_position_buffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, element.webgl_texture_coord_buffer);
        gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, element.webgl_texture_coord_buffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, element.webgl_normal_buffer);
        gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, element.webgl_normal_buffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, element.texture);
        gl.uniform1i(shaderProgram.samplerUniform, 0);

        gl.uniformMatrix4fv(shaderProgram.ModelMatrixUniform, false, modelMatrix);
        var normalMatrix = mat3.create();
        mat3.fromMat4(normalMatrix, modelMatrix);
        mat3.invert(normalMatrix, normalMatrix);
        mat3.transpose(normalMatrix, normalMatrix);
        gl.uniformMatrix3fv(shaderProgram.nMatrixUniform, false, normalMatrix);

        gl.bindTexture(gl.TEXTURE_2D, element.texture);
        
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, element.webgl_index_buffer);
        //gl.drawElements(gl.LINE_LOOP, this.webgl_index_buffer.numItems, gl.UNSIGNED_SHORT, 0);
        var indices = 59 * 120;

        gl.drawElements(gl.TRIANGLE_STRIP, element.getIndices(), gl.UNSIGNED_SHORT, 0);

    }

}