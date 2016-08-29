'use strict';

/**
 * Triangulate the quad faces of a mesh
 *
 * @author Karen Hao <karen@flux.io>
 * @version 0.0.1
 *
 * @param {Object} A mesh object
 * 
 * @return {Object} A mesh object w/ triangulated faces
 */

function run(mesh) {
	var faces = mesh.faces;
	var triFaces=[];

	for (let face of faces) {
		while (face.length > 3) {
			triFaces.push( [face[0],face[1],face[2]] );
			face.splice(1,1);
		}
		if (face.length == 3)
			triFaces.push(face);
	}
	
	mesh.faces = triFaces;

return { Out: mesh };
}

module.exports = {
    run: run
};
