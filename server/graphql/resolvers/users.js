const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const ApolloServerErrorCode = require('@apollo/server/errors');
const { GraphQLError } = require('graphql')


const User = require('../../models/User');
const { SECRET_KEY } = require('../../../config');
const { validateRegisterInput, validateLoginInput } = require('../../util/validators');

const generateToken = (user) => {
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username,
    }, SECRET_KEY, { expiresIn: '1h' }); 
}

module.exports = {
    Mutation: {
        async login(_, { username, password }) {
            const { errors, valid } = validateLoginInput(username, password);
            const user = await User.findOne({ username })

            if (!valid) {
                throw errors;
            }

            if (!user) {
                errors.general = 'User not found';
                throw errors;
            }

            const match = bcrypt.compare(password, user.password)
            if (!match) {
                error.general = 'Wrong crendentials';
                throw errors;
            }

            const token = generateToken(user);
            return {
                ...user._doc,
                id: user._id,
                token
            }
        },
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
                throw errors;
            }

            // make sure the user doesnot already exist
            const user = await User.findOne({ username });
            if (user) {
                throw new GraphQLError('Username is Taken', {
                    extensions: {
                        code: ApolloServerErrorCode.BAD_USER_INPUT,
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

            const token = generateToken(res);

            return {
                ...res._doc,
                id: res._id,
                token
            }

        },
    }
}
