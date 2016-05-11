'use strict';

/**
 * Code block template.
 *
 */

//still under development

function run(mesh) {
	var faces = mesh[0].faces;
	var vertices = mesh[0].vertices;

	var VertexCount = vertices.length;
    var RawVertices = [].concat.apply([], vertices);

	var edges = [];
	var triangles = [];

	function computeNormals(faces) {
		return faces.map(function(face) {
			// vectors
			var v0 = face[0], v1 = face[1], v2 = face[2];
			
			// sub b - a
			var sub0 = [v1[0] - v0[0], v1[1] - v0[1], v1[2] - v0[2]];
			// sub c - a
			var sub1 = [v2[0] - v0[0], v2[1] - v0[1], v2[2] - v0[2]];
			//console.log(face)
			// cross product of sub vectors
			var cross = [
			  sub0[1] * sub1[2] - sub0[2] * sub1[1],
			  sub0[2] * sub1[0] - sub0[0] * sub1[2],
			  sub0[0] * sub1[1] - sub0[1] * sub1[0]
			];
			//console.log(cross)
            // normalize vector
			var l = Math.sqrt(cross[0] * cross[0] + cross[1] * cross[1] + cross[2] * cross[2]);
			cross[0] /= l;
			cross[1] /= l;
			cross[2] /= l;
			// yay
			return cross;
		});
	}

	for (var face of faces) {
		if (face.length == 4) {
	        var face1 = [face[0],face[1],face[2]];
	        var face2 = [face[2],face[3],face[0]];

            edges.push(vertices[face1[0]],vertices[face1[1]],vertices[face1[1]],vertices[face1[2]],vertices[face1[2]],vertices[face1[0]]);
            edges.push(vertices[face2[0]],vertices[face2[1]],vertices[face2[1]],vertices[face2[2]],vertices[face2[2]],vertices[face1[0]]);

            triangles.push([vertices[face1[0]],vertices[face1[1]],vertices[face1[2]]]);
            triangles.push([vertices[face2[0]],vertices[face2[1]],vertices[face2[2]]]);
	    }
	    else {
	        edges.push(vertices[face[0]],vertices[face[1]],vertices[face[1]],vertices[face[2]],vertices[face[2]],vertices[face[0]]);
            triangles.push([vertices[face[0]],vertices[face[1]],vertices[face[2]]]);
	    }
    }
    var normals = computeNormals(triangles);
    
    var RawEdges = [].concat.apply([],edges);
    var EdgeCount = RawEdges.length/6;

    var Triangles = [].concat.apply([],triangles), RawTriangles = [].concat.apply([],Triangles);
    var TriangleCount = RawTriangles.length/9;

    var trianglesAndNormals = [];

    for (var i=0;i<TriangleCount;i++) {
    	trianglesAndNormals.push(triangles[i],normals[i]);
    }
    
    var TrianglesAndNormals = [].concat.apply([],trianglesAndNormals), RawTrianglesAndNormals = [].concat.apply([],TrianglesAndNormals);

    var dynMesh = {
 	    "BackingMesh": {},
 	    "EdgeCount": EdgeCount,
 	    "EdgesAsSixNumbers": RawEdges,
 	    "RawEdges": RawEdges,
 	    "RawTriangles": RawTriangles,
     	"RawTrianglesAndNormals": RawTrianglesAndNormals,
     	"RawVertices": RawVertices,
     	"TriangleCount": TriangleCount,
 	    "TrianglesAsNineNumbers": RawTriangles,
 	    "VertexCount": VertexCount,
 	    "VerticesAsThreeNumbers": RawVertices
    }

return {
    dynMesh: dynMesh
};

}

module.exports = {
    run: run
};
