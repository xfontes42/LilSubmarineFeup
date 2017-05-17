/**
 * MyCylinder
 * @constructor
 */

var degToRad = Math.PI / 180.0;

function MyCylinder(scene, slices, stacks) {
	CGFobject.call(this, scene);

	this.slices = slices;
	this.stacks = stacks;

	this.initBuffers();
};

MyCylinder.prototype = Object.create(CGFobject.prototype);
MyCylinder.prototype.constructor = MyCylinder;

MyCylinder.prototype.initBuffers = function () {

	this.vertices = [];
	this.normals = [];
	this.indices = [];
	this.texCoords = [];

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
			this.normals.push(x1);
			this.normals.push(y1);
			this.normals.push(0.0);
			this.texCoords.push(face / this.slices, 1 - z1);
			this.indices.push(indice1);
			indice1++;

			//ponto 2
			this.vertices.push(x2);
			this.vertices.push(y2);
			this.vertices.push(z1 + zed);
			this.normals.push(x2);
			this.normals.push(y2);
			this.normals.push(0.0);
			this.texCoords.push((face + 1) / this.slices, 1 - z1 - zed);
			this.indices.push(indice1);
			indice1++;

			// ponto 1
			this.vertices.push(x1);
			this.vertices.push(y1);
			this.vertices.push(z1 + zed);
			this.normals.push(x1);
			this.normals.push(y1);
			this.normals.push(0.0);
			this.texCoords.push(face / this.slices, 1 - z1 - zed);
			this.indices.push(indice1);


			//PARA SE VER DE DENTRO PARA FORA
			this.indices.push(indice1);
			this.indices.push(indice1 - 1);
			this.indices.push(indice1 - 2);
			indice1++;

			//ponto 3
			this.vertices.push(x2);
			this.vertices.push(y2);
			this.vertices.push(z1);
			this.normals.push(x2);
			this.normals.push(y2);
			this.normals.push(0.0);
			this.texCoords.push((face + 1) / this.slices, 1 - z1);
			this.indices.push(indice1);
			indice1++;

			//ponto 2
			this.vertices.push(x2);
			this.vertices.push(y2);
			this.vertices.push(z1 + zed);
			this.normals.push(x2);
			this.normals.push(y2);
			this.normals.push(0.0);
			this.texCoords.push((face + 1) / this.slices, 1 - z1 - zed);
			this.indices.push(indice1);
			indice1++;

			//ponto 0
			this.vertices.push(x1);
			this.vertices.push(y1);
			this.vertices.push(z1);
			this.normals.push(x1);
			this.normals.push(y1);
			this.normals.push(0.0);
			this.texCoords.push(face / this.slices, 1 - z1);
			this.indices.push(indice1);

			//PARA SE VER DE DENTRO PA FORA
			this.indices.push(indice1);
			this.indices.push(indice1 - 1);
			this.indices.push(indice1 - 2);
			indice1++;
		}

	}

	this.primitiveType = this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};
