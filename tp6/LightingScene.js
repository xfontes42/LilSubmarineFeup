//start new lighting scene, discarding but saving the old one...


var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;  //1
var BOARD_B_DIVISIONS = 100;

function LightingScene() {
	CGFscene.call(this);
	this.oldTime = 0;
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
	CGFscene.prototype.init.call(this, application);

	this.option1 = true;
	this.option2 = false;
	this.fps = 45;
	this.Red = 0.1;
	this.Green = 0.1;
	this.Blue = 0.3;
	this.LuzAmbiente = 0.05;
	this.Luz1 = false;
	this.Luz2 = true;
	this.Luz3 = false;
	this.Luz4 = false;
	this.Luz5 = true;
	this.Clock = true;
	this.sub_texture = 'none';

	this.initCameras();

	this.initLights();

	this.gl.clearColor(this.Red, this.Green,this.Blue, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);

	// Scene elements
// 	this.prism = new MyPrism(this, 8, 20);
 	this.cylinder = new MyCylinder(this,8,20);
 	this.semiSphere = new MySemiSphere(this,20,200);

 	this.submarine = new MySubmarine(this);
	this.torpedo = new MyTorpedo(this);

	// Materials
	this.materialDefault = new CGFappearance(this);
	
	this.enableTextures(true);
	//OLD MATERIALS + SCENE ELEMENTS BEGIN
	
	this.table = new MyTable(this);
	this.wall = new Plane(this);

	this.wallLeft = new MyQuad(this,-1,2,-0.5,1.5);
	this.relogio = new MyClock(this,12);
	this.floor = new MyQuad(this,0.0,10,0,12.0);
	this.boardA = new Plane(this, BOARD_A_DIVISIONS,-0.2,1.2,0,1);
	this.boardB = new Plane(this, BOARD_B_DIVISIONS, -0.2,1.2,0,1);
	

	

	this.materialA = new CGFappearance(this);
	this.materialA.setAmbient(0.3,0.3,0.3,1);
	this.materialA.setDiffuse(0.6,0.6,0.6,1);
	this.materialA.setSpecular(0.0,0.2,0.8,1);//(0.0,0.0,0.8,1)//(0.8,0.8,0.8,1) //(0.2,0.2,0.2,1)
	this.materialA.setShininess(120);  //10

	this.materialB = new CGFappearance(this);
	this.materialB.setAmbient(0.3,0.3,0.3,1);
	this.materialB.setDiffuse(0.6,0.6,0.6,1);
	this.materialB.setSpecular(0.8,0.8,0.8,1);	
	this.materialB.setShininess(120);    

	this.materialTampo = new CGFappearance(this);
	this.materialTampo.setAmbient(0.0,0.0,0.0,1);
	this.materialTampo.setDiffuse(0.86,0.86,0.86,1);
	this.materialTampo.setSpecular(0.1,0.2,0.3,1);	
	this.materialTampo.setShininess(100); 
	this.materialTampo.loadTexture('./resources/images/table.png');

	this.materialPernas = new CGFappearance(this);
	this.materialPernas.setAmbient(0.0,0.0,0.0,1);
	this.materialPernas.setDiffuse(0.2,0.2,0.2,1);
	this.materialPernas.setSpecular(0.7,0.7,0.7,1);	
	this.materialPernas.setShininess(10);
	this.materialPernas.loadTexture('./resources/images/leg.png');
	this.materialPernas.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');

	this.windowAppearance = new CGFappearance(this);
	this.windowAppearance.setAmbient(0.0,0.0,0.0,1);
	this.windowAppearance.setDiffuse(0.9,0.9,0.9,1);
	this.windowAppearance.setSpecular(0.1,0.1,0.1,1);	
	this.windowAppearance.setShininess(2); 
	this.windowAppearance.loadTexture('./resources/images/window.png');
	this.windowAppearance.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');

	this.materialParede2 = new CGFappearance(this);
	this.materialParede2.setAmbient(0.0,0.0,0.0,1);
	this.materialParede2.setDiffuse(0.8,0.8,0.8,1);
	this.materialParede2.setSpecular(0.10,0.10,0.10,1);	
	this.materialParede2.setShininess(1); 
	this.materialParede2.loadTexture('./resources/images/babdyduck.png');
	this.materialParede2.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');

	this.materialChao = new CGFappearance(this);
	this.materialChao.setAmbient(0.1,0.1,0.1,1); //ambiente desativada, nao interessa
	this.materialChao.setDiffuse(0.5,0.5,0.8,1);
	this.materialChao.setSpecular(0.1,0.1,0.1,1);	
	this.materialChao.setShininess(5); 
	this.materialChao.loadTexture('./resources/images/Sahara.jpg');
	this.materialChao.setTextureWrap('REPEAT','REPEAT');
	// OLD MATERIALS + SCENE ELEMENTS END

	this.materialColuna = new CGFappearance(this);
	this.materialColuna.setAmbient(0.0,0.0,0.0,1);
	this.materialColuna.setDiffuse(0.8,0.8,0.8,1);
	this.materialColuna.setSpecular(0.10,0.10,0.10,1);	
	this.materialColuna.setShininess(1); 
	this.materialColuna.loadTexture('./resources/images/coluna.png');
	this.materialColuna.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');

	this.slidesAppearence = new CGFappearance(this);
	this.slidesAppearence.setAmbient(0.1,0.1,0.1,1); //ambiente desativada, nao interessa
	this.slidesAppearence.setDiffuse(0.9,0.9,0.9,1);
	this.slidesAppearence.setSpecular(0.1,0.1,0.1,1);	
	this.slidesAppearence.setShininess(2); 
	this.slidesAppearence.loadTexture('./resources/images/slides.png');
	this.slidesAppearence.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');

	this.boardAppearence = new CGFappearance(this);
	this.boardAppearence.setAmbient(0.1,0.1,0.1,1); //ambiente desativada, nao interessa
	this.boardAppearence.setDiffuse(0.1,0.1,0.1,1);
	this.boardAppearence.setSpecular(0.6,0.6,0.6,1);	
	this.boardAppearence.setShininess(2); 
	this.boardAppearence.loadTexture('./resources/images/board.png');
	this.boardAppearence.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');

	this.clockAppearence = new CGFappearance(this);
	this.clockAppearence.setAmbient(0.1,0.1,0.1,1); //ambiente desativada, nao interessa
	this.clockAppearence.setDiffuse(0.8,0.8,0.8,1);
	this.clockAppearence.setSpecular(0.1,0.1,0.1,1);	
	this.clockAppearence.setShininess(2); 
	this.clockAppearence.loadTexture('./resources/images/clock.png');

	this.clockHand = new CGFappearance(this);
	this.clockHand.setAmbient(0,0,0,1); //ambiente desativada, nao interessa
	this.clockHand.setDiffuse(0,0,0,1);
	this.clockHand.setSpecular(0,0,0,1);	
	this.clockHand.setShininess(2); 

	this.clockHandSecs = new CGFappearance(this);
	this.clockHandSecs.setAmbient(0,0,0,1); //ambiente desativada, nao interessa
	this.clockHandSecs.setDiffuse(1,0,0,1);
	this.clockHandSecs.setSpecular(0,0,0,1);	
	this.clockHandSecs.setShininess(2); 


		//TEXTURAS DO SUBMARINO
	this.sub_app_Gold = new CGFappearance(this);
	this.sub_app_Gold.setAmbient(0.3,0.3,0.3,1);
	this.sub_app_Gold.setDiffuse(0.6,0.6,0.6,1);
	this.sub_app_Gold.setSpecular(0.0,0.2,0.8,1);//(0.0,0.0,0.8,1)//(0.8,0.8,0.8,1) //(0.2,0.2,0.2,1)
	this.sub_app_Gold.setShininess(120);  //10
	this.sub_app_Gold.loadTexture('./resources/images/Gold.jpg');
	//this.sub_app_Gold.setTextureWrap('REPEAT','REPEAT');

	this.sub_app_Rust = new CGFappearance(this);
	this.sub_app_Rust.setAmbient(0.3,0.3,0.3,1);
	this.sub_app_Rust.setDiffuse(0.6,0.6,0.6,1);
	this.sub_app_Rust.setSpecular(0.0,0.2,0.8,1);//(0.0,0.0,0.8,1)//(0.8,0.8,0.8,1) //(0.2,0.2,0.2,1)
	this.sub_app_Rust.setShininess(120);  //10
	this.sub_app_Rust.loadTexture('./resources/images/Rust.jpg');
	//this.sub_app_Rust.setTextureWrap('REPEAT','REPEAT');

	this.sub_app_Metal = new CGFappearance(this);
	this.sub_app_Metal.setAmbient(0.3,0.3,0.3,1);
	this.sub_app_Metal.setDiffuse(0.6,0.6,0.6,1);
	this.sub_app_Metal.setSpecular(0.0,0.2,0.8,1);//(0.0,0.0,0.8,1)//(0.8,0.8,0.8,1) //(0.2,0.2,0.2,1)
	this.sub_app_Metal.setShininess(120);  //10
	this.sub_app_Metal.loadTexture('./resources/images/Metal.jpg');
	//this.sub_app_Metal.setTextureWrap('REPEAT','REPEAT');

	this.sub_app_Fabulous = new CGFappearance(this);
	this.sub_app_Fabulous.setAmbient(0.3,0.3,0.3,1);
	this.sub_app_Fabulous.setDiffuse(0.6,0.6,0.6,1);
	this.sub_app_Fabulous.setSpecular(0.0,0.2,0.8,1);//(0.0,0.0,0.8,1)//(0.8,0.8,0.8,1) //(0.2,0.2,0.2,1)
	this.sub_app_Fabulous.setShininess(120);  //10
	this.sub_app_Fabulous.loadTexture('./resources/images/Fabulous.jpg');
	//this.sub_app_Fabulous.setTextureWrap('REPEAT','REPEAT');

	this.sub_app_Wood = new CGFappearance(this);
	this.sub_app_Wood.setAmbient(0.3,0.3,0.3,1);
	this.sub_app_Wood.setDiffuse(0.6,0.6,0.6,1);
	this.sub_app_Wood.setSpecular(0.0,0.2,0.8,1);//(0.0,0.0,0.8,1)//(0.8,0.8,0.8,1) //(0.2,0.2,0.2,1)
	this.sub_app_Wood.setShininess(120);  //10
	this.sub_app_Wood.loadTexture('./resources/images/Wood.jpg');
	//this.sub_app_Wood.setTextureWrap('REPEAT','REPEAT');

	this.FaceApp = new CGFappearance(this);
	this.FaceApp.setAmbient(0.3,0.3,0.3,1);
	this.FaceApp.setDiffuse(0.6,0.6,0.6,1);
	this.FaceApp.setSpecular(0.0,0.2,0.8,1);//(0.0,0.0,0.8,1)//(0.8,0.8,0.8,1) //(0.2,0.2,0.2,1)
	this.FaceApp.setShininess(10);  //10
	this.FaceApp.loadTexture('./resources/images/HappySmile.png');
	//this.ShieldApp.setTextureWrap('REPEAT','REPEAT');

	this.TorpedoFace = new CGFappearance(this);
    this.TorpedoFace.setAmbient(0.3,0.3,0.3,1);
    this.TorpedoFace.setDiffuse(0.6,0.6,0.6,1);
    this.TorpedoFace.setSpecular(0.0,0.2,0.8,1);//(0.0,0.0,0.8,1)//(0.8,0.8,0.8,1) //(0.2,0.2,0.2,1)
    this.TorpedoFace.setShininess(10);  //10
    this.TorpedoFace.loadTexture('./resources/images/AngrySmile.png');


	this.glassEye = new CGFappearance(this);
	this.glassEye.setAmbient(0.3,0.3,0.3,1);
	this.glassEye.setDiffuse(0.6,0.6,0.6,1);
	this.glassEye.setSpecular(0.0,0.2,0.8,1);//(0.0,0.0,0.8,1)//(0.8,0.8,0.8,1) //(0.2,0.2,0.2,1)
	this.glassEye.setShininess(10);  //10
	this.glassEye.loadTexture('./resources/images/glassEye.jpg');
	//this.glassEye.setTextureWrap('REPEAT','REPEAT');

	this.submarineAppearances = [this.materialDefault, this.sub_app_Metal,this.sub_app_Rust , this.sub_app_Gold, this.sub_app_Wood, this.sub_app_Fabulous];
	this.submarineAppearanceList = { none:0, Metal:1, Rust:2, Gold:3, Wood:4, Fabulous:5 };
	this.currSubmarineAppearance = 0;
	//this.setUpdatePeriod(100);
	this.setUpdatePeriod(1000/this.fps);
	
};

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
	// OLD LIGHTS BEGIN
	this.setGlobalAmbientLight(this.LuzAmbiente,this.LuzAmbiente,this.LuzAmbiente, 1.0); //(0.5,0.5,0.5, 1.0)
	
	//Positions for four lights
	this.lights[0].setPosition(4, 6, 1, 1);
	this.lights[0].setVisible(true); // show marker on light position (different from enabled)
	
	this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
	this.lights[1].setVisible(true); // show marker on light position (different from enabled)

	this.lights[2].setPosition(10.5, 12.0, 5.0, 1.0);
	this.lights[2].setVisible(true); // show marker on light position (different from enabled)


	this.lights[3].setPosition(4, 6.0, 5.0, 1.0);
	this.lights[3].setVisible(true); // show marker on light position (different from enabled)

	this.lights[0].setAmbient(0, 0, 0, 1);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[0].setSpecular( 1.0, 1.0, 0.0, 1.0 )
	this.lights[0].enable();

	this.lights[1].setAmbient(0, 0, 0, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[1].enable();

	this.lights[2].setAmbient(0.5, 0.5, 0.5, 1);
	this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setSpecular( 1.0, 1.0, 1.0, 1.0 );
	this.lights[2].enable();

	this.lights[3].setAmbient(0, 0, 0, 1);
	this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[3].setSpecular( 1.0, 1.0, 0.0, 1.0 );
	this.lights[3].setConstantAttenuation(0.0); //kc 
	this.lights[3].setLinearAttenuation(0.0); //kl
	this.lights[3].setQuadraticAttenuation(1.0); //kq
	this.lights[3].enable();
	
	//OLD LIGHTS END
	
	this.lights[4].setPosition(10, 10, 11, 1);
	this.lights[4].setVisible(true);
	this.lights[4].setAmbient(0.5, 0.5, 0.5, 1);
	this.lights[4].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[4].setSpecular(1.0, 1.0, 1.0, 1.0);
	this.lights[4].enable();


// 	this.lights[0].disable();
// 	this.lights[1].disable();
// 	this.lights[2].disable();
// 	this.lights[3].disable();
// 	this.lights[4].disable();
	
 	//this.setGlobalAmbientLight(0.8, 0.8,0.8, 1);
	
// 	// Positions for lights
// 	this.lights[0].setPosition(5, 5, 5, 1);
// 	this.lights[0].setVisible(true);
	
// 	this.lights[1].setPosition(-5, 5, 5, 1);
// 	this.lights[1].setVisible(true);

// 	this.lights[0].setAmbient(0, 0, 0, 1);
// 	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
// 	this.lights[0].setSpecular(1.0, 1.0, 1.0, 1.0);
// 	this.lights[0].enable();

// 	this.lights[1].setAmbient(0, 0, 0, 1);
// 	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
// 	this.lights[1].setSpecular(1.0, 1.0, 1.0, 1.0);
// 	this.lights[1].enable();
};

