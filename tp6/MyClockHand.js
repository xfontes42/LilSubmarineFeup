/**
 * MyClockHand
 * @constructor
 */
 
var degToRad = Math.PI / 180.0;

 function MyClockHand(scene, comprimento, largura) {
 	CGFobject.call(this,scene);
	this.angle = 0;
	this.largura = largura || 0.03125;
	this.comprimento = comprimento || 1;
 	this.initBuffers();
 };

 MyClockHand.prototype = Object.create(CGFobject.prototype);
 MyClockHand.prototype.constructor = MyClockHand;

 MyClockHand.prototype.initBuffers = function() {
 


	this.vertices = [];
	this.normals = [];
	this.indices = [];

	this.vertices = [
            -this.largura, 0, 0,
           this.largura, 0, 0,
            -this.largura, this.comprimento, 0,
           this.largura, this.comprimento, 0,
			];

	this.indices = [
            0, 1, 2, 
			3, 2, 1
        ];

	this.normals = [
		0,0,1,
		0,0,1,
		0,0,1,
		0,0,1

	];

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };

 MyClockHand.prototype.display = function() {
 	this.scene.pushMatrix();
 	this.scene.rotate(-this.angle*degToRad,0,0,1);
 	CGFobject.prototype.display.call(this);
 	this.scene.popMatrix();
 };


 MyClockHand.prototype.setAngle = function(angle1) {
 	this.angle = angle1;

 };