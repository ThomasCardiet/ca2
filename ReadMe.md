To use this run:

npm install

short report:

*****IDENTITY API******
The development of this application has begin by creation of node application with identity class (name: String,surname: String,age: Number,height: Number,origins: Array,isAuth: Boolean) and an index.
We need the following npm extensions in this application:
- body-parser: It is responsible for parsing the incoming request bodies in a middleware
- express: It facilitates the rapid development of Node based Web applications
- mongoose: it's a modeling library to use MongoDB
The application has CRUD functionalities (create, read, update, delete). 
For the CREATION part, we need to insert post request with an identity entity with all parameters that class needed. 
For the READ part, we need a get request:
- there is possibility to get all identities without parameter id (/identity) with a simple find() function 
- or you can get a specific object with id (/identity/:id) with a findById() function).
For the UPDATE part, we need to send a put request with the function findByIdAndUpdate() so it’s important to add the ID parameter in the request to specify which entity need to be update and add needed update elements in second parameter.
For the DELETE part, we need a delete request with parameter ID to delete a specific element with function findByIdAndDelete().
To verify that application constantly run we use Postman application with the possibility to verify and send all CRUD request in our application with results and errors.
To stock all our data, a database was needed. For this task we had use MongoDB that we had connected in our index code with the extension mongoose to facilitate exchanges and reduce needed code.

*****IDENTITY REACT APP******
The development of this application has begun by the recuperation of IdentityAPI App to recup database API using Atlas and ran of npm install command to update node_modules file.
The next step was to create a react application inside this project to get a front-end file.
To run the 2 app simultaneously is was necessary to change the port from 3000 to 3001 on index.js of IdentityAPI application and proxy of react application in package.json.
The CRUD needed to create 4 components in components file :
-	Identities.js for list of Identities
-	IdentityAdd.js for adding form with ID
-	IdentityEdit for editing form with ID
-	IdentityView to see specific identity with ID
The next was to install axios and import it on all components to recup with ajax requests all informations needed from IdentityAPI. And save data on state of all components (if necessary) with setState() method.
To connect all this options we needed to add 4 links for the 4 components on App.js with the installation and import of react router dom.
