/**
 * MySemiSphere
 * @constructor
 */
 
//var degToRad = Math.PI / 180.0;

 function MySemiSphere(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MySemiSphere.prototype = Object.create(CGFobject.prototype);
 MySemiSphere.prototype.constructor = MySemiSphere;

MySemiSphere.prototype.initBuffers = function() {
 
    this.vertices = [];
    this.indices = [];
    this.normals = [];
   this.texCoords = [];
 
    var index = 0;
   	var index_incr = this.stacks+1;
    var ang = 0.0;
    var ang_incr = 2 * Math.PI / this.slices;
 
    var ang_sphere = 0.0;
    var ang_aux = (Math.PI/2) / this.stacks;
 
    var height = Math.sin(ang_sphere);
    var coord_x = Math.cos(ang_sphere);
    var coord_y = Math.sin(ang_sphere);
 
    for(var i = 0; i <= this.slices; i++)
    {
        for(var j = 0; j <= this.stacks+1; j++)
        {
 
            this.vertices.push(coord_x, coord_y, height);
            this.texCoords.push(coord_x*0.5+0.5,0.5-coord_y*0.5);
            this.normals.push(2*coord_x, 2*coord_y, 2*height);
 
//             if (i != 0) {
//                 this.indices.push(index-this.stacks, index-1, index);
//                 this.indices.push(index, index-this.stacks+1, index-this.stacks);
//             }

			if(i !== 0 && j !== 0) {
             this.indices.push(index,index-index_incr-1,index-1);
             this.indices.push(index,index-index_incr,index-index_incr-1);
           }
 
            index++;
           
            height=Math.sin(ang_sphere);
            coord_x = Math.cos(ang_sphere)* Math.cos(ang);
            coord_y = Math.cos(ang_sphere)*Math.sin(ang);
            ang_sphere+=ang_aux;
           
        }
        ang += ang_incr;
        ang_sphere = 0.0;
        height = 0;
        coord_x = Math.cos(ang);
        coord_y = Math.sin(ang);       
    }
 
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
 };






// var degToRad = Math.PI / 180.0;

//  function MySemiSphere(scene, slices, stacks) {
//  	CGFobject.call(this,scene);
	
// 	this.slices = slices;
// 	this.stacks = stacks;

//  	this.initBuffers();
//  };

//  MySemiSphere.prototype = Object.create(CGFobject.prototype);
//  MySemiSphere.prototype.constructor = MySemiSphere;

//  MySemiSphere.prototype.initBuffers = function() {
//  	/*
//  	* TODO:
//  	* Replace the following lines in order to build a prism with a **single mesh**.
//  	*
//  	* How can the vertices, indices and normals arrays be defined to
//  	* build a prism with varying number of slices and stacks?
//  	*/

// 	this.vertices = [];
// 	this.normals = [];
// 	this.indices = [];

// // 			//ponto 1
// // 			this.vertices.push(1.0);
// // 			this.vertices.push(1.0);
// // 			this.vertices.push(0.0);
// // 			//ponto 2
// // 			this.vertices.push(4.5);
// // 			this.vertices.push(4.5);
// // 			this.vertices.push(0.0);
// // 			//ponto 3
// // 			this.vertices.push(10.0);
// // 			this.vertices.push(11.0);
// // 			this.vertices.push(0.0);

// // 			this.normals.push(0.0);
// // 			this.normals.push(0.0);
// // 			this.normals.push(1.0);
// // 			this.normals.push(0.0);
// // 			this.normals.push(0.0);
// // 			this.normals.push(1.0);
// // 			this.normals.push(0.0);
// // 			this.normals.push(0.0);
// // 			this.normals.push(1.0);
			

// // 			this.indices.push(0);
// // 			this.indices.push(1);
// // 			this.indices.push(2);




// 	var anguloFatia = 360/this.slices * degToRad; 
// 	var anguloFatiaInt = 90*degToRad/this.stacks;

// 	var x1,y1,z1,x2,y2,z2,x3,y3,z3,x4,y4,z4;
// 	var ang = 0.0;
// 	var indice1 = 0;
// 	var angINT = 0.0;
// 	var face, i;
// 	for(face = 0; face < this.slides; face++){
// 		//para cada face
// 		angINT = 0.0;
// 		ang = anguloFatia*face;
// 		raio = Math.cos(angINT);

// 		for(i = 0; i <= this.stacks; i++){
// 			angINT = i*anguloFatiaInt;
// 			x1 = Math.cos(angINT)  * Math.cos(ang);
// 			y1 = Math.cos(angINT) * Math.sin(ang);
// 			z1 = Math.sin(angINT);

// 			x2 = Math.cos(angINT) * Math.cos(ang+anguloFatia);
// 			y2 = Math.cos(angINT) * Math.sin(ang+anguloFatia);
// 			z2 = Math.sin(angINT);

// 			x3 = Math.cos(angINT+anguloFatiaInt) * Math.cos(ang);
// 			y3 = Math.cos(angINT+anguloFatiaInt) * Math.sin(ang);
// 			z3 = Math.sin(angINT+anguloFatiaInt);

// 			x4 = Math.cos(angINT+anguloFatiaInt) * Math.cos(ang+anguloFatia);
// 			y4 = Math.cos(angINT+anguloFatiaInt) * Math.sin(ang+anguloFatia);
// 			z4 = Math.sin(angINT+anguloFatiaInt);
			
// 			//ponto 1
// 			this.vertices.push(x1);
// 			this.vertices.push(y1);
// 			this.vertices.push(z1);

// 			this.normals.push(x1);
// 			this.normals.push(y1);
// 			this.normals.push(z1);

// 			this.indices.push(indice1);
//  			indice1++;

// 			//ponto 2
// 			this.vertices.push(x2);
// 			this.vertices.push(y2);
// 			this.vertices.push(z2);
			
// 			this.normals.push(x2);
// 			this.normals.push(y2);
// 			this.normals.push(z2);

// 			this.indices.push(indice1);
//  			indice1++;

// 			//ponto 3
// 			this.vertices.push(x3);
// 			this.vertices.push(y3);
// 			this.vertices.push(z3);
			
// 			this.normals.push(x3);
// 			this.normals.push(y3);
// 			this.normals.push(z3);

// 			this.indices.push(indice1);
//  			indice1++;


// 			//ponto 3
// 			this.vertices.push(x3);
// 			this.vertices.push(y3);
// 			this.vertices.push(z3);
			
// 			this.normals.push(x3);
// 			this.normals.push(y3);
// 			this.normals.push(z3);

// 			this.indices.push(indice1);
//  			indice1++;
			
// 			//ponto 2
// 			this.vertices.push(x2);
// 			this.vertices.push(y2);
// 			this.vertices.push(z2);
			
// 			this.normals.push(x2);
// 			this.normals.push(y2);
// 			this.normals.push(z2);

// 			this.indices.push(indice1);
//  			indice1++;

//  			//ponto 4
// 			this.vertices.push(x4);
// 			this.vertices.push(y4);
// 			this.vertices.push(z4);
			
// 			this.normals.push(x4);
// 			this.normals.push(y4);
// 			this.normals.push(z4);

// 			this.indices.push(indice1);
//  			indice1++;

			
// 			//angINT += anguloFatiaInt;
// 		}

// 	}
// 	console.log(this.vertices);
// 	console.log(this.normals);
// 	console.log(this.indices);

// // 	var anguloFatia = 360/this.slices * degToRad; 
// // 	var anguloFatiaInt = 90*degToRad/this.stacks;

// // 	var x1,y1,z1,x2,y2,z2;

// // 	var ang = 0;
// // 	var indice1 = 0;
	
// // 	for(face = 0; face < this.slices ; face++){
// // 	var angInterno = 0;
// // 	ang = anguloFatia*face;

	

// // 	var zed = 1/this.stacks;
// // 	for(z1 = 0; z1 <=1 ; z1+= 1/this.stacks){
// // 		x1 = Math.cos(ang)*Math.sin(angInterno);
// // 		y1 = Math.sin(ang)*Math.sin(angInterno);
// // 		z1 = 0.0;
// // 	x2 = Math.cos(ang+anguloFatia);
// // 	y2 = Math.sin(ang+anguloFatia);
// // 	z2 = 0.0;

		
// // 		//ponto 0
// // 		this.vertices.push(x1);
// // 		this.vertices.push(y1);
// // 		this.vertices.push(z1);
// // 		this.normals.push(x1);
// // 		this.normals.push(y1);
// // 		this.normals.push(0.0);

// // 		this.indices.push(indice1);
// // 		indice1++;

// // 		//ponto 2
// // 		this.vertices.push(x2);
// // 		this.vertices.push(y2);
// // 		this.vertices.push(z1+zed);
// // 		this.normals.push(x2);
// // 		this.normals.push(y2);
// // 		this.normals.push(0.0);

// // 		this.indices.push(indice1);
// // 		indice1++;

// // 		// ponto 1
// // 		this.vertices.push(x1);
// // 		this.vertices.push(y1);
// // 		this.vertices.push(z1+zed);

// // 		this.normals.push(x1);
// // 		this.normals.push(y1);
// // 		this.normals.push(0.0);

// // 		this.indices.push(indice1);
// // 		indice1++;

		

// // 		//ponto 3
// // 		this.vertices.push(x2);
// // 		this.vertices.push(y2);
// // 		this.vertices.push(z1);
// // 		this.normals.push(x2);
// // 		this.normals.push(y2);
// // 		this.normals.push(0.0);

// // 		this.indices.push(indice1);
// // 		indice1++;

// // 		//ponto 2
// // 		this.vertices.push(x2);
// // 		this.vertices.push(y2);
// // 		this.vertices.push(z1+zed);
// // 		this.normals.push(x2);
// // 		this.normals.push(y2);
// // 		this.normals.push(0.0);

// // 		this.indices.push(indice1);
// // 		indice1++;

// // 		//ponto 0
// // 		this.vertices.push(x1);
// // 		this.vertices.push(y1);
// // 		this.vertices.push(z1);
// // 		this.normals.push(x1);
// // 		this.normals.push(y1);
// // 		this.normals.push(0.0);

// // 		this.indices.push(indice1);
// // 		indice1++;


// // 		angInterno += anguloFatiaInt;
// // 		}


// // 	}

// // 	this.vertices = [];
// // 	this.normals = [];
// // 	this.indices = [];
// // 	var anguloFatia = 360/this.slices * degToRad;

// // // 	this.vertices.push(0.0);
// // // 	this.vertices.push(0.0);
// // // 	this.vertices.push(0.0);
	
// // 	var percent = 1/this.stacks;
// // 	for(zcol = 0.0 ; zcol <= 2*this.stacks; zcol+=percent){
// // 	var xAntigo = 1.0*Math.sqrt((1-zcol)/2);
// // 	var yAntigo = 0.0*Math.sqrt((1-zcol)/2);
// // 	var zAntigo = zcol;

// // 	var xNovo, yNovo, zNovo;
// // 	var a,b,c;
// // 	var normaVetor;
// // 	var xNorma;
// // 	var yNorma;
// // 	var zNorma;

// // 	//face dianteira
// // 	for(i = 1; i <= this.slices ; i++){
// // 		xNovo = Math.cos(i*anguloFatia)* Math.sqrt((1-zcol)/2);
// // 		yNovo = Math.sin(i*anguloFatia)* Math.sqrt((1-zcol)/2);
// // 		zNovo = zcol;

// // 		this.vertices.push(xAntigo);
// // 		this.vertices.push(yAntigo);
// // 		this.vertices.push(zAntigo);

// // 		this.vertices.push(xNovo);
// // 		this.vertices.push(yNovo);
// // 		this.vertices.push(zNovo);

// // // 		a = xNovo - xAntigo;
// // // 		b = yNovo - yAntigo;
// // // 		c = zcol;

// // // 		normaVetor = Math.sqrt(b*b + a*a);
// // // 		xNorma = b/normaVetor;
// // // 		yNorma = -1*a /normaVetor;
// // // 		zNorma = 0.0;

// // 		normaVetor = Math.sqrt(xAntigo*xAntigo + yAntigo*yAntigo + zAntigo*zAntigo);
// // 		xNorma = xAntigo/normaVetor;
// // 		yNorma = yAntigo/normaVetor;
// // 		zNorma = zAntigo/normaVetor;

// // 		this.normals.push(xNorma);
// // 		this.normals.push(yNorma);
// // 		this.normals.push(zNorma);

// // 		normaVetor = Math.sqrt(xNovo*xNovo + yNovo*yNovo + zNovo*zNovo);
// // 		xNorma = xNovo/normaVetor;
// // 		yNorma = yNovo/normaVetor;
// // 		zNorma = zNovo/normaVetor;

// // 		this.normals.push(xNorma);
// // 		this.normals.push(yNorma);
// // 		this.normals.push(zNorma);

// // 		xAntigo = xNovo;
// // 		yAntigo = yNovo;
// // 		zAntigo = zNovo;
// // 	}

// // 	//face traseira
// // 	var xAntigo = 1.0*Math.sqrt((1-zcol)/2);
// // 	var yAntigo = 0.0*Math.sqrt((1-zcol)/2);
// // 	var zAntigo = zcol+0.5*percent;
// // 	for(i = 1; i <= this.slices ; i++){
// // 		xNovo = Math.cos(i*anguloFatia) *Math.sqrt((1-zcol)/2);
// // 		yNovo = Math.sin(i*anguloFatia) *Math.sqrt((1-zcol)/2);
// // 		zNovo = zcol+0.5*percent;

// // 		this.vertices.push(xAntigo);
// // 		this.vertices.push(yAntigo);
// // 		this.vertices.push(zAntigo);

// // 		this.vertices.push(xNovo);
// // 		this.vertices.push(yNovo);
// // 		this.vertices.push(zNovo);

// // // 		a = xNovo - xAntigo;
// // // 		b = yNovo - yAntigo;
// // // 		c = zcol+0.5;

// // // 		normaVetor = Math.sqrt(b*b + a*a);
// // // 		xNorma = b/normaVetor;
// // // 		yNorma = -a /normaVetor;
// // // 		zNorma = 0;

// // 		normaVetor = Math.sqrt(xAntigo*xAntigo + yAntigo*yAntigo + zAntigo*zAntigo);
// // 		xNorma = xAntigo/normaVetor;
// // 		yNorma = yAntigo/normaVetor;
// // 		zNorma = zAntigo/normaVetor;

// // 		this.normals.push(xNorma);
// // 		this.normals.push(yNorma);
// // 		this.normals.push(zNorma);

// // 		normaVetor = Math.sqrt(xNovo*xNovo + yNovo*yNovo + zNovo*zNovo);
// // 		xNorma = xNovo/normaVetor;
// // 		yNorma = yNovo/normaVetor;
// // 		zNorma = zNovo/normaVetor;
// // 		this.normals.push(xNorma);
// // 		this.normals.push(yNorma);
// // 		this.normals.push(zNorma);

// // 		xAntigo = xNovo;
// // 		yAntigo = yNovo;
// // 		zAntigo = zNovo;
// // 	}

// // 	for(i = 0; i < this.slices; i++){
// // 		//+zcol*2*this.slices factor de ajuste pa todos
// // 		this.indices.push((2*i+2*this.slices+zcol*2*this.slices));
// // 		this.indices.push(2*i+zcol*2*this.slices);
// // 		this.indices.push(2*i+1+zcol*2*this.slices);

		
// // 		this.indices.push((2*i+2*this.slices+zcol*2*this.slices));
// // 		this.indices.push(2*i+1+zcol*2*this.slices);
// // 		this.indices.push(((2*i+2*this.slices)+1+zcol*2*this.slices));
// // 	}  




		
// // 	}

//  	this.primitiveType = this.scene.gl.TRIANGLES;
//  	this.initGLBuffers();
//  };