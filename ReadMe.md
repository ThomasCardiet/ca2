To use this run:

npm install

short report:

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