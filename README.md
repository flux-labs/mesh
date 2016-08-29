# mesh
A collection of experimental mesh manipulation functions for Flux code blocks. These are candidates for addition to the Flux block library. 

### `MeshArea`
#### Input:
* `mesh`

#### Outputs:
Area of a mesh as a float

### `AreOfMeshFaces`
#### Inputs:
* `Mesh`

#### Outputs:
An array of areas for the different surfaces of a mesh

### `MeshVolume`
#### Inputs:
* `Mesh`

#### Outputs:
Volume of a closed mesh as a float (will not calculate the right volume for an open mesh)

### `OrderMeshVertices`
#### Inputs:
* `Mesh`

#### Outputs:
Vertices of each mesh face in clockwise order as a list of points

### `GetMeshEdges`
#### Inputs:
* `Mesh`

#### Outputs:
* `allEdges`: all edges of each mesh face as a list of lines
* `externalEdges`: only edges with one incident face
* `nonplanarEdges`: only edges whose two incident faces are not planar

### `TriangulateMesh`
#### Inputs:
* `In`: mesh with convex faces with vertices >= 3
(note that this algorithm only deals with convex polygons; fortunately, it seems the sketchup plugin automatically triangulates concave faces)

#### Outputs:
* `Out`: mesh with triangulated faces

### `GetMeshFaceNormals`
#### Inputs:
* `Mesh`

#### Outputs:
Normal of each face as a list of lists
