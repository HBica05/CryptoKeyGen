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
// Get form values
const length = document.getElementById('length').value;
specialChars = document.getElementById('specialChars').checked;
capitalLetters = document.getElementById('capitalLetters').checked;
numbers = document.getElementById('numbers').checked;
