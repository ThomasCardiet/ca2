//declarations and imports
//express for server and routes
const express = require('express')
//bodyParser for x-www-urlencoded (html form like) variables
const bodyParser = require('body-parser')
// defining the actual app to handle the requests (e.g. push, get, etc.)
const app = express()
const port = 3001
// require the driver to connect to the database
const mongoose = require('mongoose')
// require the class constructor from different file
const Identity = require('./indentity.js')
// require path for html include
var path = require('path');
app.engine('html', require('ejs').renderFile);

//app plugins or libraries
//make the app use the bodyParser
app.use(bodyParser.urlencoded({extended:false}))

//show all identities from the database using GET request
app.get('/identity', (req,res) =>{
    //find all identities in the database and store them in the "result" variable
    //use the Model created in the identity.js file to retrieve all identity entries from the database
    Identity.find((err, result)=>{
        //in case there is an error with our Identity model, we we will send it to the user(postman)
        if(err){
            res.send("Error occured no identity retrieved")
            return
        }
        //if no error send the array counting indentity to the user/postman

        //To send html page
        //res.render(__dirname + "/page.html", {
        //    result: result
        //});

        res.send(result)

        //log the result in the console as well
        console.log(result)
    })
})

// FIND ONE BY ID, using a GET REQUEST and A PARAMETER (id)
app.get('/identity/:id', (req,res)=>{
    const id = req.params.id;
    // we use the findById query, details on https://mongoosejs.com/docs/queries.html
    // this query only returns one element
    Identity.findById(id, (err, identity)=>{
        if(err){
            res.send("Identity not found")
            return
        }
        //"identity" is an object file retrieved from the database
        //"identity" will only be defined if there is a identity with the specific id
        // inside the Database
        // for a wrong ID, "identity" will be undefined

        //we will send it back to the user/postman
        res.send(identity)
        console.log(identity)
    })
})

//insert request using POST to add a identity into the database
app.post('/identity',(req,res)=> {
    console.log("Inserting a identity in the database")
    //insert the identity into the database
    // identity.save() // insert the identity into the database

    let identity = new Identity({
        name: req.body.name,
        surname: req.body.surname,
        age: req.body.age,
        height: req.body.height,
        origins: req.body.origins.split(','),
        isAuth: req.body.isAuth === 'true'
    });

    //inserting a identity and checking to see if any errors occured
    identity.save(err => {
        if (err) {
            // if error send a message to let the user know
            res.send(`Identity not inserted into the database ${err}`)
            return
        }

        //send a message to the user with the result
        res.send("Identity inserted into the database")
        console.log("Identity is in the database")
    })
})

// Request to find and delete a identity by id
app.delete('/identity/:id', (req,res)=>{
    // this query find an element and delete it
    Identity.findByIdAndDelete(req.params.id, err=>{
        if(err){
            // if error send a message to let the user know
            res.send("Identity did not delete")
            return
        }
        //send a message to the user with the confirmation
        res.send("Identity deleted")
        console.log(`Identity with ${req.params.id} is now deleted`)
    })
})

// PUT request to update or modify one identity from the database
app.put('/identity/:id', (req,res)=>{
    console.log('Trying to edit identity')
    // find a identity by id and update it
    Identity.findByIdAndUpdate(req.params.id,
        {
            name: req.body.name,
            surname: req.body.surname,
            age: req.body.age,
            height: req.body.height,
            origins: req.body.origins.split(','),
            isAuth: req.body.isAuth === 'true'
        },err=>{
        if(err){
            // if error send a message to let the user know
            res.send(`It didn't edit: ${err}`)
            return
        }

        //send a message to the user with the confirmation
        res.send("It did edit")
    })
})

//start the server
app.listen(port, () => {
    // mongodb connection
    mongoose.connect('mongodb+srv://admin:admin@identityapi.kaouo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority').
    catch(error => console.log(error));
    console.log(`Example app listening at http://localhost:${port}`)
})
