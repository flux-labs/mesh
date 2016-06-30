'use strict';

/**
 * Find the area of each surface of a mesh
 *
 * @author Karen Hao <karen@flux.io>
 * @version 0.0.1
 *
 * @param {Object} A mesh object
 * 
 * @return {Object} A return object with an areas property
 *     that contains an array of areas for each surface of the mesh
 */


var geom = require('genie/geom');



//order vertices of a face
function orderedVertices(face, vertices) {
	var points =[];
	for (var index of face) {
		points.push(vertices[index]);
	}
	return points
}

//returns the normal of a face given the face's clockwise ordered vertices
function getFaceNormal(orderedVertices) {
    
    //define two vectors of face
    var a = new Array(3);
    var b = new Array(3);
    
    for(var j=0; j<3; j++) {
        a[j] = orderedVertices[1][j] - orderedVertices[0][j];
        b[j] = orderedVertices[2][j] - orderedVertices[0][j];
    }

    //cross product of vectors
    var cross = [ a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0] ];
    
    //normalize vector
    var l = Math.sqrt(cross[0] * cross[0] + cross[1] * cross[1] + cross[2] * cross[2]);
    var normal = cross.map(function(num) { return num/l });

    return normal
}

//calculate area of face
function areaOfFace(orderedVertices) {
	var poly = new geom.Polygon(orderedVertices);
	return poly.area();
}


//if the face is on the same plane as the former, add it to the total area
//otherwise add it to a different array that will be looped through again
function run(mesh) {
    var areas = []; //final array of areas

    var leftoverFaces = mesh.faces;
    var vertices = mesh.vertices;
    
    while (leftoverFaces.length > 0) {
    	var currentArea = 0; //area of the current surface
        var otherFaces = []; //faces of the mesh that are not coplanar to the current surface

        //calculate area of first face
	    var firstFace = leftoverFaces.shift(); //removes first face from array faces and returns it
	    var firstNormal = getFaceNormal(orderedVertices(firstFace,vertices)); //find normal of first face
	    currentArea += areaOfFace(orderedVertices(firstFace,vertices)); //adds area of first face to current area

    	for (var face of leftoverFaces) {
		    var normal = getFaceNormal(orderedVertices(face,vertices)); //find normal of face
            
            //if face is coplanar to firstFace, calculate area and add it to currentArea
		    //else add it to otherFaces
		    if (normal.toString() === firstNormal.toString()) {
        	    currentArea += areaOfFace(orderedVertices(face,vertices));
            } else {
        	    otherFaces.push(face);
            }
        }
        leftoverFaces = otherFaces;
        areas.push(currentArea);
    }
	
	return {
		areas: areas
	};

}

module.exports = {
    run: run
};
