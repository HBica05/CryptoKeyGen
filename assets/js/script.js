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

if (length < 5 || length > 32) {
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
    //concatenate special chars into charPool
    charPool = charPool.concat(special_chars);
  }

  if (includeCapitalLetters) {
    //concatenate capital letters chars and numbers into charPool
    charPool = charPool.concat(capitalLetters);
  }
  if (includeNumbers) {
    charPool = charPool.concat(numbers);
  }
  let password = '';
  // we loop for requested password length and use random to select 
  // a letter from the charPool
  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charPool.length);
      password += charPool[randomIndex];
  }
  // todo: change this so it shows it on screen
  console.log('the password is: ', password);
  

// Add event listener to the form
document.getElementById('passwordForm').addEventListener('submit', validateForm);
