PrimerPersonaBahiaDeCarga.prototype= new Camara;
PrimerPersonaBahiaDeCarga.prototype.constructor=PrimerPersonaBahiaDeCarga;
function PrimerPersonaBahiaDeCarga(canvas,posicionDelOjo){
  Camara.call(this, canvas, 0, 0, 0);
	this.ojo =posicionDelOjo;
	//this.target = vec3.add([], avatarPOV.position, avatarPOV.tangent);
}
PrimerPersonaBahiaDeCarga.prototype.asignarPosicion = function(posicionDelOjo) {
  this.ojo =posicionDelOjo;

	/*var rotationMatrix = mat4.create();
	mat4.rotate(rotationMatrix, rotationMatrix, -this.azimuthAngle, [0, 1, 0]);
	var dir = vec3.transformMat4([], avatarPOV.tangent, rotationMatrix);
	var rotationAxis = vec3.cross([], dir, [0, 1, 0]);
	mat4.identity(rotationMatrix);
	mat4.rotate(rotationMatrix, rotationMatrix, -this.polarAngle, rotationAxis);
	vec3.transformMat4(dir, dir, rotationMatrix);

	this.target = vec3.add([], avatarPOV.position, dir);*/
};

PrimerPersonaBahiaDeCarga.prototype.onMouseDown = function(event){
	/*if (event.which == this.LEFT_BUTTON) {
		this.pressingLeft = true;

		//Obtengo la posiciÃ³n
		var x = event.clientX - this.canvas.offsetLeft;
  		var y = event.clientY - this.canvas.offsetTop;
  		this.startPosition = [x, y];
	}*/
};

PrimerPersonaBahiaDeCarga.prototype.onMouseUp = function(event){
	//if (event.which == this.LEFT_BUTTON) this.pressingLeft = false;
};
