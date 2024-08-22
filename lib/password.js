function checkPasswordStrength(password) {
    let strength = 0;

    if (password.length >= 8) strength++;  // Length of at least 8 characters
    if (password.match(/[a-z]/)) strength++;  // Contains lowercase letters
    if (password.match(/[A-Z]/)) strength++;  // Contains uppercase letters
    if (password.match(/[0-9]/)) strength++;  // Contains digits
    if (password.match(/[^a-zA-Z0-9]/)) strength++;  // Contains special characters

    let strengthMessage;
    switch (strength) {
        case 5:
            strengthMessage = "Very Strong";
            break;
        case 4:
            strengthMessage = "Strong";
            break;
        case 3:
            strengthMessage = "Moderate";
            break;
        case 2:
            strengthMessage = "Weak";
            break;
        default:
            strengthMessage = "Very Weak";
    }

    return strengthMessage;
}

function generatePassword(length = 8, useUppercase=true, useLowercase=true, useNumbers=true, useSpecialChars=false) {
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const specialChars = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/~`";

    let allChars = "";
    let password = "";

    // Ensure at least one character from each selected category
    if (useLowercase) {
        allChars += lowercaseChars;
        password += lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)];
    }
    if (useUppercase) {
        allChars += uppercaseChars;
        password += uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];
    }
    if (useNumbers) {
        allChars += numberChars;
        password += numberChars[Math.floor(Math.random() * numberChars.length)];
    }
    if (useSpecialChars) {
        allChars += specialChars;
        password += specialChars[Math.floor(Math.random() * specialChars.length)];
    }

    // Fill the rest of the password with random characters from all selected categories
    for (let i = password.length; i < length; i++) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    // Shuffle the password to avoid predictable patterns
    password = password.split('').sort(() => 0.5 - Math.random()).join('');

    return password;
}

export {
    checkPasswordStrength,
    generatePassword
}
