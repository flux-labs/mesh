'use strict';

/**
 * Get the area of a mesh
 *
 * @author Karen Hao <karen@flux.io>
 * @version 0.0.1
 *
 * @param {Object} A mesh object
 * 
 * @return {Number} Mesh area
 */
var geom = require('genie/geom');
 
function run(mesh) {
	var totalArea = 0;
	var faces = mesh.faces;
	var vertices = mesh.vertices;
	faces.forEach(function(face) {
	    var points = face.map(function(index) {
	        return vertices[index];
	    });
	    var poly = new geom.Polygon(points);
	    totalArea += poly.area();
	});
	
	
return {
	area: totalArea
};

}

module.exports = {
    run: run
};