LightingScene.prototype.updateLights = function() {
	for (i = 0; i < this.lights.length; i++)
		this.lights[i].update();
}

LightingScene.prototype.display = function() {
	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Update all lights used
	this.updateLights();

	// Draw axis
	this.axis.display();

	this.materialDefault.apply();

	// ---- END Background, camera and axis setup

		// ---- BEGIN OldScene drawing section





// 	// Left Wall
// 	this.pushMatrix();
// 		this.translate(0, 4, 7.5);
// 		this.rotate(90 * degToRad, 0, 1, 0);
// 		this.scale(15, 8, 0.2);
// 		this.windowAppearance.apply();  //<----- parede cool
// 		this.wallLeft.display();
// 	this.popMatrix();

// 	// Plane Wall
// 	this.pushMatrix();
// 		this.translate(7.5, 4, 0);
// 		this.scale(15, 8, 0.2);
// 		this.materialParede2.apply();  //<----- parede cool
// 		this.wall.display();
// 	this.popMatrix();

// 	// First Table
// 	this.pushMatrix();
// 		this.translate(5, 0, 8);
// 		this.table.display();
// 	this.popMatrix();

// 	// Second Table
// 	this.pushMatrix();
// 		this.translate(12, 0, 8);
// 		this.table.display();
// 	this.popMatrix();

// 	// Board A
// 	this.pushMatrix();
// 		this.translate(4, 4.5, 0.2);
// 		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
// 		//this.materialA.apply();
// 		this.slidesAppearence.apply();
// 		this.boardA.display();
// 	this.popMatrix();

// 	// Board B
// 	this.pushMatrix();
// 		this.translate(10.5, 4.5, 0.2);
// 		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
// 		//this.materialB.apply();
// 		this.boardAppearence.apply();
// 		this.boardB.display();
// 	this.popMatrix();

// 	// ---- END OldScene drawing section

// 	// ---- BEGIN Primitive drawing section


// // 	// Prism
// // 	this.pushMatrix();
// // 	this.translate(5,0,0);
// // 	this.prism.display();
// // 	this.popMatrix();

		// Floor
	this.pushMatrix();
	this.translate(7.5, 0, 7.5);
	this.rotate(-90 * degToRad, 1, 0, 0);
	this.scale(50, 50, 0.2);
	this.materialChao.apply();
	this.floor.display();
	this.popMatrix();

	//Cylinder
	this.pushMatrix();
	this.translate(0,5,8);
	this.rotate(90*degToRad, 1,0,0);
	this.translate(10,0,-3);
	this.scale(1,1,8);
	this.materialColuna.apply();
	this.cylinder.display();
	this.popMatrix();

	//Submarino
	this.pushMatrix();
	this.submarineAppearances[this.currSubmarineAppearance].apply();
	this.submarine.display();
	this.popMatrix();

	this.pushMatrix();
	this.translate(this.submarine.posX,this.submarine.zed-1.5,this.submarine.posY+1.5);
	this.translate(0,1.5,-1.5);
	this.rotate(this.submarine.rotation*degToRad,0,1,0);
	this.rotate(this.submarine.inclinacao*10*degToRad,1,0,0);
	this.translate(0,-1.5,1.5);
	this.submarineAppearances[this.currSubmarineAppearance].apply();
    this.torpedo.display();
    this.popMatrix();


	//Relogio
	this.pushMatrix();
	this.translate(10,7,9);
	this.materialDefault.apply();
	this.relogio.display();
	this.popMatrix();


// 	//SemiSphere
// 	this.pushMatrix();
// 	this.translate(0,5,0);
// 	this.semiSphere.display();
// 	this.popMatrix();

	// ---- END Primitive drawing section
};


