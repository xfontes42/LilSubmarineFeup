/**
 * MyClock
 * @constructor
 */
 
var degToRad = Math.PI / 180.0;

 function MyClock(scene, slices) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.clockFace = new MyCircle(scene,slices);
	this.cilinder = new MyCylinder(scene,this.slices,1);
	this.HourHand = new MyClockHand(scene, 0.6, 0.0325*0.6);
	this.MinuteHand = new MyClockHand(scene, 0.8 , 0.0325*0.6);
	this.SecondHand = new MyClockHand(scene, 0.85, 0.5*0.0325);

	 this.HourHand.setAngle(90);
	 this.MinuteHand.setAngle(180);
	this.SecondHand.setAngle(270);
 };

 MyClock.prototype = Object.create(CGFobject.prototype);
 MyClock.prototype.constructor = MyClock;

//  MyClock.prototype.display = function(){
//      //fazer display
//      this.scene.pushMatrix();
//      this.scene.translate(0,0,0.16);
//      //this.scene.rotate(180*degToRad,0,0,1)
//      this.scene.clockAppearence.apply();
//      this.clockFace.display();
//      this.scene.popMatrix();

//  	this.scene.pushMatrix();
//  	this.scene.scale(1,1,0.08);
//  	this.scene.materialDefault.apply();
//      this.cilinder.display();
//      this.scene.popMatrix();



// 	 this.scene.pushMatrix();


//  	this.scene.translate(0,0,0.17);
//  	this.scene.clockHand.apply();
//      this.HourHand.display();
//      this.scene.popMatrix();


//      this.scene.pushMatrix();
	 
//  	this.scene.translate(0,0,0.17);
//  	this.scene.clockHand.apply();
//      this.MinuteHand.display();
//      this.scene.popMatrix();



//        this.scene.pushMatrix();
// 	//this.SecondHand.setAngle(270);
//  	this.scene.translate(0,0,0.17);
//  	this.scene.clockHandSecs.apply();
//      this.SecondHand.display();
//      this.scene.popMatrix();
// };

// MyClock.prototype.display = function(){
//      //fazer display
//      this.scene.pushMatrix();
//      this.scene.translate(0,0,0.16);
//      //this.scene.rotate(180*degToRad,0,0,1)
//      this.scene.clockAppearence.apply();
//      this.clockFace.display();
//      this.scene.popMatrix();

//  	this.scene.pushMatrix();
//  	this.scene.scale(1,1,0.08);
//  	this.scene.materialDefault.apply();
//      this.cilinder.display();
//      this.scene.popMatrix();



// 	 this.scene.pushMatrix();

// 	 this.HourHand.setAngle(90);
//  	this.scene.translate(0,0,0.17);
//  	this.scene.clockHand.apply();
//      this.HourHand.display();
//      this.scene.popMatrix();


//      this.scene.pushMatrix();
// 	 this.MinuteHand.setAngle(180);
//  	this.scene.translate(0,0,0.17);
//  	this.scene.clockHand.apply();
//      this.MinuteHand.display();
//      this.scene.popMatrix();



//        this.scene.pushMatrix();
// 	this.SecondHand.setAngle(270);
//  	this.scene.translate(0,0,0.17);
//  	this.scene.clockHandSecs.apply();
//      this.SecondHand.display();
//      this.scene.popMatrix();
// };


 MyClock.prototype.display = function(){
     //fazer display
     this.scene.pushMatrix();
     this.scene.translate(0,0,0.16);
     //this.scene.rotate(180*degToRad,0,0,1)
     this.scene.clockAppearence.apply();
     this.clockFace.display();
     this.scene.popMatrix();

 	this.scene.pushMatrix();
 	this.scene.scale(1,1,0.08);
 	this.scene.materialDefault.apply();
     this.cilinder.display();
     this.scene.popMatrix();



	 this.scene.pushMatrix();
 	this.scene.translate(0,0,0.17);
 	this.scene.clockHand.apply();
     this.HourHand.display();
     this.scene.popMatrix();


     this.scene.pushMatrix();
 	this.scene.translate(0,0,0.17);
 	this.scene.clockHand.apply();
     this.MinuteHand.display();
     this.scene.popMatrix();



       this.scene.pushMatrix();
 	this.scene.translate(0,0,0.17);
 	this.scene.clockHandSecs.apply();
     this.SecondHand.display();
     this.scene.popMatrix();
};

MyClock.prototype.update = function(elapsedTime){
	//console.log(this.SecondHand.angle+(elapsedTime*0.006));
	//console.log(this.MinuteHand.angle+(elapsedTime*0.0001));
	//console.log(this.HourHand.angle + (elapsedTime*0.0001/60));
	//console.log(elapsedTime);
	this.SecondHand.setAngle(this.SecondHand.angle+(elapsedTime*0.006));
	this.MinuteHand.setAngle(this.MinuteHand.angle+(elapsedTime*0.0001));
    this.HourHand.setAngle(this.HourHand.angle + (elapsedTime*0.0001/60));
};