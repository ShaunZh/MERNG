module.exports.validateRegisterInput = (
    username,
    pasword,
    confirmPassword,
    email
) => {
    const errors = {}
    if (username.trim() === '') {
        errors.username = 'Username must not be empty'
    }
    if (email.trim() === '') {
        errors.email = 'Email must not be empty'
    } else {
        const regEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if (!email.match(regEx)) {
            errors.email = 'Email must be a valid email address'
        }
    }
    if (pasword === '') {
        errors.password = 'Password must not be empty'
    } else if (pasword !== confirmPassword) {
        errors.confirmPassword = 'Passwords must match'
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

module.exports.validateLoginInput = (username, password) => {
    const errors = {}
    if (username.trim() === '') {
        errors.username = 'Username must not be empty'
    }
    if (password === '') {
        errors.password = 'Password must not be empty'
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}