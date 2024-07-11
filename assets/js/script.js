`'use strict'` ;// set parsing and error handling rules

// Constants for character pools
const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
const capitalLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const specialChars = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '[', ']', '{', '}', ';', ':', "'", '"', ',', '.', '<', '>', '/', '?', '|', '~'];
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// DOM elements
const lengthInput = document.getElementById('length');
const specialCharsCheckbox = document.getElementById('specialChars');
const capitalLettersCheckbox = document.getElementById('capitalLetters');
const numbersCheckbox = document.getElementById('numbers');
const message = document.getElementById('message');
const passwordOutput = document.getElementById('Password');
const passwordList = document.getElementById('passwordList');

// Event listener initialization when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeEventListeners(); // Initialize event listeners for form submission and history clearing
  loadPasswordHistory(); // Load password history from localStorage when the page loads
});

// Function to initialize event listeners
function initializeEventListeners() {
  const passwordForm = document.getElementById('passwordForm');
  if (passwordForm) {
    passwordForm.addEventListener('submit', validateForm); // Event listener for form submission
  } else {
    console.error('Could not find passwordForm element');
  }

  const clearHistoryBtn = document.getElementById('clearHistoryBtn');
  if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener('click', clearPasswordHistory); // Event listener for clearing password history
  } else {
    console.error('Could not find clearHistoryBtn element');
  }
}
/**
 * Function to validate form input and generate password
 * @param {*} event 
 * @returns
 */
function validateForm(event) {
  event.preventDefault(); // Prevent form submission
  message.style.visibility = "hidden"; // Hide any previous error message

  // Retrieve input values
  const length = parseInt(lengthInput.value);
  const includeSpecialChars = specialCharsCheckbox.checked;
  const includeCapitalLetters = capitalLettersCheckbox.checked;
  const includeNumbers = numbersCheckbox.checked;

  // Validate at least one option is selected
   if (!includeSpecialChars && !includeCapitalLetters && !includeNumbers) {
    showMessage('Please select at least one option (Special Characters, Capital Letters, or Numbers).');
    return;
  }
  
  // Validate password length
  if (!isValidLength(length)) {
    showMessage('Password length must be between 5 and 32 characters.');
    return;
  }
/**
 * docstring...
 * @param {*} length 
 * @param {*} includeSpecialChars 
 * @param {*} includeCapitalLetters 
 * @param {*} includeNumbers 
 * @returns 
 */
  // Generate password based on user input
  const password = generatePassword(length, includeSpecialChars, includeCapitalLetters, includeNumbers);
  displayPassword(password); // Display generated password
  addToHistory(password); // Add generated password to history
  saveToLocalStorage(password); // Save generated password to localStorage
}

// Function to check if the password length is valid
function isValidLength(length) {
  return length >= 5 && length <= 32;
}

// Function to generate a password based on user preferences
function generatePassword(length, includeSpecialChars, includeCapitalLetters, includeNumbers) {
  let charPool = [...letters]; // Start with lowercase letters

  // Include special characters if selected
  if (includeSpecialChars) {
    charPool = charPool.concat(specialChars);
  }

  // Include capital letters if selected
  if (includeCapitalLetters) {
    charPool = charPool.concat(capitalLetters);
  }

  // Include numbers if selected
  if (includeNumbers) {
    charPool = charPool.concat(numbers);
  }

  let password = '';

  // Generate password of specified length
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charPool.length);
    password += charPool[randomIndex];
  }

  return password;
}

// Function to display the generated password in the output field
function displayPassword(password) {
  passwordOutput.value = password;
}

// Function to show a message in the message area
function showMessage(msg) {
  message.innerText = msg;
  message.style.visibility = "visible";
}

// Function to add the generated password to the password history list
function addToHistory(password) {
  const li = document.createElement('li');
  li.textContent = password;
// Create wrapper div for password and copy button
  const wrapper = document.createElement('div');
  wrapper.style.display = 'flex'; // Ensure flex display to align items horizontally
  wrapper.style.alignItems = 'center'; // Align items vertically
  
// Password text
  const passwordText = document.createElement('span');
  passwordText.textContent = password;
  wrapper.appendChild(passwordText);

// Create copy button
 const copyButton = document.createElement('button');
 copyButton.textContent= 'Copy'; // Set the button to text to 'Copy'
 copyButton.setAttribute('title', 'Copy Password');
 copyButton.classList.add('copy-button'); // Add the 'copy-button' class
 copyButton.addEventListener('click', function() {
  copyToClipboard(password);
  showMessage('Password copied to clipboard!');
 });
 li.appendChild(copyButton);

 passwordList.prepend(li); // Add new password and copy button at the beginning of the list
}

// Function to copy password to clipboard
function copyToClipboard(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

// Function to save the generated password to localStorage
function saveToLocalStorage(password) {
  let passwords = getPasswordsFromLocalStorage(); // Retrieve existing passwords from localStorage
  passwords.unshift(password); // Add new password at the beginning of the array
  localStorage.setItem('passwords', JSON.stringify(passwords)); // Save updated passwords to localStorage
}

// Function to load password history from localStorage
function loadPasswordHistory() {
  const passwords = getPasswordsFromLocalStorage(); // Retrieve passwords from localStorage
  passwords.forEach(password => {
    addToHistory(password); // Add each password to the history list
  });
}

// Function to retrieve passwords from localStorage
function getPasswordsFromLocalStorage() {
  return JSON.parse(localStorage.getItem('passwords')) || []; // Return existing passwords or an empty array if none exist
}

// Function to clear password history from UI and localStorage
function clearPasswordHistory() {
  passwordList.innerHTML = ''; // Clear password history UI
  localStorage.removeItem('passwords'); // Clear password history from localStorage
}
