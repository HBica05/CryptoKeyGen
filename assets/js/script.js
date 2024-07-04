const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
const capitalLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const specialChars = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '[', ']', '{', '}', ';', ':', "'", '"', ',', '.', '<', '>', '/', '?', '|', '~'];
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

function validateForm(event) {
  event.preventDefault();

  const length = parseInt(document.getElementById('length').value);
  const includeSpecialChars = document.getElementById('specialChars').checked;
  const includeCapitalLetters = document.getElementById('capitalLetters').checked;
  const includeNumbers = document.getElementById('numbers').checked;

  if (length < 5 || length > 32) {
    alert('Password length must be between 5 and 32 characters.');
    return;
  }

  const password = createPassword(length, includeSpecialChars, includeCapitalLetters, includeNumbers);
  document.getElementById('Password').value = password;
}

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
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charPool.length);
    password += charPool[randomIndex];
  }

  return password;
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('passwordForm').addEventListener('submit', validateForm);
});
