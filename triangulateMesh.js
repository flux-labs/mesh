'use strict';

/**
 * Code block template.
 *
 */
function run(faces) {
	var triFaces=[];

	for (var face of faces) {
		if (face.length==4) {
			var face1 = [face[0],face[1],face[2]];
			var face2 = [face[2],face[3],face[0]];
			triFaces.push(face1, face2);
		}
		else {
			triFaces.push(face);
		}
	}

return {
	triangulatedFaces: triFaces
}
}

module.exports = {
    run: run
};
