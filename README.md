Technologies
Pure JS(ES5)( OOP/SOLID );
SVG  
HTML4/5, CSS2/3

Requirements:
I need to create a SPA application (one-page application) using the data https://rickandmortyapi.com/documentation.



Task 1: First page (locations):

Show all locations in the form of rectangles on SVG, each rectangle should be proportional to the number of inhabitants in the location. In the upper left corner of each rectangle, indicate the number of inhabitants.
SVG should occupy the entire browser window.
Rectangles should occupy the maximum SVG area.
When you hover over the location (rectangle), you will see a pop-up window with information about the planet.




Task 2 *: Second page (inhabitants):

When clicking on the rectangle (on the first page), the second page opens with all the inhabitants of the location.
All residents of the selected location are displayed using their square avatars on SVG.
SVG should occupy the entire browser window.
The squares should occupy the maximum area of SVG.
The upper left square is used to switch to the previous page with locations.
When you hover over the character's avatar, a pop-up window with information about it should appear.


Task 3 *: The user can resize the browser window. The content should be redrawn according to the new dimensions.

Notes:

Consider that the number of API calls is limited, so try to cache the downloaded data.
