/**
 * MySubmarineModel
 * 
 * @constructor
 */

var degToRad = Math.PI / 180.0;

function MySubmarineModel(scene) {
	CGFobject.call(this, scene);

	this.corpo = new MyCylinder(scene, 30, 10);
	this.front = new MySemiSphere(scene, 30, 300);
	this.back = new MySemiSphere(scene, 30, 300);
	this.top = new MyCylinder(scene, 30, 10);
	this.topCircle = new MyCircle(scene, 30);
	this.myBackFinVert = new MyTrapezoid(scene);
	this.myBackFinHori = new MyTrapezoid(scene);
	this.myTopFin = new MyTrapezoid(scene);
	this.periscope = new MyPeriscope(scene);
	this.deltaPeriscope = 0;
	this.turbineLeft = new MyTurbine(scene, 0);
	this.turbineRight = new MyTurbine(scene, 0);
	this.lemes = 0;
	this.inclinacao = 0;
};

MySubmarineModel.prototype = Object.create(CGFobject.prototype);
MySubmarineModel.prototype.constructor = MySubmarineModel;


MySubmarineModel.prototype.display = function () {

	//corpo
	this.scene.pushMatrix();
	this.scene.translate(0, 0, -2);
	this.scene.scale(0.7, 1, 4.1);
	this.corpo.display();
	this.scene.popMatrix();

	//frente
	this.scene.pushMatrix();
	this.scene.translate(0, 0, 2.5);
	this.scene.scale(0.7, 1, 0.5);
	this.scene.FaceApp.apply();
	this.front.display();
	this.scene.submarineAppearances[this.scene.currSubmarineAppearance].apply();
	this.scene.popMatrix();

	//tras
	this.scene.pushMatrix();
	this.scene.translate(0, 0, -2);
	this.scene.scale(0.7, 1, 0.5);
	this.scene.rotate(Math.PI, 0, 1, 0);
	this.back.display();
	this.scene.popMatrix();

	//topo (cilindro e circulo)
	this.scene.pushMatrix();
	this.scene.translate(0, 0.7, 0.85);
	this.scene.rotate(-0.5 * Math.PI, 1, 0, 0);
	this.scene.scale(0.5, 0.6, 0.9);
	this.top.display();
	this.scene.popMatrix();
	this.scene.pushMatrix();
	this.scene.translate(0, 1.685, 0.85);
	this.scene.rotate(-0.5 * Math.PI, 1, 0, 0);
	this.scene.scale(0.5, 0.6, 0.9);
	this.topCircle.display();
	this.scene.popMatrix();

	//vertical back fin
	this.scene.pushMatrix();
	this.scene.translate(0, 0, -2.3);
	this.scene.translate(0, 0, 0.5);
	this.scene.rotate(30 * degToRad * this.lemes, 0, 1, 0);
	this.scene.translate(0, 0, -0.5);
	this.scene.scale(0.15, 0.6, 0.35);
	this.myBackFinVert.display();
	this.scene.popMatrix();

	//horizontal back fin
	this.scene.pushMatrix();
	this.scene.translate(0, 0, -2.3);
	this.scene.rotate(-0.5 * Math.PI, 0, 0, 1);
	this.scene.translate(0, 0, 0.5);
	this.scene.rotate(-30 * degToRad * this.inclinacao, 0, 1, 0);
	this.scene.translate(0, 0, -0.5);
	this.scene.scale(0.15, 0.6, 0.35);
	this.myBackFinHori.display();
	this.scene.popMatrix();

	//top fin
	this.scene.pushMatrix();
	this.scene.translate(0, 1.3, 0.95);
	this.scene.rotate(Math.PI, 0, 1, 0);
	this.scene.rotate(-0.5 * Math.PI, 0, 0, 1);
	this.scene.scale(0.15, 0.3, 0.35);
	this.myTopFin.display();
	this.scene.popMatrix();

	//periscope
	this.scene.pushMatrix();
	this.scene.translate(0, 0 + this.deltaPeriscope, 1.1);
	this.scene.scale(0.6, 0.8, 0.6);
	this.periscope.display();
	this.scene.popMatrix();

	//turbina left from infinite z
	this.scene.pushMatrix();
	this.scene.translate(0.9, -0.6, -1.85);
	this.scene.scale(0.3, 0.3, 0.3);
	this.turbineLeft.display();
	this.scene.popMatrix();

	//turbine right from infinite z
	this.scene.pushMatrix();
	this.scene.translate(-0.9, -0.6, -1.85);
	this.scene.scale(0.3, 0.3, 0.3);
	this.turbineRight.display();
	this.scene.popMatrix();
};

MySubmarineModel.prototype.update = function (delta) {
	this.turbineLeft.update(delta);
	this.turbineRight.update(delta);
};

MySubmarineModel.prototype.inclinaHori = function (unit) {
	this.inclinacao = unit;
};