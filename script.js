const characterAmountRange = document.getElementById('characterAmountRange')
const characterAmountNumber = document.getElementById('characterAmountNumber')
const includeUppercaseElement = document.getElementById('includeUppercase')
const includeNumbersElement = document.getElementById('includeNumbers')
const includeSymbolsElement = document.getElementById('includeSymbols')
const form = document.getElementById('passwordGeneratorForm')
const passwordDisplay = document.getElementById('passwordDisplay')

const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90)  //passing  A and Z (ASCII code)
const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122)  //passing a and z
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57)     // passing 1 and 9
const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 47).concat(arrayFromLowToHigh(58, 64)).concat(arrayFromLowToHigh(91, 96)).concat(arrayFromLowToHigh(123, 126))///special characters
characterAmountNumber.addEventListener('input', syncCharacterAmount);
characterAmountRange.addEventListener('input', syncCharacterAmount);

form.addEventListener('submit', e => {
  e.preventDefault()
  const characterAmount = characterAmountNumber.value
  const includeUppercase = includeUppercaseElement.checked  //return boolean that it is checked or not
  const includeNumbers = includeNumbersElement.checked     //return boolean that it is checked or not
  const includeSymbols = includeSymbolsElement.checked     //return boolean that it is checked or not 
  const password = generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols)
  passwordDisplay.innerText = password;
})

function generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols) {
  let charCodes = LOWERCASE_CHAR_CODES;     //default character
  if (includeUppercase) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES);
  if (includeSymbols) charCodes = charCodes.concat(SYMBOL_CHAR_CODES);
  if (includeNumbers) charCodes = charCodes.concat(NUMBER_CHAR_CODES);
  
  const passwordCharacters = [];
  for (let i = 0; i < characterAmount; i++) {
    const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)];
    passwordCharacters.push(String.fromCharCode(characterCode)) ;//convert into ascii to string
  }
  return passwordCharacters.join("");
}

function arrayFromLowToHigh(low, high) {
  const array = []
  for (let i = low; i <= high; i++) {
    array.push(i)
  }
  return array;
}

function syncCharacterAmount(e) {
  const value = e.target.value
  characterAmountNumber.value = value;
  characterAmountRange.value = value;
}