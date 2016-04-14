'use strict';

/**
 * Code block template.
 *
 */

 var vec3 = {
    create: function create() {
    	return {x:0, y:0, z:0}
    },
    set: function set(vector, x, y, z) {
    	vector.x=x;
    	vector.y=y;
    	vector.z=z;
    },
    cross: function cross(vector, a, b) {
        this.set(vector,
        	a.y * b.z - a.z * b.y,
        	a.z * b.x - a.x * b.z,
        	a.x * b.y - a.y * b.x);
    },
    dot: function dot(a, b) {
    	return  a.x * b.x + a.y * b.y + a.z * b.z;
    },
}
 
function tetraVolume(vertices) {
	var p1 = vertices[0]
	var p2 = vertices[1]
	var p3 = vertices[2]
	
	var v321 = p3[0]*p2[1]*p1[2];
    var v231 = p2[0]*p3[1]*p1[2];
    var v312 = p3[0]*p1[1]*p2[2];
    var v132 = p1[0]*p3[1]*p2[2];
    var v213 = p2[0]*p1[1]*p3[2];
    var v123 = p1[0]*p2[1]*p3[2];

    return (1/6)*(-v321 + v231 + v312 - v132 - v213 + v123);

}

function run(mesh) {
	var totalVolume = 0;
	var faces = mesh.faces;
	var vertices = mesh.vertices;
	
	faces.forEach(function(face) {
	    var points = face.map(function(index) {
	        return vertices[index];
	    });
	    
	    if (points.length == 4) {
	    	var points1 = [points[0],points[1],points[2]];
	    	var points2 = [points[2],points[3],points[0]];

	    	totalVolume += tetraVolume(points1) + tetraVolume(points2);
	    } else if (points.length == 3) {
	    	totalVolume += tetraVolume(points);
	    }
	});
	
	
return {
	volume: totalVolume
};

}

module.exports = {
    run: run
};