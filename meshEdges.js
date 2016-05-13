'use strict';

/**
 * Code block template.
 *
 */

var list = require('flux/list');
var modeling = require('flux/modeling');

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

function createLinesEdgeVertices(points) {
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
    var nakedEdges = [];

    for (var edges in edgesDict) {
        var edgeVertices = [];
        
        if(edgesDict[edges].length == 1) {
            var edgeIndices = edges.split(",").map(function(str) {
                return parseInt(str);
            });
            
            for (var index of edgeIndices) {
                edgeVertices.push(vertices[index]);
            }
            
            nakedEdges.push(createLinesEdgeVertices(edgeVertices));
        }
    }
    
  
    return {
        allEdges: allEdges,
        nakedEdges: nakedEdges,
        internalEdges: internalEdges
    };
}

module.exports = {
    run: run
};
