<<<<<<< HEAD
# project2_Transformations
In this project we will implement transformations using JavaScript.

You are given an HTML file that implements a very simple UAV simulation.
The missing part of this application (the part you will implement) consists of two JavaScript function. The first one, GetTransform, returns a 3x3 transformation matrix defined by the given transformation arguments. Correctly implementing this function is sufficient for applying the correct transformation to the UAV body. Here what this function looks like:

function GetTransform( positionX, positionY, rotation, scale )
This function takes 4 input parameters: positionX and positionY define the translation component and the other two parameters define the rotation (in degrees) and the scale components. The returned transformation should first apply scale, then rotation, and finally translation. The transformation is matrix is returned as a 1D array of values in column-major format, such that the array indices correspond to the matrix values as below:

**array[0]	array[3]	array[6]**

**array[1]	array[4]	array[7]**

**array[2]	array[5]	array[8]**


The second function you should implement, ApplyTransform, takes two 3x3 transformation matrices and returns the resulting transformation as a combined 3x3 transformation matrix, all in the same column-major format as above. Here is what this function looks like:


function ApplyTransform( trans1, trans2 )
The returned transformation should first apply trans1 and then trans2. This second function is needed for applying the local transformations of the four propellers before applying the transformation of the UAV body. This is how the propellers are placed at their correct positions.


You are given the following files to help you with this project:


**project2.html**: This file contains the entire implementation, except for the two functions you will implement.

**project2.js**: This file contains the placeholder for the two functions. It is included by the project2.html file. Please make sure to put them in the same directory.

The project2.html file also includes a few image files:

**uav.png**

**propeller.png**

**shadow.png**

**ground.jpg** (image by Giles Hodges)

Complete the two functions in the project2.js file, such that the UAV moves along with its shadow. Then, submit the completed project2.js file on canvas. Please do not rename project2.js in your submission.


Useful tip: Pressing the F4 key reloads the project2.js file without reloading the page, so you can quickly test your implementation.

Useful tip n.2: you can use Visual Studio to debug javascript code.

It is recommended that you check out how the whole application is implemented (see the JavaScript code in the project2.html file.
You can see a demonstration of the result that you should get at this link:
https://graphics.cs.utah.edu/courses/cs4600/fall2023/?prj=2

=======
In this project we will implement an alpha compositing function for raster images using JavaScript.
You are given an HTML file that implements a simple web-based image compositing application. The video on the following link shows how the interface works:
https://youtu.be/QpwfzYpseeo

The missing part of this application (the part you will implement) is the JavaScript function that composites a foreground image onto a background image using alpha blending. Here how that function looks like:

function composite( bgImg, fgImg, fgOpac, fgPos )
This function takes 4 input parameters:

bgImg is the given background image to be modified.
fgImg is the foreground image that is to be composited onto the background image.
fgOpac is the opacity of the foreground image. The alpha values of the foreground image should be scaled using this argument.
fgPos is the position of the foreground image on the background image. It holds x and y coordinates in pixels, such that x=0 and y=0 means that the top-left pixels of the foreground and background images are aligned. Note that the given x and y coordinates can be negative.
This function does not return anything. It just modifies the given background image. The foreground image may have a different size and its position can be negative. The parts of the foreground image that fall outside of the background image should be ignored.

You are given the following files to help you with this project:

project1.html: This file contains the entire implementation of the interface, except for the composite function.
project1.js: This file contains the placeholder for the composite function. It is included by the project1.html file. Please make sure to put them in the same directory.
You can also use these images to test your implementation: background.png, teapot.png, u.png, and star.png.
Complete the composite function in the project1.js file, such that it composites the given foreground image onto the given background image with the given opacity and position arguments for the foreground image. Then, submit the completed project1.js file on canvas. Please do not rename project1.js in your submission.

Useful tip: Pressing the F4 key reloads the project1.js file without reloading the page, so you can quickly test your implementation.
>>>>>>> homework_1/main
