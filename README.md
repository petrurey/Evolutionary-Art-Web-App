# Evolutionary-Art-Web-App

My 3rd year Computer Science BSc final project: Evolutionary Art Web App. I am using this project to learn more about and consolidate knowledge regarding foundational web technologies like HTML, CSS and JavaScript. I am also hoping to integrate a framework like React once I feel comfortable enough with all the other elements. This project uses the [oCanvas library](http://ocanvas.org/) to simplify the programing of actions like "drag-and-drop" or creating shapes, as well as [JQuery](https://jquery.com/) for some form input retrieval.

## File Descriptions

### ⭐ flowerFractal.js

This script uses trigonomertry to create beautiful "flower" looking recursive shapes. I got inspired from [this tutorial](https://www.youtube.com/watch?v=ymmtEgp0Tuc&t=2s&ab_channel=Frankslaboratory) and converted the code to work with the oCanvas library and further inputs.

### ⭐ fractalFunctions.js

Contains all the fractal functions. These are iterative functions that spawn "fractal-shapes" for circles, squares and polygons.

### ⭐ fractalInteraction.js

Contains all the functions used between user, shape-fractal and trigonometric flower interaction and drawing.

### ⭐ mainArtPage.html

Main page where the web app is run. Contains the canvas, buttons and input forms.

### ⭐ shapeInteractions.js

Contains all the functions used between user and shape object interaction and drawing.

### ⭐ sharedObjects.js

The file containing the functions for all the geometric shape objects, functions shared between shape, flower and shape-fractal drawing.

### ⭐ styleArtPage.css

Main art page styling.
