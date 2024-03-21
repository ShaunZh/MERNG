import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { Form, Button, Input, Modal, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useNavigate } from "react-router-dom";
import { USER_LOGIN } from '../graphql/user';
import { TOKEN_KEY } from "../utils/constants"


function Login() {
    const [errors, setErrors] = useState();
    const navigate = useNavigate();
    const [login] = useMutation(
        USER_LOGIN,
        {
            onError(err) {
                console.log('error', err.graphQLErrors[0])
                setErrors(err.graphQLErrors[0].extensions.messages)
                message.warning(err.graphQLErrors[0].message)
            },
            onCompleted(data) {
                const { token } = data;
                sessionStorage.setItem(TOKEN_KEY, token)
                navigate('/home')
            }
        });

    const handleSubmit = (values) => {
        login({
            variables: {
                ...values
            }
        })
    }
    return (
        <div className="grid place-content-center h-full w-full">
            <Modal
                open
                footer={null}
                title="Login"
                width={400}
            >
                <Form
                    name="normal_login"
                    className="login-form"
                    onFinish={handleSubmit}
                    autoComplete={false}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                        validateStatus={errors?.username ? 'error' : ''}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                        validateStatus={errors?.password ? 'error' : ''}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button  type="primary" htmlType="submit" className="login-form-button w-full">
                            Log in
                        </Button>
                        Or <a href="/register">register now!</a>
                    </Form.Item>
                </Form>
            </Modal>

        </div>
    )
}

export default Login