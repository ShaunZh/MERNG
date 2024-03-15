const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { UserInputError } = require('apollo-server') 

const User = require('../../models/User');
const { SECRET_KEY } = require('../../config');
const { validateRegisterInput } = require('../../util/validators');

module.exports = {
    Mutation: {
        async register(
            _,
            {
                registerInput: { username, email, password, confirmPassword }
            },
            context,
            info) {
            // validate user
            const { errors, valid } = validateRegisterInput(username, password, confirmPassword, email,);

            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }

            // make sure the user doesnot already exist
            const user = await User.findOne({ username });
            if (user) {
                throw new UserInputError('Username is Taken', {
                    errors: {
                        message: 'The username is taken',
                    }
                })
            }
            // hash password and create an user token
            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                username,
                email,
                password,
                createdAt: new Date().toISOString()
            })

            const res = await newUser.save();

            const token = jwt.sign({ 
                id: res.id,
                email: res.email,
                username: res.username,
            }, SECRET_KEY, { expiresIn: '1h' });

            return {
                ...res._doc,
                id: res._id,
                token
            }

        }
    }
}
