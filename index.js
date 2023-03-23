const express = require("express");
const app = express();


//middleware
app.use(express.json());
app.use(express.urlencoded({extended : true}));

//routes
const routes = require("./routes/deckEndpointsRoute")
app.use("/deck", routes);

//localhost port
const port = 5000;
app.listen(port, () => {
    console.log("server running")
}); 

