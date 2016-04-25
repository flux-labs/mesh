'use strict';

/**
 * Code block template.
 *
 */
var modeling = require('flux/modeling');

function run(mesh) {
	var faces = mesh[0].faces;
	var vertices = mesh[0].vertices;
	var points;
	var listOfPoints=[];
 	faces.forEach(function(face) {
 	    points = face.map(function(index) {
 	        return modeling.entities.point(vertices[index]);
 	    });
 	    listOfPoints.push(points);
 	});

return {
    orderedVertices: listOfPoints
};

}

module.exports = {
    run: run
};
