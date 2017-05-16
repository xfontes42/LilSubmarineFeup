var degToRad = Math.PI / 180.0;
/**
 * MyInterface
 * @constructor
 */
function MyInterface() {
	//call CGFinterface constructor 
	CGFinterface.call(this);
};

var global_var_scene;

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;



/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
	// call CGFinterface init
	CGFinterface.prototype.init.call(this, application);
	
	// init GUI. For more information on the methods, check:
	//  http://workshop.chromeexperiments.com/examples/gui
	
	this.gui = new dat.GUI();

	// add a button:
	// the first parameter is the object that is being controlled (in this case the scene)
	// the identifier 'doSomething' must be a function declared as part of that object (i.e. a member of the scene class)
	// e.g. LightingScene.prototype.doSomething = function () { console.log("Doing something..."); }; 

	this.gui.add(this.scene, 'tickClock');
	this.gui.add(this.scene,'fps',5,120);

	// add a group of controls (and open/expand by defult)
	
// 	var group=this.gui.addFolder("Options");
// 	group.open();

// 	// add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
// 	// e.g. this.option1=true; this.option2=false;
	
// 	group.add(this.scene, 'option1');
// 	group.add(this.scene, 'option2');
	
	// add a slider
	// must be a numeric variable of the scene, initialized in scene.init e.g.
	// this.speed=3;
	// min and max values can be specified as parameters
	//this.gui.add(this.scene, 'ambient', 0, 1);

	//this.gui.add(this.scene, 'Clock');

	var luzes = this.gui.addFolder("Lights");
	//luzes.open();
	luzes.add(this.scene,'LuzAmbiente',0,1);
	luzes.add(this.scene,'Luz1');
	luzes.add(this.scene,'Luz2');
	luzes.add(this.scene,'Luz3');
	luzes.add(this.scene,'Luz4');
	luzes.add(this.scene,'Luz5');


	var luzFundo = this.gui.addFolder("Fundo Oceano");
	//luzFundo.open();
	luzFundo.add(this.scene, 'Red',0,1);
	luzFundo.add(this.scene, 'Green',0,1);
	luzFundo.add(this.scene,'Blue',0,1);
	
	
	this.gui.add(this.scene, 'sub_texture', [ 'none', 'Metal', 'Rust', 'Gold', 'Wood', 'Fabulous'] );
	this.gui.add(this.scene, 'numberOfCubes',10,1000);
	this.gui.add(this.scene, 'alcance', 3,15);
	var targets = this.gui.addFolder("Targets");
	targets.open();
	var cubo = targets.addFolder("Cube");
	var cuboX = cubo.add(this.scene,'target1X',-13,27);
	var cuboY = cubo.add(this.scene,'target1Y',-0.5,10);
	var cuboZ = cubo.add(this.scene,'target1Z',-13,27);
	var cilindro = targets.addFolder("Cylinder");
	var ciliX = cilindro.add(this.scene,'target2X',-13,27);
	var ciliY = cilindro.add(this.scene,'target2Y',-0.5,10);
	var ciliZ = cilindro.add(this.scene,'target2Z',-13,27);
	var mesa = targets.addFolder("Table");
	var mesaX = mesa.add(this.scene,'target3X',-13,27);
	var mesaY = mesa.add(this.scene,'target3Y',-0.5,10);
	var mesaZ = mesa.add(this.scene,'target3Z',-13,27);
	targets.add(this.scene,'resetTargets');
	targets.add(this.scene,'TorpedoSpeed',0.5,20);


	global_var_scene = this.scene;
	var mexe = function(value){
		 console.log("mudei");
 	 if(global_var_scene != null){
 	 	if(global_var_scene.submarine.countTorpedo == 1){
 	 		if(global_var_scene.submarine.torpedo.timeAt > 0){
 	 			global_var_scene.submarine.updateTarget(1);
 	 		}
 	 	}
 	 	else if(global_var_scene.submarine.countTorpedo == 2){
 	 		if(global_var_scene.submarine.torpedo.timeAt > 0){
 	 			global_var_scene.submarine.updateTarget(2);
 	 		}}
 	 		else if(global_var_scene.submarine.countTorpedo == 3){
 	 		if(global_var_scene.submarine.torpedo.timeAt > 0){
 	 			global_var_scene.submarine.updateTarget(3);
 	 		}
 	 }}
	};
	cuboX.onFinishChange(mexe);
	cuboY.onFinishChange(mexe);
	cuboZ.onFinishChange(mexe);
	ciliX.onFinishChange(mexe);
	ciliY.onFinishChange(mexe);
	ciliZ.onFinishChange(mexe);
	mesaX.onFinishChange(mexe);
	mesaY.onFinishChange(mexe);
	mesaZ.onFinishChange(mexe);
	
	return true;
};

/**
 * processKeyboard
 * @param event {Event}
 */
MyInterface.prototype.processKeyboard = function(event) {
	// call CGFinterface default code (omit if you want to override)
	CGFinterface.prototype.processKeyboard.call(this,event);
	
	// Check key codes e.g. here: http://www.asciitable.com/
	// or use String.fromCharCode(event.keyCode) to compare chars
	
	// for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp
	switch (event.keyCode)
	{
		case (65):	//A -  only works for capital 'A', as it is
			this.scene.submarine.rotateSub(4*degToRad);
			break;
		case(87): //W
			this.scene.submarine.changeVelocity(1);
			break;

		case(83): //S
			this.scene.submarine.changeVelocity(-0.8);
			break;

		case(68): //D
			this.scene.submarine.rotateSub(-4*degToRad);
			break; 

		case(81): //Q
			//this.scene.submarine.dive(0.2);
			break;
		case(69): //E
			//this.scene.submarine.dive(-0.2);
			break;

		case(80):  //P - subir periscopio
			this.scene.submarine.movePeriscope(0.1);
			break;

		case(76):  //L - descer periscopio
		 	this.scene.submarine.movePeriscope(-0.1);
			break;

		case(70):  //F - mostrar/disparar torpedo
			if(this.scene.submarine.countTorpedo > 0)
				if(this.scene.submarine.torpedo.timeAt < 1)
					return;
		 	this.scene.submarine.fireTorpedo();
			break;

	};
};

MyInterface.prototype.processKeyDown = function(event){
	switch (event.keyCode)
	{
		case (65):	//A
			this.scene.submarine.rotateLeme(-1);
			break;
		
		case(68): //D
			this.scene.submarine.rotateLeme(1);
			break;
			
		case(81): //Q
		this.scene.submarine.inclina(-1);
			break;
		case(69): //E
		this.scene.submarine.inclina(1);
			break;

	};

};

MyInterface.prototype.processKeyUp = function(event){
	switch (event.keyCode)
	{
		case (65): //A
			this.scene.submarine.rotateLeme(1);
			break;
		
		case(68): //D
			this.scene.submarine.rotateLeme(-1);
			break;
			
		case(81): //Q
		this.scene.submarine.inclina(1);
			break;
		case(69): //E
		this.scene.submarine.inclina(-1);
			break;

	};

};