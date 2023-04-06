// Select the #generate button and add event listener:
const generateBtn = document.querySelector(`#generate`);
generateBtn.addEventListener(`click`, createPassword);

// Declare an object that contains all of possible characters:
const possibleCharacters = {
  uppercase: `ABCDEFGHIJKLMNOPQRSTUVWXYZ`,
  lowercase: `abcdefghijklmnopqrstuvwxyz`,
  number: `01234567890123456789`,
  special: `!\"#$%&'()*+,-./:;<=>?@[]^_\`{|}~`,
};

// Declare a function that generates a random password;
function generateRandomPassword(length, characters) {
  // Create an array with its length set as given in the 1st argument using Array.from();
  return Array.from(
    { length },
    // Array.from is then given a function as its 2nd argument that adds random characters using Math.random();
    () => characters[Math.floor(Math.random() * characters.length)]
    // The array is then joined to form a string using .join(``);
  ).join(``);
}

// Create a new password on user input;
function createPassword() {
  // Ask user for an input then store in passwordLength;
  const passwordLength = prompt(
    `How long should your password be? (8 - 128 characters only)`
  );
  // If the user clicks `cancel`, then display the message and exist the function immediately;
  if (passwordLength === null) {
    alert(`Sad to see you go. Good bye! 😥`);
    return;
  }
  // Parse passwordLength to an integer;
  const parsedLength = parseInt(passwordLength);
  // If parsed input is NaN or if it is less than 8 or greater than 128,
  // then display the message and return createPassword function;
  if (isNaN(parsedLength) || parsedLength < 8 || parsedLength > 128) {
    alert(`Please pick a number from 8 to 128!`);
    return createPassword();
  }

  // Create an empty string which will store user's chosen characters
  let chosenCharacters = ``;
  // Object.entries() creates an array of destructured [type, chars] pairs with possibleCharacters object;
  for (const [type, chars] of Object.entries(possibleCharacters)) {
    // If the user clicks 'Ok',
    // then the selected chars is added to chosenCharacters string;
    // If the user click `Cancel`,
    // then it continues, without adding any chars, to next iteration;
    if (confirm(`Do you want ${type} characters in your password?`)) {
      chosenCharacters += chars;
    } else {
      continue;
    }
  }

  // If no character set is added to chosenCharacters string;
  // Ask the user to pick at least one set of characters,
  // then return createPassword function;
  if (chosenCharacters.length === 0) {
    alert(`Please pick at least one character set!`);
    return createPassword();
  }

  // Only if parsedLength is greater or equal to 20
  // and only if it includes at least one of the characters from each of the possibleCharacters object's values,
  // then alert message is displayed;
  if (
    parsedLength >= 20 &&
    chosenCharacters.includes(`a`) &&
    chosenCharacters.includes(`1`) &&
    chosenCharacters.includes(`A`) &&
    chosenCharacters.includes(`!`)
  ) {
    alert(`This password should be unbreakable! 😎`);
  }

  // Generate a password using generateRandomPassword function
  // with specified length (parsedLength) and characters (chosenCharacters),
  // then assign the generated password to passwordText.value
  const password = generateRandomPassword(parsedLength, chosenCharacters);
  const passwordText = document.querySelector("#password");
  passwordText.value = password;
}