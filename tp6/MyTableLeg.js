/*
 * MyTableLeg
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTableLeg(scene) {
	CGFobject.call(this,scene);
	this.ucube = new MyUnitCubeQuad(this.scene);
};

MyTableLeg.prototype = Object.create(CGFobject.prototype);
MyTableLeg.prototype.constructor=MyTableLeg;


MyTableLeg.prototype.display = function(){
	this.scene.pushMatrix();
	this.scene.translate(0,1.75,0);
	this.scene.scale(0.3,3.5,0.3);
	this.ucube.display();
	this.scene.popMatrix();
};