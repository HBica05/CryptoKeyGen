const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
const capitalLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const specialChars = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '[', ']', '{', '}', ';', ':', "'", '"', ',', '.', '<', '>', '/', '?', '|', '~'];
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

/**
 * docstring...
 * @returns 
 */
function validateForm(event) {
    // Prevent form submission
    event.preventDefault();
}
const length = document.getElementById('length').value;
specialChars = document.getElementById('specialChars').checked;
capitalLetters = document.getElementById('capitalLetters').checked;
numbers = document.getElementById('numbers').checked;

if (length < 5 || length > 100) {
    // change this out of an alert and into something that looks nicer
    alert('Only characters between 5 and 100 please :(');
    return false;
}

createPassword(length, specialChars, capitalLetters, numbers);
{
// Prevent form submission
 return false;
}

/**
 * docstring...
 * @param {*} length 
 * @param {*} specialChars 
 * @param {*} capitalLetters 
 * @param {*} numbers 
 */

function createPassword(length, 
    includeSpecialChars, 
    includeCapitalLetters, 
    includeNumbers) {
// Password generation logic goes here
console.log(`Length: ${length}, Special Characters: ${specialChars}, Capital Letters: ${capitalLetters}, Numbers: ${numbers}`);}

 // Add your password generation logic here

  // spread letters in charPool array
  let charPool = [...letters];

  if (includeSpecialChars) {
    // we concatenate special chars into charPool
    charPool = charPool.concat(special_chars);
  }