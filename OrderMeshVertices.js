'use strict';

/**
 * Order the vertices of a mesh clockwise
 *
 * @author Karen Hao <karen@flux.io>
 * @version 0.0.1
 *
 * @param {Object} A mesh object
 * 
 * @return {Object} A return object with a "Vertices" property containing an array
 *     of clockwise-ordered vertices for each mesh face.
 */

var modeling = require('flux/modeling');

function run(Mesh) {
	var faces = Mesh.faces;
	var vertices = Mesh.vertices;
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
