// // function add(a,b){
// //     return a+b;
// // }

// // var add = function(a,b){
// //     return (a+b);
// // }

// var add = (a,b)=>{ return (a+b);}

// var result =  add(4,5);
// console.log(result);

// (function(){
//     console.log('prince is added');
// })();


// function callback(){
//     console.log('prince is calling a callback function');
// }

// const add = function(a, b, callback){
//     var result =  a+b;
//     console.log('result: '+result);   //main function
//     callback();
// }
// add(3,4, callback);



// const add = function(a, b, callback){
//         var result =  a+b;
//         console.log('result: '+result);   //main function
//         callback();
//     }
//     add(3,4, function(){
//         console.log('add completed');
//     });



// file creation
// var fs = require('fs');
// var os = require('os');

// var user = os.userInfo();
// console.log(user);
// console.log(user.username);

// fs.appendFile('greeting.txt', 'hi '+ user.username+ '!\n', ()=>{
//     console.log('file is created');
// } );

// console.log(fs);




// Import the file
// const notes = require('./notes.js');
// console.log('server file is loaded');

// var age = notes.age;
// var result = notes.addnum(age +18, 10);
// console.log(age);
// console.log(result);





//Lodash -> sort the element in the array , etc. Lodash is denoted by '_'.
// const notes = require('./notes.js');
// var _ = require('lodash');

//  console.log('server file is loaded');
//  var age = notes.age;
//  var result = notes.addnum(age +18, 10);
// console.log(age);
// console.log(result);

// var data = ["person","person", 1, 2, 3, 1, 2, 'name','age', '2'];
// var filter =_.uniq(data);
// console.log(filter);

// console.log(_.isString(3));


//Inter Conversion JSON to an Object in Node.js:
// const jsonString = '{"name":"john","age":38,"city":"NewYork"}';  // JSON must be a string with double quotes
// const jsonObject = JSON.parse(jsonString);
// console.log(jsonObject.name);  // Output: john


// const objectToConvert = {
//     name: "Alice",
//     age: 25
// };
// const json = JSON.stringify(objectToConvert); // convert object to json string
// console.log(json);
// console.log(typeof json);



//Server making (API)
//Get method
// const express = require('express')
// const app = express()
//  const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
// app.get('/test', (req, res)=>{
//     res.send('How are You!')
// })
// app.get('/idli', (req, res)=>{
//     var Customised_idli = {
//         name: 'rava idli',
//         size: '10 cm diameter',
//         is_sambhar: true,
//         is_chuitney: false
//     }
//     res.send(Customised_idli)
// })


// app.listen(3000, ()=>{
//     console.log('Listening on port 3000');
// })



//Database setup
// const { MongoClient } = require('mongodb');

// // Connection URI
// const uri = "mongodb://localhost:27017";

// // Create a new MongoClient
// const client = new MongoClient(uri);

// async function run() {
//   try {
//     // Connect to the MongoDB server
//     await client.connect();
//     console.log("✅ Connected to MongoDB");

//     // Select the database and collection you want to work with
//     const db = client.db("testdb");
//     const collection = db.collection("testcollection");

//     // ------------------------------------
//     // Inserting a New Document
//     // ------------------------------------
//     const newDocument = { name: "New Document", value: 42 };
//     const insertResult = await collection.insertOne(newDocument);
//     console.log("📥 Inserted document _id:", insertResult.insertedId);

//     // ------------------------------------
//     // Updating an Existing Document
//     // ------------------------------------
//     // We'll update the document we just inserted.
//     // Filter for the document using its unique _id or any other field.
//     const filter = { _id: insertResult.insertedId };
//     // Update operation: Set the 'value' field to a new value (e.g., 100)
//     const update = { $set: { value: 100 } };
//     const updateResult = await collection.updateOne(filter, update);
//     console.log(`🔄 Matched ${updateResult.matchedCount} document(s) and modified ${updateResult.modifiedCount} document(s)`);

//      // Optional: Print all documents
//     // ------------------------------------
//     const docs = await collection.find().toArray();
//     console.log("📄 All documents:", docs);

//   } catch (err) {
//     console.error("❌ Error:", err);
//   } finally {
//     await client.close();
//     console.log("🔒 MongoDB connection closed");
//   }
// }

// run(); // ✅ Call the function only once here, not inside itself!



//stablish connections with database 
const express =  require('express');
const app = express();
const db = require('./db');

const bodyParser = require('body-parser');  //reuired to change the user provided data to store in the mongo database
app.use(bodyParser.json());

// const Person = require('./models/person');

app.get('/', function (req, res){
    res.send('welcome to my hotel... How ca  i help you?, We have a list of menue');
})

//Import the router files
const personRouters = require('./routes/personRouters');
const menuRoutes = require('./routes/menuRoutes');

//use the routers
app.use('/person', personRouters);
app.use('/menu', menuRoutes);

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the hotel! Check our menu or staff ');
});


app.listen(3000, ()=>{
    console.log('listening on port 3000');
})