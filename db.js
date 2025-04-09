const mongoose = require('mongoose');

//define the MongoDB connection URL
const mongoURL = 'mongodb://localhost:27017/mydatabase'  //replace mydatabase to your database

//set up MongoDB connection
// mongoose.connect(mongoURL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });
mongoose.connect(mongoURL);

//Get default connection
//Mongoose maintain a default representing the MongoDB connection
const db = mongoose.connection;

//Define event listners foe database connection
db.on('connected', () => {
    console.log('connected to MongoDB server');
});
db.on('error', (err) => {
    console.error(' MongoDB connection error:', err);
  });
  
  db.on('disconnected', () => {
    console.log(' MongoDB disconnected');
  });

//export the database connection
  module.exports = db;