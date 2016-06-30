# mesh
A collection of experimental mesh manipulation functions for Flux code blocks. These are candidates for addition to the Flux block library. 

### `areaOfMesh`
#### parameters:
* `mesh`

#### returns:
area of a mesh as a float

### `areaOfEachMeshSurface`
#### parameters:
* `mesh`

#### returns:
an array of areas for the different surfaces of a mesh

### `volumeOfMesh`
#### parameters:
* `mesh`

#### returns:
volume of a closed mesh as a float (will not calculate the right volume for an open mesh)

### `orderVerticesOfMesh`
#### parameters:
* `mesh`

#### returns:
vertices of each mesh face in clockwise order as a list of points

### `meshEdges`
#### parameters:
* `mesh`

#### returns:
* `allEdges`: all edges of each mesh face as a list of lines
* `externalEdges`: only edges with one incident face
* `nonplanarEdges`: only edges whose two incident faces are not planar

### `triangulateMesh`
#### parameters:
* `faces`: mesh faces as a list of lists

#### returns:
triangulated mesh faces as a list of lists

### `getFaceNormals`
#### parameters:
* `mesh`

#### returns:
normal of each face as a list of lists
