'use strict';

/**
 * Code block template.
 *
 */

var list = require('flux/list');
var modeling = require('flux/modeling');

function createLines(Points) {
    var n = Points.length;
    var rot = list.Rotate(Points, 1);
    var lines = [];
    for (var i = 0; i < n; i++) {
        var p0 = Points[i];
        var p1 = rot[i];
        lines.push({
            primitive: "line",
            start: p0,
            end: p1,
        });
    }
    return lines
}
 
function run(mesh) {
    var faces = mesh[0].faces;
    var vertices = mesh[0].vertices;
    var points;
    var lines;
    faces.forEach(function(face) {
        points = face.map(function(index) {
            return vertices[index];
        });
        lines = createLines(points)
    });

return {
   boundary: lines
};
}

module.exports = {
    run: run
};
