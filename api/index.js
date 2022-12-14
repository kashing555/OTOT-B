// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
// Initialise the app
let app = express();

// Import routes
let apiRoutes = require("./api-routes");

// ADD THIS
var cors = require('cors');
app.use(cors());

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// Connect to Mongoose and set connection variable
// MongoDB LocalHost
// database = 'mongodb://127.0.0.1/resthub'
// MongoDB Atlas
database = 'mongodb+srv://kashing555:OTOT-B@cluster0.nylcpkf.mongodb.net/test'
mongoose.connect(database, 
    {
        useNewUrlParser: true,
    },
).then(
    () => {
        console.log("MongoDB Successfully Connected");
    },
    (err) => {
        console.log("MongoDB Error:", err);
        console.log("MongoDB connection error. Please make sure MongoDB is running.");
    },
);

var db = mongoose.connection;

// Setup server port
var port = process.env.PORT || 8081;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));

// Use Api routes in the App
app.use('/api', apiRoutes);
// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});

module.exports = app;