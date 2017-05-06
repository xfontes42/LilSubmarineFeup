/**
 * MyTurbine
 * @constructor
 */

function MyTurbine(scene, veloAngular ,minS, maxS,minT, maxT){
	CGFobject.call(this,scene);
	this.minS = minS || 0;
	this.minT = minT || 0;
	this.maxS = maxS || 1;
	this.maxT = maxT || 1;
    this.scene = scene;
    this.velocidadeAng = veloAngular;
    this.Angulo = 0;
	this.cylinder = new MyCylinder(scene,30,10);
	this.fan = new MyUnitCubeQuad(scene);
    this.semisphere = new MySemiSphere(scene,30,200);
};

MyTurbine.prototype = Object.create(CGFobject.prototype);
MyTurbine.prototype.constructor=MyTurbine;


MyTurbine.prototype.display = function(){
	
  this.scene.pushMatrix();
  this.scene.translate(0,0,-0.55);
  this.scene.scale(1,1,0.8);
  this.cylinder.display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.rotate(this.Angulo,0,0,1);
  this.scene.scale(0.5,1.6,0.2);
  this.fan.display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.scale(0.25,0.25,0.5);
  this.scene.FaceApp.apply();
	this.semisphere.display();
	this.scene.submarineAppearances[this.scene.currSubmarineAppearance].apply();
  
  this.scene.popMatrix();
};

MyTurbine.prototype.update = function(delta){
	 this.Angulo += this.velocidadeAng*(delta/1000)*2*Math.PI;
};