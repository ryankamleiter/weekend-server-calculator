console.log('client.js is sourced!');
function onReady() {
    axios({
        method: 'GET',
        url: '/calculations'
    })
        .then(function (response) {
            console.log(response);
            let calculationsFromServer = response.data;
            let historyDiv = document.getElementById('history');
            for (let calculation of calculationsFromServer) {
                historyDiv.innerHTML += `
            <h2>
                ${calculation.numOne} 
                ${calculation.operator} 
                ${calculation.numTwo} 
                 = 
                ${calculation.result}
            </h2>
            `;
            }
            let recentDiv = document.getElementById('recent');
            for (let calculation of calculationsFromServer) {
                recentDiv.innerHTML = `
            <h2>
                Previous calculation: ${calculation.result}
            </h2>
            `;
            }
        }).catch(function (error) {
            console.log(error);
            alert('no bueno')
        })
}
function getCalculationsAndRenderToDom() {
    document.getElementById('history').innerHTML = '';

    axios({
        method: 'GET',
        url: '/calculations'
    })
        .then(function (response) {
            console.log(response);
            let calculationsFromServer = response.data;
            let historyDiv = document.getElementById('history');
            for (let calculation of calculationsFromServer) {
                historyDiv.innerHTML += `
            <h2>
                ${calculation.numOne} 
                ${calculation.operator} 
                ${calculation.numTwo} 
                 = 
                ${calculation.result}
            </h2>
            `;
            }
            let recentDiv = document.getElementById('recent');
            for (let calculation of calculationsFromServer) {
                recentDiv.innerHTML = `
            <h2>
                Previous calculation: ${calculation.result}
            </h2>
            `;
            }
        }).catch(function (error) {
            console.log(error);
            alert('no bueno')
        })
}
let selectedOperator = "";
function setOperator(operator) {
    selectedOperator = operator;
}
function sendCalculationsToServer(event) {
    event.preventDefault();
    console.log('form submitted');

    let numOne = document.getElementById('numOne').value
    // let operator = document.querySelector('.operator').textContent
    let numTwo = document.getElementById('numTwo').value
    let result;
    let operator = selectedOperator
    // let result = document.getElementById('result').textContent
    let newCalculations = {
        numOne: numOne,
        operator: operator,
        numTwo: numTwo,
        result: result
    };
    console.log('new calculations', newCalculations);

    axios({
        method: 'POST',
        url: '/calculations',
        data: newCalculations
    })
        .then(
            function (response) {
                console.log('bueno!');
                // insert render function here
                getCalculationsAndRenderToDom()

                numOne = document.getElementById('numOne').value = ''
                numTwo = document.getElementById('numTwo').value = ''

            }
        )
        .catch(
            function (error) {
                console.log('no bueno', error.response.data)
            }
        )
}
onReady();