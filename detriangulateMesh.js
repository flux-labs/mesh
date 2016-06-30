'use strict';

/**
 * Clean up triangulated mesh
 *
 * @author Karen Hao <karen@flux.io>
 * @version 0.0.1
 *
 * @param {Object} A mesh object
 * 
 * @return {Object} A return object with three properties:
 *     allEdges: an array of all edges of the mesh;
 *     externalEdges: an array of edges with only one incident face;
 *     internalEdges: an array of edges with only two incident faces
 */

var list = require('flux/list');
var modeling = require('flux/modeling');


//returns dictionary where values are indexes of edges and keys are indexes of incident faces
function getEdgesAsDict(faces) {
    var edges = {};

    for (var i = 0; i < faces.length; ++i) {
        var f = faces[i];
        
        for (var j = 0; j < f.length; ++j) {
            var e = [f[j], f[(j + 1) % f.length]];
            e.sort();
            
            if (e in edges) {
                edges[e].push(i);
            } else {
                edges[e] = [i];
            }
        }
    }
    
    return edges
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

//returns mesh edges
function run(mesh) {
    var faces = mesh.faces; //the faces of the original mesh
    var vertices = mesh.vertices; //the vertices of the original mesh

    var cleanFaces = []; //the faces of a clean mesh
    var cleanVertices = []; //the vertices of a clean mesh
    
    var edgesDict = getEdgesAsDict(faces);

    for (var edges in edgesDict) {
        var edgeVertices = [];
        
        //find all external edges
        if(edgesDict[edges].length == 2) {

            var normals = []; //the normal vectors of the two faces adjacent an edge
            var edgeVertices = []; //two vertices of an edge

            for (var faceIndex of edgesDict[edges]) {
                var face = faces[faceIndex];
                var vert = face.map(function(index) {
                    return vertices[index];
                });
                
                cleanFaces = cleanFaces.concat(face);
                normals.push(getFaceNormal(vert));
            }

            if ((normals[0].toString() === normals[1].toString())) {
            }
        }
    }

    var cleanMesh;
    
    return {
        cleanMesh: cleanMesh
    };
}

module.exports = {
    run: run
};
