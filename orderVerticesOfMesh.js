'use strict';

/**
 * Order the verticies of a mesh clockwise
 * @param {Mesh} Mesh object
 * 
 * @return {Vertices} ordered vertices
 */
var modeling = require('flux/modeling');

function run(Mesh) {
	var faces = Mesh[0].faces;
	var vertices = Mesh[0].vertices;
	var points;
	var listOfPoints=[];
 	faces.forEach(function(face) {
 	    points = face.map(function(index) {
 	        return modeling.entities.point(vertices[index]);
 	    });
 	    listOfPoints.push(points);
 	});

return {
    Vertices: listOfPoints
};

}

module.exports = {
    run: run
};
