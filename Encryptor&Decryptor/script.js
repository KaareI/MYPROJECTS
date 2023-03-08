// ENCRYPT
function encryptText(inputText, shift) {
    let encryptedText = ""; // Create an empty string to hold the encrypted text

    for (let i = 0; i < inputText.length; i++) {
        let charCode = inputText.charCodeAt(i); // Get the ASCII code of the current character

        // If the character is uppercase
        if (charCode >= 65 && charCode <= 90) {
            charCode = ((charCode - 65 + shift) % 26) + 65; // Apply the shift and wrap around if necessary
        }

        // If the character is lowercase
        else if (charCode >= 97 && charCode <= 122) {
            charCode = ((charCode - 97 + shift) % 26) + 97; // Apply the shift and wrap around if necessary
        }

        encryptedText += String.fromCharCode(charCode); // Add the encrypted character to the output string
    }

    return encryptedText;
}

//Shift encryption
function encrypt(num) {
    // Convert the number to a string and pad with leading zeros if necessary
    const numStr = num.toString().padStart(2, "0");
    
    // Split the string into two characters
    const chars = numStr.split("");
    
    // Swap the first and second characters
    const temp = chars[0];
    chars[0] = chars[1];
    chars[1] = temp;

    // Convert the characters to their ASCII codes and concatenate them
    const asciiCodes = chars.map(char => char.charCodeAt(0));
    let encrypted = parseInt(asciiCodes.join(""));
    
    return encrypted;
  }



// DECRYPT
function decryptText(encryptedText, shift) {
    let decryptedText = "";

    for (let i = 0; i < encryptedText.length; i++) {
        let charCode = encryptedText.charCodeAt(i);

        // If the character is uppercase
        if (charCode >= 65 && charCode <= 90) {
            charCode = ((charCode - 65 - shift + 26) % 26) + 65;
        }

        // If the character is lowercase
        else if (charCode >= 97 && charCode <= 122) {
            charCode = ((charCode - 97 - shift + 26) % 26) + 97;
        }

        decryptedText += String.fromCharCode(charCode);
    }

    return decryptedText;
}

//Shift decryption
function decrypt(encrypted) {

    const numberStr = encrypted.toString(); //Number to string

    const digitStrings = [0, 2].map(index => numberStr.substring(index, index + 2)); //Split the number

    // Swap the places of numbers
    const temp = digitStrings[1];
    digitStrings[1] = digitStrings[0];
    digitStrings[0] = temp;
  
    // Convert the swapped characters to a number
    const decryptedStr = String.fromCharCode(...digitStrings)
    const decrypted = parseInt(decryptedStr);

  
    return decrypted;
  }
  



// add an event listener to the Encrypt button
document.querySelector('.card-front .submit-button').addEventListener('click', function (event) {
    // prevent the form from submitting in the usual way
    event.preventDefault();

    // get the value of the input field
    const input = document.querySelector('.card-front .input-field').value;

    // Generate a random integer between 1 and 25 
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    let shift = 1 + (array[0] % 25);

    // Start text encryption
    const encryptedText = encryptText(input, shift);
    shift = encrypt(shift);

    //Code for decryption
    alert("Your code for decryption is: " + shift)

// display the encrypted text on the webpage
document.getElementById("encryptedText").textContent = encryptedText;
});


// add an event listener to the Decrypt button
document.querySelector('.card-back .submit-button').addEventListener('click', function (event) {
    // prevent the form from submitting in the usual way
    event.preventDefault();

    // get the value of the input field
    const input = document.getElementById("enteredText").value;

    // get the value of the shift used to encrypt the text

    let shift = document.getElementById("code").value;
    shift = decrypt(shift);

    // decrypt the text
    const decryptedText = decryptText(input, shift);

// display the encrypted text on the webpage
document.getElementById("decryptedText").textContent = decryptedText;
});


// Card flipper
    const arrow = document.querySelector('.arrow');
    const card = document.querySelector('.card');

    arrow.addEventListener('click', () => {
        card.classList.toggle('card-flipped');
    });




