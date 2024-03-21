import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { Form, Button, Input, Modal, message } from 'antd'
import { useNavigate } from "react-router-dom";
import { USER_REGISTER } from '../graphql/user';
import { TOKEN_KEY } from "../utils/constants"

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};


const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

function Register() {
    const [errors, setErrors] = useState();
    const navigate = useNavigate();
    const [register] = useMutation(
        USER_REGISTER,
        {
            onError(err) {
                console.log('error', err.graphQLErrors[0])
                setErrors(err.graphQLErrors[0].extensions.messages)
                message.error(err.graphQLErrors[0].message)
            },
            onCompleted(data) {
                const { token } = data;
                sessionStorage.setItem(TOKEN_KEY, token)
                navigate('/home')
                console.log('data', data)
            }
        });

    const handleSubmit = (values) => {
        register({
            variables: {
                ...values
            }
        })
    }
    return (
        <div className="grid place-content-center h-full w-full">
            <Modal
                // closeIcon={false}
                open
                footer={null}
                title="Register"
                width={500}
            >
                <Form
                    name="normal_login"
                    className="login-form"
                    // initialValues={{ remember: true }}
                    onFinish={handleSubmit}
                    autoComplete={false}
                    {...formItemLayout}
                >
                    <Form.Item
                        name="username"
                        label="Username"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                        validateStatus={errors?.username ? 'error' : ''}
                    >
                        <Input placeholder="Username" />
                    </Form.Item>
                    
                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The new password that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" className='w-full'>
                            Register
                        </Button>
                        or <a href="/login">Login</a>
                    </Form.Item>
                </Form>
            </Modal>

        </div>
    )
}

export default Register