LightingScene.prototype.update = function(currTime) {
	this.gl.clearColor(this.Red, this.Green,this.Blue, 1.0);
	this.setGlobalAmbientLight(this.LuzAmbiente,this.LuzAmbiente,this.LuzAmbiente, 1.0);
	
	this.setUpdatePeriod(1000/this.fps); //VER SE ISTO NAO DA PROBLEMAS
	
	this.currSubmarineAppearance = this.submarineAppearanceList[this.sub_texture];

	if(this.Luz1){
		this.lights[0].setVisible(true);
		this.lights[0].enable();
	} else {
		this.lights[0].setVisible(false);
		this.lights[0].disable();
	}

	if(this.Luz2){
		this.lights[1].setVisible(true);
		this.lights[1].enable();
	} else {
		this.lights[1].setVisible(false);
		this.lights[1].disable();
	}

	if(this.Luz3){
		this.lights[2].setVisible(true);
		this.lights[2].enable();
	} else {
		this.lights[2].setVisible(false);
		this.lights[2].disable();
	}

	if(this.Luz4){
		this.lights[3].setVisible(true);
		this.lights[3].enable();
	} else {
		this.lights[3].setVisible(false);
		this.lights[3].disable();
	}

	if(this.Luz5){
		this.lights[4].setVisible(true);
		this.lights[4].enable();
	} else {
		this.lights[4].setVisible(false);
		this.lights[4].disable();
	}


	if(this.oldTime === 0){
		this.oldTime = currTime;
	}
	else {
		if(this.Clock)
			this.relogio.update(currTime-this.oldTime);

		this.submarine.update(currTime-this.oldTime);
		this.oldTime = currTime;
	}

};


LightingScene.prototype.tickClock = function ()
{ if(this.Clock)
	this.Clock = false;
	else this.Clock = true;};
