# mesh
A collection of experimental mesh manipulation functions for Flux code blocks. These are candidates for addition to the Flux block library. 

### `areaOfMesh(mesh)`
Calculates the area of a mesh.

### `areaOfVolume(mesh)`
Calculates the volume of a closed mesh. It will not calculate the right volume for an open mesh. 

### `orderVerticesOfMesh(mesh)`
Returns the ordered vertices of a mesh (clockwise) as a list of points.

### `meshFacetoBoundary(mesh)`
Returns the bounding edges of a mesh face as a list of lines.
