const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

let inputs = [];

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('server/public'));

app.post(`/inputs`, (req, res) => {
    console.log(`POST inputs`, req.body);
    
    inputs.push(req.body);

    res.sendStatus(201);
})

app.get('/inputs', (req, res) => {
    console.log('GET inputs');
    res.send(inputs);
})





app.listen(PORT, () => {
    console.log ('Server is running on port', PORT)
})