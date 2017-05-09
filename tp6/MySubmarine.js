/**
 * MySubmarine
 * 
 * @constructor
 */

var degToRad = Math.PI / 180.0;

function MySubmarine(scene, minS, maxS,minT, maxT, rot){
	CGFobject.call(this,scene);
	this.minS = minS || 0;
	this.minT = minT || 0;
	this.maxS = maxS || 1;
	this.maxT = maxT || 1;
	this.rotation = rot || 0;
	this.dist = 0;
	this.posX = 0;
	this.posY = 0;
	this.zed = 0;
	this.velocidade = 0;
	this.inclinacao = 0;
	this.body = new MySubmarineModel(scene);
	this.countTorpedo = 0;
	this.initBuffers();
};

MySubmarine.prototype = Object.create(CGFobject.prototype);
MySubmarine.prototype.constructor=MySubmarine;

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
	
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};

MySubmarine.prototype.display = function () {
	this.scene.pushMatrix();
	this.scene.translate(this.posX,this.zed,this.posY);
	this.scene.rotate(this.rotation*degToRad,0,1,0);
	this.scene.rotate(this.inclinacao*10*degToRad,1,0,0);
	//CGFobject.prototype.display.call(this);
	this.body.display();
	this.scene.popMatrix();

	if(this.countTorpedo > 0){
	this.scene.pushMatrix();
	this.scene.translate(this.torpedo.posX,this.torpedo.zed,this.torpedo.posY);
	this.scene.rotate(this.torpedo.rotation*degToRad,0,1,0);
	this.scene.rotate(this.torpedo.inclinacao*10*degToRad,1,0,0);
	this.scene.submarineAppearances[this.scene.currSubmarineAppearance].apply();
    this.torpedo.display();
    this.scene.popMatrix();
	}
	


};

MySubmarine.prototype.dive = function (move) {
	this.zed += move;
	console.log(this.zed);
};


MySubmarine.prototype.rotateSub = function (deg) {
	this.rotation += deg;
	//console.log(this.rotation);
};

MySubmarine.prototype.goForward = function (comp) {
	this.dist += comp;
	this.posX += comp*Math.sin(this.rotation*degToRad);
	this.posY += comp*Math.cos(this.rotation*degToRad);
	//console.log(this.dist);
};

MySubmarine.prototype.movePeriscope = function(comp){
	this.body.deltaPeriscope+= comp;
	if(this.body.deltaPeriscope < -0.5 )
		this.body.deltaPeriscope = -0.5;
	if(this.body.deltaPeriscope > 1.5 )
		this.body.deltaPeriscope = 1.5;

};

MySubmarine.prototype.update = function(delta){
	this.goForward(this.velocidade*delta/1000); //delta em milisegundos
	this.body.update(delta);
};

MySubmarine.prototype.changeVelocity = function(delt){
	this.velocidade += delt;
	this.body.turbineLeft.velocidadeAng += 0.4*delt;
	this.body.turbineRight.velocidadeAng -= 0.4*delt;
};


MySubmarine.prototype.rotateLeme = function(unit){
	this.body.lemes += unit;
	if(this.body.lemes > 1)
		this.body.lemes = 1;
	else if(this.body.lemes < -1)
		this.body.lemes = -1;
};

MySubmarine.prototype.inclina = function(unit){
	this.inclinacao += unit;
	if(this.inclinacao > 1)
		this.inclinacao = 1;
	else if(this.inclinacao < -1)
		this.inclinacao = -1;
	
	this.body.inclinaHori(this.inclinacao);
}

MySubmarine.prototype.calculateBezier = function(coord1,coord2,coord3,coord4,t){
	return (((-(3*t*t*t)+(3*t*t)-(3*t)+1)*coord1)+((3*t*t*t-6*t*t+3*t)*coord2)+((3*t*t-3*t*t*t)*coord3)+((t*t*t)*coord4));
};

MySubmarine.prototype.fireTorpedo = function(){
	this.countTorpedo++;
	this.torpedo = new MyTorpedo(this.scene);
	this.torpedo.posX = this.posX;
	this.torpedo.posY = this.posY;
	this.torpedo.zed = this.zed-1.2;
	this.torpedo.dist = this.dist;
	this.torpedo.inclinacao = this.inclinacao;
	this.torpedo.hide = false;
};