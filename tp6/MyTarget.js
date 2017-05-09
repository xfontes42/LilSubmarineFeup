/**
 * MyTarget
 * 
 * @constructor
 */

var degToRad = Math.PI / 180.0;

function MyTarget(scene, argument){
	CGFobject.call(this,scene);
	this.targetShape = argument;
	this.hit = false;

	if(argument == 0){
		this.corpo = new MyCylinder(scene, 30,30);	//0 = cilindro
		this.topo = new MyCircle(scene, 30, 30);
	}else if (argument == 1){
		this.corpo = new MyUnitCubeQuad(scene);		//1 = cubo
	}else{
		this.corpo = new MyTable(scene);			//2 = mesa
	}
};

MyTarget.prototype = Object.create(CGFobject.prototype);
MyTarget.prototype.constructor=MyTarget;


MyTarget.prototype.display = function () {
    if (this.targetShape == 0){					//0 = cilindro
    	
    	if (this.hit)
    		this.scene.TargetRoundDestroyed.apply();
    	else 
    		this.scene.TargetRoundTop.apply();    		
   
		this.scene.pushMatrix();
		this.scene.translate(0,1.03,0);
		this.scene.rotate(-Math.PI/2, 1, 0,0);
		this.topo.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.rotate(Math.PI/2, 1, 0,0);
		this.scene.TargetSides.apply();
		this.topo.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.rotate(-Math.PI/2, 1, 0,0);
		this.scene.TargetSides.apply();
		this.corpo.display();
		this.scene.popMatrix();

    } else if (this.targetShape == 1) {			//1 = cubo
   		
   		if (this.hit)
    		this.scene.TargetSquareDestroyed.apply();
    	else
    		this.scene.TargetSquareTop.apply();

    	this.scene.pushMatrix();
    	this.scene.translate(0,0.5,0);
		this.corpo.display();
		this.scene.popMatrix();
    
    } else {									//2 = mesa
    	if (this.hit)
    		this.scene.TargetSquareDestroyed.apply();
    	else
    		this.scene.TargetSquareTop.apply();
    	
		this.scene.pushMatrix();
		this.scene.scale(0.5,0.5,0.5);
		this.corpo.display();
		this.scene.popMatrix();
    }
};