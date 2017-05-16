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
	this.numberOfCubes = scene.numberOfCubes || 100;
	this.velocidades = [];
	this.init();
	this.cube = new MyUnitCubeQuad(scene);
}

MyExplosion.prototype = Object.create(CGFobject.prototype);
MyExplosion.prototype.constructor=MyExplosion;


MyExplosion.prototype.display = function () {
	if(this.timeAnimation <= 0 || this.timeTotal == this.timeAnimation)
		return;

	//ja esta no lugar que é preciso!!

//    this.scene.pushMatrix();
//    //this.scene.translate(this.localExp[0],this.localExp[1],this.localExp[2]);
//    this.scene.scale(10/(this.timeAnimation+1),10/(this.timeAnimation+1),10/(this.timeAnimation+1));
//    this.scene.translate(0,0.5,0);
//    this.cube.display();
//    this.scene.popMatrix();

		this.scene.materialDefault.apply();

		for(var i = 0; i < this.numberOfCubes; i++){
			this.scene.pushMatrix();
   			this.scene.translate(this.velocidades[i*3]*(this.timeTotal-this.timeAnimation),
  								 this.velocidades[i*3+1]*(this.timeTotal-this.timeAnimation),
  								 this.velocidades[i*3+2]*(this.timeTotal-this.timeAnimation));
  			this.scene.translate(0,0.5,0);
  			this.scene.materialA.apply();
   			this.cube.display();
   			this.scene.popMatrix();
		}

		this.scene.materialDefault.apply();
};


MyExplosion.prototype.update = function(delta){
	this.timeAnimation -= delta/1000;
};

MyExplosion.prototype.reset = function(){
	this.numberOfCubes = this.scene.numberOfCubes;
	this.timeAnimation = this.timeTotal;
	this.localExp = [0,0,0];
	this.init();
};

MyExplosion.prototype.init = function(){
	this.velocidades = [];
	for(var i = 0; i < this.numberOfCubes; i++){
		this.velocidades.push(6*Math.cos(i/this.numberOfCubes*Math.PI*2),5*Math.cos(Math.random()*Math.PI),6*Math.sin(i/this.numberOfCubes*Math.PI*2));
	}

};