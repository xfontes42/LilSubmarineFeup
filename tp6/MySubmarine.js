/**
 * MySubmarine
 * 
 * @constructor
 */

var degToRad = Math.PI / 180.0;

function MySubmarine(scene, minS, maxS, minT, maxT, rot) {
	CGFobject.call(this, scene);
	this.minS = minS || 0;
	this.minT = minT || 0;
	this.maxS = maxS || 1;
	this.maxT = maxT || 1;
	this.rotation = rot || 0;
	this.dist = 0;
	this.posX = 0;
	this.posZ = 0;
	this.posY = 0;
	this.velocidade = 0;
	this.inclinacao = 0;
	this.body = new MySubmarineModel(scene);
	this.countTorpedo = 0;
	this.initBuffers();
};

MySubmarine.prototype = Object.create(CGFobject.prototype);
MySubmarine.prototype.constructor = MySubmarine;

MySubmarine.prototype.initBuffers = function () {
	this.vertices = [
		0.5, 0.3, 0,
		-0.5, 0.3, 0,
		0, 0.3, 2,
	];

	this.indices = [
		0, 1, 2,
		2, 1, 0,
	];

	this.primitiveType = this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};

MySubmarine.prototype.display = function () {
	this.scene.pushMatrix();
	this.scene.translate(this.posX, this.posY, this.posZ);
	this.scene.rotate(this.rotation, 0, 1, 0);
	this.scene.rotate(this.inclinacao, 1, 0, 0);
	this.body.display();
	this.scene.popMatrix();

	if (this.countTorpedo > 0) {
		this.scene.pushMatrix();
		this.scene.translate(this.torpedo.posX, this.torpedo.posY, this.torpedo.posZ);
		this.scene.rotate(this.torpedo.rotation, 0, 1, 0);
		this.scene.rotate(this.torpedo.inclinacao, 1, 0, 0);
		this.scene.submarineAppearances[this.scene.currSubmarineAppearance].apply();
		this.torpedo.display();
		this.scene.popMatrix();
	}
};

MySubmarine.prototype.dive = function (move) {
	this.posY += move;
};


MySubmarine.prototype.rotateSub = function (deg) {
	this.rotation += deg;
};

MySubmarine.prototype.goForward = function (comp) {
	this.dist += comp;
	this.posX += comp * Math.sin(this.rotation) * Math.sin(Math.PI / 2 - this.inclinacao);
	this.posZ += comp * Math.cos(this.rotation) * Math.sin(Math.PI / 2 - this.inclinacao);
	this.posY -= comp * Math.cos(Math.PI / 2 - this.inclinacao);
};

MySubmarine.prototype.movePeriscope = function (comp) {
	this.body.deltaPeriscope += comp;
	if (this.body.deltaPeriscope < -0.5)
		this.body.deltaPeriscope = -0.5;
	if (this.body.deltaPeriscope > 1.5)
		this.body.deltaPeriscope = 1.5;

};

MySubmarine.prototype.changeVelocity = function (delt) {
	this.velocidade += delt;
	this.body.turbineLeft.velocidadeAng += 0.4 * delt;
	this.body.turbineRight.velocidadeAng -= 0.4 * delt;
};

MySubmarine.prototype.rotateLeme = function (unit) {
	this.body.lemes += unit;
	if (this.body.lemes > 1)
		this.body.lemes = 1;
	else if (this.body.lemes < -1)
		this.body.lemes = -1;
};

MySubmarine.prototype.inclina = function (unit) {
	this.inclinacao += unit * 0.1; //0.1 radians
	this.body.inclinaHori(unit);
}

MySubmarine.prototype.calculateBezier = function (coord1, coord2, coord3, coord4, t) {
	var result = 0;
	result += Math.pow((1 - t), 3) * coord1;
	result += (3 * t * Math.pow((1 - t), 2)) * coord2;
	result += (3 * t * t * (1 - t)) * coord3;
	result += Math.pow(t, 3) * coord4;
	return result;
};

MySubmarine.prototype.calculateBezierDeri = function (coord1, coord2, coord3, coord4, t) {
	var result = 0;
	result += Math.pow((1 - t), 2) * -3 * coord1;
	result += (9 * t * t - 12 * t + 3) * coord2;
	result += (6 * t - 9 * t * t) * coord3;
	result += Math.pow(t, 2) * 3 * coord4;
	return result;
};

