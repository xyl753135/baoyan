type result = {
    isValid: boolean,
    message: string
}

/**
 * Given a string, check if it is a valid email
 * Return an object with two keys: isValid (bool), message (string)
 * If valid, then isValid is true and message is not empty ("").
 * @param email string
 * @returns 
 */
export function validateEmail(email : string) {
    // Populate default values for result object
    let result : result = {
        isValid: true,
        message: ""
    }

    // rulesets for validity
    if (email.length == 0) {
        result.isValid = false;
        result.message = "* 這為必填欄位";
    }

    return result;
}

/**
 * Given a string, check if it is a valid username
 * Return an object with two keys: isValid (bool), message (string)
 * If valid, then isValid is true and message is not empty ("").
 * @param username string
 * @returns 
 */
export function validateUsername(username : string) {
    // Populate default values for result object
    let result : result = {
        isValid: true,
        message: ""
    }

    // rulesets for validity
    if (username.length == 0) {
        result.isValid = false;
        result.message = "* 這為必填欄位";
    }

    return result;
}

/**
 * Given a string, check if it is a valid password
 * Return an object with two keys: isValid (bool), message (string)
 * If valid, then isValid is true and message is not empty ("").
 * @param pw string
 * @returns 
 */
export function validatePassword(pw: string) {
    // Populate default values for result object
    let result : result = {
        isValid: true,
        message: ""
    }

    // rulesets for validity
    if (pw.length == 0) {
        result.isValid = false;
        result.message = "* 這為必填欄位";
    }
    if (pw.length < 8) {
        result.isValid = false;
        result.message = "* 密碼不得少於8個字符";
    }
    if (!(/[A-Z]/.test(pw))) {
        result.isValid = false;
        result.message = "* 密碼要至少一個英文大寫";
    }
    if (!(/[a-z]/.test(pw))) {
        result.isValid = false;
        result.message = "* 密碼不得至少一個英文小寫";
    }
    if (!(/[0-9]/.test(pw))) {
        result.isValid = false;
        result.message = "* 密碼不得至少一個數字";
    }

    return result;
}