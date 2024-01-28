const express = require('express');
const app = express();
let PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static('server/public'));

// Global variable that will contain all of the
// calculation objects:
let calculations = []


// Here's a wonderful place to make some routes:

// GET /calculations
app.get('/calculations', (req, res) => {
  res.send(calculations)
})

// POST /calculations
app.post('/calculations', function (req, res) {
  console.log(req.body);
  let newCalculations = req.body
  let operator = newCalculations.operator

  let result;
  let numOne = parseFloat(newCalculations.numOne);
  let numTwo = parseFloat(newCalculations.numTwo);
  if (operator === '+') {
    result = numOne + numTwo
    console.log(result);
  } else if (operator === '-') {
    result = numOne - numTwo
    console.log(result);
  } else if (operator === '*') {
    result = numOne * numTwo
    console.log(result);
  } else if (operator === '/') {
    result = numOne / numTwo
    console.log(result)
  };
  newCalculations.result = result
  calculations.push({
    numOne: newCalculations.numOne,
    numTwo: newCalculations.numTwo,
    operator: newCalculations.operator,
    result: newCalculations.result
  })
  res.send(201)
  console.log('New Calculations ', calculations)
})


// PLEASE DO NOT MODIFY ANY CODE BELOW THESE BEARS:
// 🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸

// Makes it so you don't have to kill the server
// on 5000 in order to run the tests:
if (process.env.NODE_ENV === 'test') {
  PORT = 5001;
}

// This starts the server...but also stores it in a variable.
// This is weird. We have to do it for testing reasons. There
// is absolutely no need for you to reason about this.
const server = app.listen(PORT, () => {
  console.log('server running on: ', PORT);
});

// server.setTimeout(500)

// This is more weird "for testing reasons" code. There is
// absolutely no need for you to reason about this.
app.closeServer = () => {
  server.close();
}

app.setCalculations = (calculationsToSet) => {
  calculations = calculationsToSet;
}

module.exports = app;
