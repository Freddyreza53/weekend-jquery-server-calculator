
$(ready)

let operator = '';

let solution = 0;
let userInput = '';

function ready() {
    console.log('JS Works!');
    $('#equals').on('click', equalsClicked);
    $('#addition').on('click', additionClicked);
    $('#subtract').on('click', subtractionClicked);
    $('#multiply').on('click', multiplicationClicked);
    $('#divide').on('click', divisionClicked);
    $('#clear').on('click', clearClicked);

    getHistory();
}

function equalsClicked() {
    $('input').removeClass('red');
    $('button').removeClass('red');
    $('#required').empty();

    let firstInput = $('#firstInput').val();
    let secondInput = $('#secondInput').val();

    if (firstInput === '' || secondInput === '') {
        $('#required').text('* All Fields Required');
        $('#addition').addClass('red');
        $('#subtract').addClass('red');
        $('#multiply').addClass('red');
        $('#divide').addClass('red');
        if (firstInput === '') {
            $('#firstInput').addClass('red');
        }
        if (secondInput === '') {
            $('#secondInput').addClass('red');
        }  
        
    }
    else if (operator === '') {
        $('#required').text('* Must Choose Operator');
        $('#addition').addClass('red');
        $('#subtract').addClass('red');
        $('#multiply').addClass('red');
        $('#divide').addClass('red');
    }  
    else {
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
    
}

function clearClicked() {
    operator = '';
    $('button').removeClass('clicked');
    $('input').val('');
}

function additionClicked() {
    $('button').removeClass('red');
    $(this).toggleClass('clicked');
    operator = $(this).text();
    return operator;
}

function subtractionClicked() {
    $('button').removeClass('red');
    $(this).toggleClass('clicked');
    operator = $(this).text();
    return operator;
}

function multiplicationClicked() {
    $('button').removeClass('red');
    $(this).toggleClass('clicked');
    operator = $(this).text();
    return operator;
}

function divisionClicked() {
    $('button').removeClass('red');
    $(this).toggleClass('clicked');
    operator = $(this).text();
    return operator;
}

function getHistory() {
    $.ajax({
        url: '/inputs',
        method: 'GET',
    }).then(function (response) {
        console.log(response);

        showAnswer = response.outputs[response.outputs.length - 1];
        $('#solution').text(showAnswer);

        renderUserInputs(response.inputs, response.outputs);
    
        // $('#userHistory').append(`<li>${userInput}=${answer}</li>`)

    })
}

function renderUserInputs(theInputs, userAnswer) {
    let firstUserInput;
    let operatorUserInput;
    let secondUserInput;
    let finalInput;

    $('#userHistory').empty();

    for (let i = 0; i < theInputs.length; i++) {
        firstUserInput = theInputs[i].firstInput;
        operatorUserInput = theInputs[i].operator;
        secondUserInput = theInputs[i]. secondInput;

        finalInput = firstUserInput + operatorUserInput + secondUserInput;
        $('#userHistory').prepend(`<li>${finalInput}=${userAnswer[i]}</li>`)

    }
    // for(let theInput of theInputs) {
    //     firstUserInput = theInput.firstInput;
    //     operatorUserInput = theInput.operator;
    //     secondUserInput = theInput. secondInput;
    //     for (let answer of userAnswer) {
            
    //         finalInput = firstUserInput + operatorUserInput + secondUserInput;
    //         $('#userHistory').append(`<li>${finalInput}=${answer}</li>`)

    //     }
        
    // }
}

// function renderUserAnswer() {
//     $.ajax({
//         url: '/inputs',
//         method: 'GET',
//     }).then(function (response) {
//         console.log(response);

//         answer = response.outputs[response.outputs.length - 1];
//         console.log(answer);
        
//         // $('#userHistory').append(`<li>${userInput}=${answer}</li>`)

//     })
// }




// function renderUserInputs(theInputs) {
//     let firstUserInput = theInputs.inputs[theInputs.inputs.length - 1].firstInput;
//     let operatorUserInput = theInputs.inputs[theInputs.inputs.length - 1].operator;
//     let secondUserInput = theInputs.inputs[theInputs.inputs.length - 1].secondInput;

//     let finalInput = firstUserInput + operatorUserInput + secondUserInput;

//     return finalInput;
// }

