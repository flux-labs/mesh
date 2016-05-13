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
 *     externalEdges: an array of edges with only one incident face;
 *     internalEdges: an array of edges with only two incident faces
 */

var list = require('flux/list');
var modeling = require('flux/modeling');

//returns lines with clockwise ordered points of a polygon
function createLinesFaceVertices(points) {
    var n = points.length;
    var rot = list.Rotate(points, 1);
    var lines = [];
    for (var i = 0; i < n; i++) {
        var p0 = points[i];
        var p1 = rot[i];
        lines.push({
            primitive: "line",
            start: p0,
            end: p1
        });
    }
    return lines
}

//returns line with array of two points
function createLineEdgeVertices(points) {
    var lines = [];
    var p0 = points[0];
    var p1 = points[1];
    lines.push({
        primitive: "line",
        start: p0,
        end: p1
    });
    return lines
}

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
    var faces = mesh.faces;
    var vertices = mesh.vertices;
    var points;
    var allEdges = [];

    faces.forEach(function(face) {
        points = face.map(function(index) {
            return vertices[index];
        });
        allEdges.push(createLinesFaceVertices(points));
    });

    var edgesDict = getEdgesAsDict(faces);
    var externalEdges = [];
    var nonplanarEdges =[];

    for (var edges in edgesDict) {
        var edgeVertices = [];
        
        if(edgesDict[edges].length == 1) {
            var edgeIndices = edges.split(",").map(function(str) {
                return parseInt(str);
            });
            
            for (var index of edgeIndices) {
                edgeVertices.push(vertices[index]);
            }
            
            externalEdges.push(createLineEdgeVertices(edgeVertices));
        } else {
            var normals = [];
            var edgeVertices = [];

            for (var faceIndex of edgesDict[edges]) {
                var face = faces[faceIndex];
                var vert = face.map(function(index) {
                    return vertices[index];
                });
                normals.push(getFaceNormal(vert));
            }
            if (!(normals[0].toString() === normals[1].toString())) {
                var edgeIndices = edges.split(",").map(function(str) {
                    return parseInt(str);
                });

            for (var index of edgeIndices) {
                edgeVertices.push(vertices[index]);
            }
            
            nonplanarEdges.push(createLineEdgeVertices(edgeVertices));

            }
        }
    }
    
    return {
        allEdges: allEdges,
        externalEdges: externalEdges,
        nonplanarEdges: nonplanarEdges
    };
}

module.exports = {
    run: run
};
