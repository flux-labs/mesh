# mesh
A collection of experimental mesh manipulation functions for Flux code blocks. These are candidates for addition to the Flux block library. 

### `areaOfMesh(mesh)`
#### parameters:
* mesh

#### returns:
area of a mesh as a float

### `volumeOfMesh(mesh)`
#### parameters:
* mesh

#### returns:
volume of a closed mesh as a float (will not calculate the right volume for an open mesh)

### `orderVerticesOfMesh(mesh)`
#### parameters:
* mesh

#### returns:
vertices of each mesh face in clockwise order as a list of points

### `meshEdges(mesh)`
#### parameters:
* mesh

#### returns:
all edges of each mesh face as a list of lines

### `triangulateMesh(faces)`
#### parameters:
* mesh faces as a list of lists

#### returns:
triangulated mesh faces as a list of lists
