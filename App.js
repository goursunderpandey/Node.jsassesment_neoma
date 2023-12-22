const express = require("express");
const app = express();
const PORT = 5000 

require("./Database/Collection.jsx")
const Routes = require("./Router/Routes.jsx")
app.use(Routes);
const datafetch = require("./Datafetch.jsx")
datafetch();

app.listen(PORT,() => {
    console.log("server start ");
})