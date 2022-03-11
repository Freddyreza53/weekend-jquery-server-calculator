
$(ready)

let operator;

let solution = 0;
let userInput = '';

function ready() {
    console.log('JS Works!');
    $('#equals').on('click', equalsClicked);
    $('#addition').on('click', additionClicked);
    $('#subtract').on('click', subtractionClicked);
    $('#multiply').on('click', multiplicationClicked);
    $('#divide').on('click', divisionClicked);

    getHistory();
}

function equalsClicked() {
    let firstInput = $('#firstInput').val();
    let secondInput = $('#secondInput').val();

    $.ajax({
        url: '/inputs',
        method: 'POST',
        data: {
        firstInput: firstInput,
        operator: operator,
        secondInput: secondInput
        }
    }).then(function (response) {
        console.log(response);
    })

    getHistory();
}

function additionClicked() {
    operator = $(this).text();
    return operator;
}

function subtractionClicked() {
    operator = $(this).text();
    return operator;
}

function multiplicationClicked() {
    operator = $(this).text();
    return operator;
}

function divisionClicked() {
    operator = $(this).text();
    return operator;
}

function getHistory() {
    $.ajax({
        url: '/inputs',
        method: 'GET',
    }).then(function (response) {
        console.log(response);

        answer = response.outputs[response.outputs.length - 1];
        userInput = renderUserInputs(response);
        console.log(answer);
        $('#solution').text(answer);
        $('#userHistory').append(`<li>${userInput}=${answer}</li>`)

    })
}

function renderUserInputs(theInputs) {
    let firstUserInput = theInputs.inputs[theInputs.inputs.length - 1].firstInput;
    let operatorUserInput = theInputs.inputs[theInputs.inputs.length - 1].operator;
    let secondUserInput = theInputs.inputs[theInputs.inputs.length - 1].secondInput;

    let finalInput = firstUserInput + operatorUserInput + secondUserInput;

    return finalInput;
}

