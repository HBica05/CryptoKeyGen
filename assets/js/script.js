const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
const capitalLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const specialChars = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '[', ']', '{', '}', ';', ':', "'", '"', ',', '.', '<', '>', '/', '?', '|', '~'];
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const message = document.getElementById('message');
/**
 * 
 * @param {*} event 
 * @returns 
 */
function validateForm(event) {
  event.preventDefault();
  message.style.visibility = "hidden";
  const length = parseInt(document.getElementById('length').value);
  const includeSpecialChars = document.getElementById('specialChars').checked;
  const includeCapitalLetters = document.getElementById('capitalLetters').checked;
  const includeNumbers = document.getElementById('numbers').checked;
  if (length < 5 || length > 32) {
    message.innerText = 'Password length must be between 5 and 32 characters.';
    message.style.visibility = "visible";
    return;
  }
  const password = createPassword(length, includeSpecialChars, includeCapitalLetters, includeNumbers);
  document.getElementById('Password').value = password;
}
/**
 * docstring...
 * @param {*} length 
 * @param {*} includeSpecialChars 
 * @param {*} includeCapitalLetters 
 * @param {*} includeNumbers 
 * @returns 
 */
function createPassword(length, includeSpecialChars, includeCapitalLetters, includeNumbers) {
  let charPool = [...letters];
  if (includeSpecialChars) {
    charPool = charPool.concat(specialChars);
  }
  
  if (includeCapitalLetters) {
    charPool = charPool.concat(capitalLetters);
  }
  if (includeNumbers) {
    charPool = charPool.concat(numbers);
  }
  let password = '';
  // loop through the length chosen to generate a random character
  // from the array (charPool)
  for (let i = 0; i < length; i++) {
    // get a random index from 0 to length of charPool
    const randomIndex = Math.floor(Math.random() * charPool.length);
    // append a character on the password
    password += charPool[randomIndex];
  }
  // pass back the randomly created password
  return password;
}
// add a submit event listener for the generate password form when the page loads
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('passwordForm').addEventListener('submit', validateForm);
});
// initially set the visibilty of the message division to hidden
message.style.visibility = "hidden";

// Function to add password to history
function addToHistory(password) {
  const passwordList = document.getElementById('passwordList');
  const li = document.createElement('li');
  li.textContent = password;
  passwordList.prepend(li); // Add new password at the beginning of the list
}

// Function to save password to localStorage
function saveToLocalStorage(password) {
  let passwords = JSON.parse(localStorage.getItem('passwords')) || [];
  passwords.unshift(password); // Add new password at the beginning of the array
  localStorage.setItem('passwords', JSON.stringify(passwords));
}
// Function to load password history from localStorage
function loadPasswordHistory() {
  const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
  passwords.forEach(password => {
    addToHistory(password);
  });
}

// Call loadPasswordHistory on page load
document.addEventListener('DOMContentLoaded', function() {
  loadPasswordHistory();
});