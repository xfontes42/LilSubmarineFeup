/**
 * MyPrism
 * @constructor
 */

var degToRad = Math.PI / 180.0;

function MyPrism(scene, slices, stacks) {
	CGFobject.call(this, scene);

	this.slices = slices;
	this.stacks = stacks;

	this.initBuffers();
};

MyPrism.prototype = Object.create(CGFobject.prototype);
MyPrism.prototype.constructor = MyPrism;

MyPrism.prototype.initBuffers = function () {

	this.vertices = [];
	this.normals = [];
	this.indices = [];
	var anguloFatia = 360 / this.slices * degToRad;

	var x1, y1, z1, x2, y2, z2;

	var ang = 0;
	var indice1 = 0;

	for (face = 0; face < this.slices; face++) {
		ang = anguloFatia * face;

		x1 = Math.cos(ang);
		y1 = Math.sin(ang);
		z1 = 0.0;

		x2 = Math.cos(ang + anguloFatia);
		y2 = Math.sin(ang + anguloFatia);
		z2 = 0.0;

		xN1 = Math.cos(ang + anguloFatia / 2);
		yN1 = Math.sin(ang + anguloFatia / 2);
		zN1 = 0.0;

		N1 = Math.sqrt(xN1 * xN1 + yN1 * yN1);
		var zed = 1 / this.stacks;
		for (z1 = 0; z1 <= 1; z1 += 1 / this.stacks) {

			//ponto 0
			this.vertices.push(x1);
			this.vertices.push(y1);
			this.vertices.push(z1);
			this.normals.push(xN1 / N1);
			this.normals.push(yN1 / N1);
			this.normals.push(zN1 / N1);
			this.indices.push(indice1);
			indice1++;

			//ponto 2
			this.vertices.push(x2);
			this.vertices.push(y2);
			this.vertices.push(z1 + zed);
			this.normals.push(xN1 / N1);
			this.normals.push(yN1 / N1);
			this.normals.push(zN1 / N1);
			this.indices.push(indice1);
			indice1++;

			// ponto 1
			this.vertices.push(x1);
			this.vertices.push(y1);
			this.vertices.push(z1 + zed);
			this.normals.push(xN1 / N1);
			this.normals.push(yN1 / N1);
			this.normals.push(zN1 / N1);
			this.indices.push(indice1);
			indice1++;

			//ponto 3
			this.vertices.push(x2);
			this.vertices.push(y2);
			this.vertices.push(z1);
			this.normals.push(xN1 / N1);
			this.normals.push(yN1 / N1);
			this.normals.push(zN1 / N1);
			this.indices.push(indice1);
			indice1++;

			//ponto 2
			this.vertices.push(x2);
			this.vertices.push(y2);
			this.vertices.push(z1 + zed);
			this.normals.push(xN1 / N1);
			this.normals.push(yN1 / N1);
			this.normals.push(zN1 / N1);
			this.indices.push(indice1);
			indice1++;

			//ponto 0
			this.vertices.push(x1);
			this.vertices.push(y1);
			this.vertices.push(z1);
			this.normals.push(xN1 / N1);
			this.normals.push(yN1 / N1);
			this.normals.push(zN1 / N1);
			this.indices.push(indice1);
			indice1++;
		}
	}

	this.primitiveType = this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};
