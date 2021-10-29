const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var fs = require('fs')
const https = require('https');
const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

//parse request of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// calls sync method
const db = require("./models");
db.sequelize.sync();

// drops existing tables and re syncs in development
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the Jungle." });
});

// import routes
require("./routes/tutorial.routes")(app);


// set port, listen for requests
const PORT = process.env.PORT || 8080;


https.createServer({
  key: fs.readFileSync('testdb.key'),
  cert: fs.readFileSync('testdb.cert')
}, app).listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
