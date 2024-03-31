import { rejects } from 'assert';
import bcrypt from 'bcrypt';
import { resolve } from 'path';

const saltRounds = 10;

/**
 * To hash a password, need to generate a salt
 * Eg. values may look like: D;%yL9TS:5PalS/d, )<,-<U(jLezy4j>*
 * rounds , or 'salt rounds', is the cost factor; how much time is spent
 * calculating. Every +1 round doubles time spent.
 * 
 * To hash a password, need to take a salt during hash operation
 * so that digest is not always the same given the same plaintext.
 * Salt generation is included already in this function.
 * plaintext variable is the password in plain text.
 * A string 'hash' is the result of the one-way conversion, and this
 * hash is what is returned and stored in the DB.
 * @param plaintext
 * @returns
 */
export async function hashPassword(plaintext: string) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) {
                console.log("genSalt err:", err);
                reject(String(err));
            } else {
                console.log("genSalt salt:", salt);
                bcrypt.hash(plaintext, salt, function (err, hash) {
                    if (err) {
                        console.log("hashPassword err:", err);
                        reject(String(err));
                    } else {
                        console.log("hashPassword hash:", hash);
                        resolve(hash); // This will return the hashed password
                    }
                });
            }
        });
    });
}





/**
 * To check a password, compare password's hash and password in plain text.
 * @param plaintextPassword 
 * @param hash 
 * @returns 
 */
export async function comparePasswordToHash(plaintextPassword: string, hash: string) {
    let isSame: boolean = false;
    // Load hash from your password DB.
    bcrypt.compare(plaintextPassword, hash, function (err, result) {
        isSame = result;
    });
    return isSame;
}