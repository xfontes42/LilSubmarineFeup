/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

function MyTrapezoid(scene, minS, maxS, minT, maxT) {
	CGFobject.call(this, scene);
	this.minS = minS || 0;
	this.minT = minT || 0;
	this.maxS = maxS || 1;
	this.maxT = maxT || 1;

	this.initBuffers2();
};

MyTrapezoid.prototype = Object.create(CGFobject.prototype);
MyTrapezoid.prototype.constructor = MyTrapezoid;

MyTrapezoid.prototype.initBuffers2 = function () {
	this.vertices = [
		0.5, -3, 0,
		0.5, -2, 1,
		-0.5, -3, 0,
		-0.5, -2, 1,
		0.5, 3, 0,
		0.5, 2, 1,
		-0.5, 3, 0,
		-0.5, 2, 1,

		0.5, -3, 0,
		0.5, -2, 1,
		-0.5, -3, 0,
		-0.5, -2, 1,
		0.5, 3, 0,
		0.5, 2, 1,
		-0.5, 3, 0,
		-0.5, 2, 1,

		0.5, -3, 0,
		0.5, -2, 1,
		-0.5, -3, 0,
		-0.5, -2, 1,
		0.5, 3, 0,
		0.5, 2, 1,
		-0.5, 3, 0,
		-0.5, 2, 1
	];

	this.indices = [
		0, 1, 3,
		0, 3, 2,
		0, 5, 1,
		0, 4, 5,
		5, 6, 7,
		5, 4, 6,
		6, 3, 7,
		6, 2, 3,
		1, 5, 7,
		1, 7, 3,
		0, 6, 4,
		0, 2, 6
	];

	this.texCoords = [
		this.maxS, this.minT,	//0
		this.maxS, this.maxT,	//1
		this.maxS, this.maxT,	//2
		this.maxS, this.minT,	//3
		this.minS, this.minT,	//4
		this.minS, this.maxT,	//5
		this.minS, this.maxT,	//6
		this.minS, this.minT,	//7
		this.maxS, this.maxT,	//8
		this.maxS, this.minT,	//9
		this.maxS, this.minT,	//10
		this.maxS, this.maxT,	//11
		this.minS, this.maxT,	//12
		this.minS, this.minT,	//13
		this.minS, this.minT,	//14
		this.minS, this.maxT,	//15
		this.minS, this.minT,	//16
		this.maxS, this.minT,	//17
		this.minS, this.maxT,	//18
		this.maxS, this.maxT,	//19
		this.maxS, this.minT,	//20
		this.minS, this.minT,	//21
		this.maxS, this.maxT,	//22
		this.minS, this.maxT,	//23
	];

	this.primitiveType = this.scene.gl.TRIANGLES;

	this.normals = [
		1, 0, 0,
		1, 0, 0,
		-1, 0, 0,
		-1, 0, 0,
		1, 0, 0,
		1, 0, 0,
		-1, 0, 0,
		-1, 0, 0,
		0, 0, -1,
		0, 0, 1,
		0, 0, -1,
		0, 0, 1,
		0, 0, -1,
		0, 0, 1,
		0, 0, -1,
		0, 0, 1,
		0, -1 / Math.sqrt(2), 1 / Math.sqrt(2),
		0, -1 / Math.sqrt(2), 1 / Math.sqrt(2),
		0, -1 / Math.sqrt(2), 1 / Math.sqrt(2),
		0, -1 / Math.sqrt(2), 1 / Math.sqrt(2),
		0, 1 / Math.sqrt(2), 1 / Math.sqrt(2),
		0, 1 / Math.sqrt(2), 1 / Math.sqrt(2),
		0, 1 / Math.sqrt(2), 1 / Math.sqrt(2),
		0, 1 / Math.sqrt(2), 1 / Math.sqrt(2),
	];

	this.initGLBuffers();
};