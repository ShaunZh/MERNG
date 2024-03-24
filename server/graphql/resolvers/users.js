const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const ApolloServerErrorCode = require('@apollo/server/errors');
const { GraphQLError } = require('graphql')


const User = require('../../models/User');
const { SECRET_KEY } = require('../../../config');
const { validateRegisterInput, validateLoginInput } = require('../../util/validators');
const checkAuth = require('../../util/check-auth');

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
                throw new GraphQLError('Login error', {
                    extensions: {
                        code: ApolloServerErrorCode.BAD_USER_INPUT,
                        messages: errors
                    }
                })
            }

            if (!user) {
                errors.username = 'User not found';
                throw new GraphQLError('User not found', {
                    extensions: {
                        code: ApolloServerErrorCode.BAD_USER_INPUT,
                        messages: errors
                    }
                })
            }

            const match = await bcrypt.compare(password, user.password)
            if (!match) {
                errors.password = 'Wrong crendentials';
                throw new GraphQLError('Wrong crendentials', {
                    extensions: {
                        code: ApolloServerErrorCode.BAD_USER_INPUT,
                        messages: errors
                    }
                })
            }

            const token = generateToken(user);
            await user.updateOne({ token });

            return {
                ...user._doc,
                id: user._id,
                token
            }
        },
        async logout(_, __, context) {
            const { id } = await checkAuth(context);
            const newUser = await User.findOneAndUpdate({ _id: id }, {
                token: null
            })
            console.log(newUser, 'newUser')
            return {
                success: true,
                message: 'Logout success',
            };
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
                throw new GraphQLError('Register error', {
                    extensions: {
                        code: ApolloServerErrorCode.BAD_USER_INPUT,
                        messages: errors
                    }
                })
            }

            // make sure the user doesnot already exist
            const user = await User.findOne({ username });
            if (user) {
                throw new GraphQLError('Username is Taken', {
                    extensions: {
                        code: ApolloServerErrorCode.BAD_USER_INPUT,
                        messages: {
                            username: 'Username is Taken'
                        }
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
