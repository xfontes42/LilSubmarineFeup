/**
 * MyTorpedo
 * 
 * @constructor
 */

var degToRad = Math.PI / 180.0;

function MyTorpedo(scene){
	CGFobject.call(this,scene);
	
	this.corpo = new MyCylinder(scene,30,10);
	this.front = new MySemiSphere(scene,30,300);
	this.back = new MySemiSphere(scene,30,300);
	this.myBackFinVert = new MyTrapezoid(scene);
	this.myBackFinHori = new MyTrapezoid(scene);
	this.hide = true;
	this.rotation = 0;
	this.inclinacao = 0;
	this.posX = 0;
	this.posZ = 0;
	this.posY = 0;
	this.dist = 0;
	this.timeAt = 0;
	this.linearDistance = 0;
	this.targetLocation = [];
	this.origin = [];
	this.point2 = [];
	this.point3 = [];
};

MyTorpedo.prototype = Object.create(CGFobject.prototype);
MyTorpedo.prototype.constructor=MyTorpedo;


MyTorpedo.prototype.display = function () {
    if(this.hide)
        return;
    //corpo
	this.scene.pushMatrix();
	this.scene.translate(0,0,-1.15);
	this.scene.scale(0.15*1,0.15*1,0.15*7);
	this.corpo.display();
	this.scene.popMatrix();

	//frente
	this.scene.pushMatrix();
	this.scene.translate(0,0,0.005);
	this.scene.scale(0.15,0.15,0.15);
	this.scene.TorpedoFace.apply();
	this.front.display();
	this.scene.submarineAppearances[this.scene.currSubmarineAppearance].apply();
	this.scene.popMatrix();

	//tras
	this.scene.pushMatrix();
	this.scene.translate(0,0,-1.15);
	this.scene.scale(0.15,0.15,0.15);
	this.scene.rotate(Math.PI,0,1,0);
	this.back.display();
	this.scene.popMatrix();

	//vertical back fin
	this.scene.pushMatrix();
	this.scene.translate(0,0,-1.17);
	this.scene.scale(0.15*0.3,0.15*0.7,0.15*0.35);
    this.myBackFinVert.display();
	this.scene.popMatrix();

	//horizontal back fin
	this.scene.pushMatrix();
	this.scene.translate(0,0,-1.17);
	this.scene.rotate(-0.5*Math.PI,0,0,1);
	this.scene.scale(0.15*0.3,0.15*0.7,0.15*0.35);
    this.myBackFinHori.display();
	this.scene.popMatrix();


};

