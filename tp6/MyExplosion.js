/**
 * MyExplosion
 * 
 * @constructor
 */
var degToRad = Math.PI / 180.0;

function MyExplosion(scene, timeOfAni){
	CGFobject.call(this,scene);
	this.timeAnimation = timeOfAni;
	this.timeTotal = timeOfAni;
	this.localExp = [0,0,0];
	this.cube = new MyUnitCubeQuad(scene);
}

MyExplosion.prototype = Object.create(CGFobject.prototype);
MyExplosion.prototype.constructor=MyExplosion;


MyExplosion.prototype.display = function () {
	if(this.timeAnimation <= 0 || this.timeTotal == this.timeAnimation)
		return;

   this.scene.pushMatrix();
   this.scene.scale(10,10,10);
   this.scene.translate(this.localExp[0],this.localExp[1],this.localExp[2]);
   this.cube.display();
   this.scene.popMatrix();
};


MyExplosion.prototype.update = function(delta){
	this.timeAnimation -= delta/1000;
};