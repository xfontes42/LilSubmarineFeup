/**
 * MyPeriscope
 * @constructor
 */

function MyPeriscope(scene, minS, maxS, minT, maxT) {
  CGFobject.call(this, scene);
  this.minS = minS || 0;
  this.minT = minT || 0;
  this.maxS = maxS || 1;
  this.maxT = maxT || 1;
  this.scene = scene;
  this.cylinderVert = new MyCylinder(scene, 30, 10);
  this.cylinderHori = new MyCylinder(scene, 30, 10);
  this.periscopeCircle = new MyCircle(scene, 30);
};

MyPeriscope.prototype = Object.create(CGFobject.prototype);
MyPeriscope.prototype.constructor = MyPeriscope;

MyPeriscope.prototype.display = function () {

  //vertical
  this.scene.pushMatrix();
  this.scene.rotate(-0.5 * Math.PI, 1, 0, 0);
  this.scene.scale(0.1, 0.1, 2.7);
  this.cylinderVert.display();
  this.scene.popMatrix();

  //horizontal
  this.scene.pushMatrix();
  this.scene.translate(0, 2.9, -0.11);
  this.scene.scale(0.15, 0.15, 0.4);
  this.cylinderHori.display();
  this.scene.popMatrix();

  //circulo frente
  this.scene.pushMatrix();
  this.scene.translate(0, 2.9, 0.32);
  this.scene.scale(0.15, 0.15, 1);
  this.scene.glassEye.apply();
  this.periscopeCircle.display();
  this.scene.submarineAppearances[this.scene.currSubmarineAppearance].apply();
  this.scene.popMatrix();

  //circulo tras
  this.scene.pushMatrix();
  this.scene.translate(0, 2.9, -0.11);
  this.scene.rotate(Math.PI, 0, 1, 0);
  this.scene.scale(0.15, 0.15, 1);
  this.periscopeCircle.display();
  this.scene.popMatrix();
};
