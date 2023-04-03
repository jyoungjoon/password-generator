// Select the #generate button and add event listener:
const generateBtn = document.querySelector(`#generate`);
generateBtn.addEventListener(`click`, createPassword);

// Declare an object that contains all of possible characters:
const possibleCharacters = {
  uppercase: `ABCDEFGHIJKLMNOPQRSTUVWXYZ`,
  lowercase: `abcdefghijklmnopqrstuvwxyz`,
  number: `0123456789`,
  special: `!\"#$%&'()*+,-./:;<=>?@[]^_\`{|}~`,
};

// Declare a function that generates a random password;
function generateRandomPassword(length, characters) {
  // Create an array with its length set as given in the 1st argument using Array.from();
  return Array.from(
    { length },
    // The created array is then given random characters (using Math.random()) with the 2nd argument passed in;
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
  // then display the message and call createPassword function;
  if (isNaN(parsedLength) || parsedLength < 8 || parsedLength > 128) {
    alert(`Please pick a number from 8 to 128!`);
    return createPassword();
  }

  // Object.entries creates an array of [key, value] pairs with possibleCharacters object;
  const includedCharacters = Object.entries(possibleCharacters);
  let newCharacters = ``;

  // Loop through the array created with Object.entries using for loop;
  // it loops only 4 times since we know that there are just 4 arrays in the array created using Object.entries;
  for (let i = 0; i < 4; i++) {
    let addCharacters = confirm(
      `Do you want ${includedCharacters[i][0]} characters in your password?`
    );

    // If the user clicks 'Ok',
    // then the selected value of [key, value] pair is added to newCharacters string;
    if (addCharacters) {
      newCharacters += includedCharacters[i][1];
    }
  }

  // If no character set is added to newCharacters string;
  // Ask the user to pick at least one set of characters,
  // then return createPassword function;
  if (newCharacters.length === 0) {
    alert(`Please pick at least one character set!`);
    return createPassword();
  }

  // If parsedLength is greater or equal to 20
  // and if it includes at least one of the characters from each of the possibleCharacters object's values,
  // then alert is displayed;
  if (
    parsedLength >= 20 &&
    newCharacters.includes(`a`) &&
    newCharacters.includes(`1`) &&
    newCharacters.includes(`A`) &&
    newCharacters.includes(`!`)
  ) {
    alert(`This password should be unbreakable! 😎`);
  }

  // Generate a password using generateRandomPassword function
  // with specified length (parsedLength) and characters (newCharacters),
  // then assign the generated password to passwordText.value
  const password = generateRandomPassword(parsedLength, newCharacters);
  const passwordText = document.querySelector("#password");
  passwordText.value = password;
}
