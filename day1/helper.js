import sha256 from 'sha256';

/**
 * check email valid, If valid, return true
 * if valid, return false
 * @param {*} email
 */
export const validateEmail = email => {
    //var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //return re.test(String(email).toLowerCase());
    // đoạn lệnh trên thay bằng
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

/**
 * return hashed password to followed sha256.
 * @param {*} password
 */
export const validatePassword = (password) => {
    return password.length >= 8;
}

/**
 * return hashed password to followed sha256.
 * @param {*} password
 */
export const generateHasPass = (password) => {
    return sha256(password);
}

