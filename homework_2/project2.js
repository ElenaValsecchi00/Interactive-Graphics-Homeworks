// Returns a 3x3 transformation matrix as an array of 9 values in column-major order.
// The transformation first applies scale, then rotation, and finally translation.
// The given rotation value is in degrees.
function GetTransform( positionX, positionY, rotation, scale )
{
	rotation = rotation * Math.PI / 180; //transforms from degrees to radians
	return Array( scale*Math.cos(rotation), scale*Math.sin(rotation), 0, scale*(-Math.sin(rotation)), scale*Math.cos(rotation), 0, positionX, positionY, 1 );
}

// Returns a 3x3 transformation matrix as an array of 9 values in column-major order.
// The arguments are transformation matrices in the same format.
// The returned transformation first applies trans1 and then trans2.
function ApplyTransform( trans1, trans2 )
{
	//matrix multiplication
	let el0 = (trans1[0] * trans2[0]) + (trans1[1] * trans2[3]) + (trans1[2] * trans2[6]);
    let el1 = (trans1[0] * trans2[1]) + (trans1[1] * trans2[4]) + (trans1[2] * trans2[7]);
    let el2 = (trans1[0] * trans2[2]) + (trans1[1] * trans2[5]) + (trans1[2] * trans2[8]);
    let el3 = (trans1[3] * trans2[0]) + (trans1[4] * trans2[3]) + (trans1[5] * trans2[6]);
    let el4 = (trans1[3] * trans2[1]) + (trans1[4] * trans2[4]) + (trans1[5] * trans2[7]);
    let el5 = (trans1[3] * trans2[2]) + (trans1[4] * trans2[5]) + (trans1[5] * trans2[8]);
    let el6 = (trans1[6] * trans2[0]) + (trans1[7] * trans2[3]) + (trans1[8] * trans2[6]);
    let el7 = (trans1[6] * trans2[1]) + (trans1[7] * trans2[4]) + (trans1[8] * trans2[7]);
    let el8 = (trans1[6] * trans2[2]) + (trans1[7] * trans2[5]) + (trans1[8] * trans2[8]);
	return Array( el0, el1, el2, el3, el4, el5, el6, el7, el8 );
}
