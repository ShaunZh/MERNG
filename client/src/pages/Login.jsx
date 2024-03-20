import React from 'react'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import {Form, Button, Input } from 'antd'
import { USER_LOGIN } from '../graphql/user';


function Login() {
    const [errors, setErrors] = useState();
    const [login] = useMutation(
        USER_LOGIN,
        {
            onError(err) {
                console.log('error', err.graphQLErrors[0])
                setErrors(err.graphQLErrors[0].extensions.messages)
            },
            onCompleted(data) {
                console.log('data', data)
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
            <div className=''>
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                   
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={handleSubmit}
                    autoComplete="off"
                    
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        validateStatus={errors?.username ? 'error' : ''}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            

        </div>
    )
}

export default Login