MySubmarine.prototype.fireTorpedo = function () {
	this.countTorpedo++;
	this.torpedo = new MyTorpedo(this.scene);

	this.torpedo.inclinacao = this.inclinacao;
	this.torpedo.rotation = this.rotation;

	this.torpedo.posX = this.posX + 1.4 * Math.sin(this.torpedo.rotation) * Math.sin(Math.PI / 2 - this.torpedo.inclinacao);	//x
	this.torpedo.posZ = this.posZ + 1.4 * Math.cos(this.torpedo.rotation) * Math.sin(Math.PI / 2 - this.torpedo.inclinacao);  //z
	this.torpedo.posY = this.posY - 1.4 * Math.cos(this.torpedo.inclinacao);												//y

	this.torpedo.dist = this.dist;

	this.torpedo.hide = false;
	this.torpedo.origin.push(this.torpedo.posX, this.torpedo.posY, this.torpedo.posZ);
	this.torpedo.point2.push(this.torpedo.posX + 6 * Math.sin(this.torpedo.rotation) * Math.sin(Math.PI / 2 - this.torpedo.inclinacao), this.torpedo.posY - 6 * Math.cos(Math.PI / 2 - this.torpedo.inclinacao), this.torpedo.posZ + 6 * Math.cos(this.torpedo.rotation) * Math.sin(Math.PI / 2 - this.torpedo.inclinacao));

	switch (this.countTorpedo) {
		case 1:
			this.torpedo.targetLocation = this.scene.target1coords;
			break;
		case 2:
			this.torpedo.targetLocation = this.scene.target2coords;
			break;
		case 3:
			this.torpedo.targetLocation = this.scene.target3coords;
			break;
		default:
			console.log("No more torpedos");
			break;
	};
	this.torpedo.targetLocation[1] += 1; //adds realism when the torpedo hits
	this.torpedo.point3.push(this.torpedo.targetLocation[0], this.torpedo.targetLocation[1] + 3, this.torpedo.targetLocation[2]);

	this.torpedo.linearDistance = Math.sqrt(Math.pow(this.torpedo.targetLocation[0] - this.torpedo.posX, 2)
		+ Math.pow(this.torpedo.targetLocation[1] - this.torpedo.posY, 2) + Math.pow(this.torpedo.targetLocation[2] - this.posZ, 2));
};


MySubmarine.prototype.update = function (delta) {
	this.goForward(this.velocidade * delta / 1000); //delta em milisegundos
	this.body.update(delta);

	if (this.countTorpedo < 1)
		return;

	if (this.torpedo.timeAt >= 1) {
		this.scene.target1.update(delta);
		this.scene.target2.update(delta);
		this.scene.target3.update(delta);
		return;
	}

	this.torpedo.timeAt += (this.scene.TorpedoSpeed * delta) / (this.torpedo.linearDistance * 1000);
	if (this.torpedo.timeAt >= 1) {
		this.torpedo.hide = true;
		switch (this.countTorpedo) {
			case 1:
				this.scene.target1.hit = true;
				this.scene.target1.location = this.scene.target1coords;
				this.scene.target1.explosion.localExp = this.scene.target1coords;
				break;
			case 2:
				this.scene.target2.hit = true;
				this.scene.target2.location = this.scene.target2coords;
				this.scene.target2.explosion.localExp = this.scene.target2coords;

				break;
			case 3:
				this.scene.target3.hit = true;
				this.scene.target3.location = this.scene.target3coords;
				this.scene.target3.explosion.localExp = this.scene.target3coords;

				break;
		};

		this.scene.target1.update(delta);
		this.scene.target2.update(delta);
		this.scene.target3.update(delta);

	} else {

		this.torpedo.posX = this.calculateBezier(this.torpedo.origin[0], this.torpedo.point2[0], this.torpedo.point3[0], this.torpedo.targetLocation[0], this.torpedo.timeAt);
		this.torpedo.posY = this.calculateBezier(this.torpedo.origin[1], this.torpedo.point2[1], this.torpedo.point3[1], this.torpedo.targetLocation[1], this.torpedo.timeAt);
		this.torpedo.posZ = this.calculateBezier(this.torpedo.origin[2], this.torpedo.point2[2], this.torpedo.point3[2], this.torpedo.targetLocation[2], this.torpedo.timeAt);

		var dX = this.calculateBezierDeri(this.torpedo.origin[0], this.torpedo.point2[0], this.torpedo.point3[0], this.torpedo.targetLocation[0], this.torpedo.timeAt);
		var dY = this.calculateBezierDeri(this.torpedo.origin[1], this.torpedo.point2[1], this.torpedo.point3[1], this.torpedo.targetLocation[1], this.torpedo.timeAt);
		var dZ = this.calculateBezierDeri(this.torpedo.origin[2], this.torpedo.point2[2], this.torpedo.point3[2], this.torpedo.targetLocation[2], this.torpedo.timeAt);

		this.torpedo.rotation = Math.atan2(dX, dZ);
		this.torpedo.inclinacao = -Math.atan2(dY, Math.sqrt(dZ * dZ + dX * dX));

		this.scene.target1.update(delta);
		this.scene.target2.update(delta);
		this.scene.target3.update(delta);
	}
};

