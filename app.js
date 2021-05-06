var express = require('express')
var app = express()
var os = require('os');
require('dotenv').config()
const cors = require("cors")
app.use(cors());
const MongoClient = require('mongodb').MongoClient;
const url = process.env.CONNECTION_STRING

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/all_meme', function (req, res) {
    //Nom de la DB
    const dbName = 'imagedb'
    //Nom de la collection
    const colName = 'images'

    MongoClient.connect(url, function(err, client) {
        //message d'erreur en cas d'echec de connection
        if (err) throw err;
    
        //initialisation de la db
        var db = client.db(dbName);
        let my_urls = []
        // let my_results = await db.collection(colName).find()
        // console.log(my_results)
        
        //Insert one car on a une array grace au parsing
        db.collection(colName).find({},{projection:{"_id":0,"url":1}}).toArray(function (err, result) {
            if (err) {
                console.log(err);
            } else {
                // let my_urls = []
                // for(let i = 0; i < (result.length - 1); i++)
                // {
                //     my_urls.push(result[i]["url"])
                // } 
                
                // console.log("type:", typeof(JSON.stringify(my_urls)))
                res.send(JSON.stringify(result));
            }
        })
    })
})




app.listen(80, function () {
  console.log('Hello world app listening on port 3000!')
})
