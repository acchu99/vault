import { AES, enc } from "crypto-js";

function encrypt(password, encryptionKey) {
    const ciphertext = AES.encrypt(
        password,
        encryptionKey
    );

    return ciphertext.toString()
}

function decrypt(cipherText, encryptionKey) {
    const bytes = AES.decrypt(
        cipherText,
        encryptionKey
    );

    return bytes.toString(enc.Utf8);
}

export {
    encrypt,
    decrypt
}