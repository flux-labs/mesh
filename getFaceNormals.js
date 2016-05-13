'use strict';

/**
 * Find the mesh edges
 *
 * @author Karen Hao <karen@flux.io>
 * @version 0.0.1
 *
 * @param {Object} A mesh object
 * 
 * @return {Object} A return object with three properties:
 *     allEdges: an array of all edges of the mesh;
 *     nakedEdges: an array of edges with only one incident face;
 *     internalEdges: an array of edges with only two incident faces
 */


function run(mesh) {
    var vertices = mesh.vertices;
    var faces = mesh.faces;
    var orderedVertices = [];
    
    //order the vertices
    for(var face of faces) {
        for(var index of face) {
            orderedVertices.push(vertices[face[index]]);
        }
        
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
    }

    return {
    	normal: normal
    }
}

module.exports = {
    run: run
};
