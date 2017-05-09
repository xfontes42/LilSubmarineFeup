/*
 * MyTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTable(scene) {
	CGFobject.call(this,scene);
	this.leg1 = new MyTableLeg(this.scene);
	this.leg2 = new MyTableLeg(this.scene);
	this.leg3 = new MyTableLeg(this.scene);
	this.leg4 = new MyTableLeg(this.scene);
	this.tampo = new MyUnitCubeQuad(this.scene);
};

MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor=MyTable;


MyTable.prototype.display = function(){

		this.scene.pushMatrix();
	this.scene.translate(0,3.6,0);
	this.scene.scale(5,0.3,3);
	//this.scene.materialTampo.apply();
    this.tampo.display();
	this.scene.popMatrix();   //tampo

	this.scene.pushMatrix();
	this.scene.translate(2.3,0.1,1.3);
	this.scene.materialPernas.apply();
    this.leg1.display();
	this.scene.popMatrix();   //perna1
    
	this.scene.pushMatrix();
	this.scene.translate(-2.3,0.1,1.3);
    this.leg1.display();
	this.scene.popMatrix();   //perna2
    
	this.scene.pushMatrix();
	this.scene.translate(-2.3,0.1,-1.3);
    this.leg2.display();
	this.scene.popMatrix();   //perna3
    
	this.scene.pushMatrix();
	this.scene.translate(2.3,0.1,-1.3);
    this.leg1.display();
	this.scene.popMatrix();   //perna4


};