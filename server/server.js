const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

let history = {
    inputs: [],
    outputs: []
}
// let inputs = [];
// let outputs = [];

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('server/public'));

app.post(`/inputs`, (req, res) => {
    console.log(`POST inputs`, req.body);
    
    let solution = calculate(req.body);
    history.outputs.push(solution)
    history.inputs.push(req.body);

    res.sendStatus(201);
})

function calculate(inputsToCalculate) {
    let firstInput = Number(inputsToCalculate.firstInput);
    let secondInput = Number(inputsToCalculate.secondInput);
    let operator = inputsToCalculate.operator;
    let answer = 0;

    switch (operator) {
        case '+':
            answer = firstInput + secondInput;
            break;
        case '-':
            answer = firstInput - secondInput;
            break;
        case 'x':
            answer = firstInput * secondInput;
            break;
        case '/':
            answer = firstInput / secondInput;
            break;
        default:
            break;
    }
    return answer;
}

app.get('/inputs', (req, res) => {
    console.log('GET inputs', history);
    res.send(history);
})

app.listen(PORT, () => {
    console.log ('Server is running on port', PORT)
})