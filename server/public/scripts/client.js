
$(ready)

let operator;

function ready() {
    console.log('JS Works!');
    $('#equals').on('click', equalsClicked);
    $('#addition').on('click', additionClicked);
}

function equalsClicked() {
    let firstInput = $('#firstInput').val();
    let secondInput = $('#secondInput').val();

    $.ajax({
        url: '/inputs',
        method: 'POST',
        data: {
        firstInput: firstInput,
        secondInput: secondInput,
        operator: operator
        }
    }).then(function (response) {
        console.log(response);

    })
}

function additionClicked() {
    operator = $(this).text();
    return operator;
}