/**
 * MyCircle
 * @constructor
 */
 
var degToRad = Math.PI / 180.0;

 function MyCircle(scene, slices) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;

 	this.initBuffers();
 };

 MyCircle.prototype = Object.create(CGFobject.prototype);
 MyCircle.prototype.constructor = MyCircle;

 MyCircle.prototype.initBuffers = function() {
 


	this.vertices = [];
	this.normals = [];
	this.indices = [];
	this.texCoords = [];
	
	var anguloFatia = 360/this.slices * degToRad; 
	var x1,y1,x2,y2;

	var ang = 0;
	var indice1 = 0;

	//centro
	this.vertices.push(0,0,0);
	this.normals.push(0,0,1);
	this.texCoords.push(0.5,0.5);
	indice1++;

	for(face = 0; face < this.slices ; face++){
	ang = anguloFatia*face;
	x1 = Math.cos(ang);
	y1 = Math.sin(ang);

	x2 = Math.cos(ang+anguloFatia);
	y2 = Math.sin(ang+anguloFatia);

// 	xN1 = Math.cos(ang+anguloFatia/2);
// 	yN1 = Math.sin(ang+anguloFatia/2);
// 	N1 = Math.sqrt(xN1*xN1 + yN1*yN1);
	
		//ponto 1
		this.vertices.push(x1);
		this.vertices.push(y1);
		this.vertices.push(0.0);
		this.normals.push(x1);
		this.normals.push(y1);
		this.normals.push(0.0);

        this.texCoords.push(x1*0.5+0.5,0.5-y1*0.5);
		this.indices.push(indice1);
		indice1++;

		//ponto 2
		this.vertices.push(x2);
		this.vertices.push(y2);
		this.vertices.push(0.0);
		this.normals.push(x2);
		this.normals.push(y2);
		this.normals.push(0.0);

        this.texCoords.push(x2*0.5+0.5,0.5-y2*0.5);
		this.indices.push(indice1);
		indice1++;

		// centro
		this.indices.push(0);

		}


 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
