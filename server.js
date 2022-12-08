const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.static('public'));

app.get("/", (req,res) => {
    res.send("Hello!");
    res.end();
})

const port = 3000;

app.listen(port, () => {
    console.log("Listening in port: " + port);
})