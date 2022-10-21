require('dotenv').config()
const crypto = require('crypto');
const algorithm = process.env.ALGORITHM;
const key = Buffer.from(process.env.KEY);
const iv = Buffer.from(process.env.IV);

exports.encrypt = (text) => {
    try {
        let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return encrypted.toString('hex');
    } catch (error) {
        return error
    }
}

exports.decrypt = (text) => {
    try {
        let encryptedText = Buffer.from(text, 'hex');
        let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    } catch (error) {
        return error
    }
}


