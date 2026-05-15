'use strict';

// =============================================
// CHARACTER POOLS
// =============================================
const letters       = 'abcdefghijklmnopqrstuvwxyz'.split('');
const capitalLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const specialChars  = ['!','@','#','$','%','^','&','*','(',')','-','_','=','+','[',']','{','}',';',':','\'','"',',','.','<','>','/','?','|','~'];
const numbers       = ['0','1','2','3','4','5','6','7','8','9'];

// =============================================
// DOM ELEMENTS
// =============================================
const lengthInput             = document.getElementById('length');
const lengthSlider            = document.getElementById('lengthSlider');
const specialCharsCheckbox    = document.getElementById('specialChars');
const capitalLettersCheckbox  = document.getElementById('capitalLetters');
const numbersCheckbox         = document.getElementById('numbers');
const message                 = document.getElementById('message');
const passwordOutput          = document.getElementById('Password');
const passwordList            = document.getElementById('passwordList');
const historyEmpty            = document.getElementById('historyEmpty');
const strengthFill            = document.getElementById('strengthFill');
const strengthText            = document.getElementById('strengthText');

// Store last used options for the refresh button
let lastOptions = null;

// =============================================
// INIT
// =============================================
document.addEventListener('DOMContentLoaded', function () {
  initializeEventListeners();
  loadPasswordHistory();
  updateHistoryEmpty();
});

function initializeEventListeners() {
  const passwordForm = document.getElementById('passwordForm');
  if (passwordForm) {
    passwordForm.addEventListener('submit', validateForm);
  } else {
    console.error('Could not find passwordForm element');
  }

  const clearHistoryBtn = document.getElementById('clearHistoryBtn');
  if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener('click', clearPasswordHistory);
  } else {
    console.error('Could not find clearHistoryBtn element');
  }
}

// =============================================
// SLIDER / NUMBER INPUT SYNC
// =============================================
function syncLength(value) {
  lengthInput.value = value;
}

function syncSlider(value) {
  const clamped = Math.min(32, Math.max(5, parseInt(value) || 5));
  lengthSlider.value = clamped;
}

// =============================================
// FORM VALIDATION & GENERATE
// =============================================
function validateForm(event) {
  event.preventDefault();
  clearMessage();

  const length               = parseInt(lengthInput.value);
  const includeSpecialChars  = specialCharsCheckbox.checked;
  const includeCapitalLetters = capitalLettersCheckbox.checked;
  const includeNumbers       = numbersCheckbox.checked;

  if (!includeSpecialChars && !includeCapitalLetters && !includeNumbers) {
    showMessage('Please select at least one option (Special Characters, Capital Letters, or Numbers).');
    return;
  }

  if (!isValidLength(length)) {
    showMessage('Password length must be between 5 and 32 characters.');
    return;
  }

  // Save options for refresh
  lastOptions = { length, includeSpecialChars, includeCapitalLetters, includeNumbers };

  const password = generatePassword(length, includeSpecialChars, includeCapitalLetters, includeNumbers);
  displayPassword(password);
  updateStrength(password);
  addToHistory(password);
  saveToLocalStorage(password);
  updateHistoryEmpty();
}

function isValidLength(length) {
  return length >= 5 && length <= 32;
}

// =============================================
// GENERATE PASSWORD
// =============================================
function generatePassword(length, includeSpecialChars, includeCapitalLetters, includeNumbers) {
  let charPool = [...letters];

  if (includeSpecialChars)   charPool = charPool.concat(specialChars);
  if (includeCapitalLetters) charPool = charPool.concat(capitalLetters);
  if (includeNumbers)        charPool = charPool.concat(numbers);

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charPool.length);
    password += charPool[randomIndex];
  }
  return password;
}

// =============================================
// DISPLAY & STRENGTH METER
// =============================================
function displayPassword(password) {
  passwordOutput.value = password;
}

function updateStrength(password) {
  const score = getStrengthScore(password);
  const levels = [
    { label: 'Weak',    color: '#ff4d6d', width: '25%'  },
    { label: 'Fair',    color: '#ffb84d', width: '50%'  },
    { label: 'Good',    color: '#6c63ff', width: '75%'  },
    { label: 'Strong',  color: '#00d4aa', width: '100%' },
  ];
  const level = levels[Math.min(score, 3)];
  strengthFill.style.width           = level.width;
  strengthFill.style.backgroundColor = level.color;
  strengthText.textContent           = level.label;
  strengthText.style.color           = level.color;
}

function getStrengthScore(password) {
  let score = 0;
  if (password.length >= 12) score++;
  if (password.length >= 20) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;
  return Math.min(Math.floor(score / 1.5), 3);
}

// =============================================
// COPY & REFRESH (header buttons)
// =============================================
function copyOutput() {
  const val = passwordOutput.value;
  if (!val) return;
  copyToClipboard(val);
  showMessage('✓ Copied to clipboard!', true);
  const btn = document.getElementById('copyOutputBtn');
  btn.innerHTML = '<i class="fa-solid fa-check"></i>';
  setTimeout(() => { btn.innerHTML = '<i class="fa-regular fa-copy"></i>'; }, 1500);
}

function refreshPassword() {
  if (!lastOptions) {
    showMessage('Generate a password first.');
    return;
  }
  const { length, includeSpecialChars, includeCapitalLetters, includeNumbers } = lastOptions;
  const password = generatePassword(length, includeSpecialChars, includeCapitalLetters, includeNumbers);
  displayPassword(password);
  updateStrength(password);
  addToHistory(password);
  saveToLocalStorage(password);
  updateHistoryEmpty();
}

// =============================================
// MESSAGES
// =============================================
function showMessage(msg, isSuccess = false) {
  message.textContent = msg;
  message.className   = isSuccess ? 'success' : '';
  if (isSuccess) {
    setTimeout(clearMessage, 2000);
  }
}

function clearMessage() {
  message.textContent = '';
  message.className   = '';
}

// =============================================
// HISTORY
// =============================================
function addToHistory(password) {
  const li = document.createElement('li');

  const passwordText = document.createElement('span');
  passwordText.textContent = password;
  li.appendChild(passwordText);

  const copyButton = document.createElement('button');
  copyButton.textContent = 'Copy';
  copyButton.setAttribute('title', 'Copy password');
  copyButton.classList.add('copy-button');
  copyButton.addEventListener('click', function () {
    copyToClipboard(password);
    copyButton.textContent = 'Copied!';
    setTimeout(() => { copyButton.textContent = 'Copy'; }, 1500);
  });
  li.appendChild(copyButton);

  passwordList.prepend(li);
}

function updateHistoryEmpty() {
  if (historyEmpty) {
    historyEmpty.style.display = passwordList.children.length === 0 ? 'block' : 'none';
  }
}

// =============================================
// CLIPBOARD
// =============================================
function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity  = '0';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

// =============================================
// LOCAL STORAGE
// =============================================
function saveToLocalStorage(password) {
  let passwords = getPasswordsFromLocalStorage();
  passwords.unshift(password);
  passwords = passwords.slice(0, 20); // Keep max 20
  localStorage.setItem('passwords', JSON.stringify(passwords));
}

function loadPasswordHistory() {
  const passwords = getPasswordsFromLocalStorage();
  passwords.forEach(password => addToHistory(password));
}

function getPasswordsFromLocalStorage() {
  return JSON.parse(localStorage.getItem('passwords')) || [];
}

function clearPasswordHistory() {
  passwordList.innerHTML = '';
  localStorage.removeItem('passwords');
  updateHistoryEmpty();
  showMessage('History cleared.', true);
}