MySubmarine.prototype.updateTarget = function (unit) {

	var dX = this.calculateBezierDeri(this.torpedo.origin[0], this.torpedo.point2[0], this.torpedo.point3[0], this.torpedo.targetLocation[0], this.torpedo.timeAt);
	var dY = this.calculateBezierDeri(this.torpedo.origin[1], this.torpedo.point2[1], this.torpedo.point3[1], this.torpedo.targetLocation[1], this.torpedo.timeAt);
	var dZ = this.calculateBezierDeri(this.torpedo.origin[2], this.torpedo.point2[2], this.torpedo.point3[2], this.torpedo.targetLocation[2], this.torpedo.timeAt);
	var delta = Math.sqrt(dX * dX + dY * dY + dZ * dZ);
	this.torpedo.rotation = Math.atan2(dX, dZ);
	this.torpedo.inclinacao = -Math.atan2(dY, Math.sqrt(dZ * dZ + dX * dX));
	this.torpedo.origin = [this.torpedo.posX, this.torpedo.posY, this.torpedo.posZ];
	this.torpedo.point2 = [this.torpedo.posX + 6 * dX / delta, this.torpedo.posY + 6 * dY / delta, this.torpedo.posZ + 6 * dZ / delta];

	switch (unit) {
		case 1: this.torpedo.targetLocation = this.scene.target1coords; break;
		case 2: this.torpedo.targetLocation = this.scene.target2coords; break;
		case 3: this.torpedo.targetLocation = this.scene.target3coords; break;
	}

	this.torpedo.targetLocation[1] += 1; //realism when the torpedo hits
	this.torpedo.point3 = [this.torpedo.targetLocation[0], this.torpedo.targetLocation[1] + 3, this.torpedo.targetLocation[2]];

	this.torpedo.linearDistance = Math.sqrt(Math.pow(this.torpedo.targetLocation[0] - this.torpedo.posX, 2)
		+ Math.pow(this.torpedo.targetLocation[1] - this.torpedo.posY, 2) + Math.pow(this.torpedo.targetLocation[2] - this.posZ, 2));

	this.torpedo.timeAt = 0;
	dX = this.calculateBezierDeri(this.torpedo.origin[0], this.torpedo.point2[0], this.torpedo.point3[0], this.torpedo.targetLocation[0], this.torpedo.timeAt);
	dY = this.calculateBezierDeri(this.torpedo.origin[1], this.torpedo.point2[1], this.torpedo.point3[1], this.torpedo.targetLocation[1], this.torpedo.timeAt);
	dZ = this.calculateBezierDeri(this.torpedo.origin[2], this.torpedo.point2[2], this.torpedo.point3[2], this.torpedo.targetLocation[2], this.torpedo.timeAt);
	this.torpedo.rotation = Math.atan2(dX, dZ);
	this.torpedo.inclinacao = -Math.atan2(dY, Math.sqrt(dZ * dZ + dX * dX));
};