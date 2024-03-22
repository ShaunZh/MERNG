import { useState } from 'react';
import { Modal, Input, Button, message } from 'antd';
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/client'
import { CREATE_POST } from '../graphql/posts';

const { TextArea } = Input

function Post(props) {
    const { visible, handleClose } = props;
    const [content, setContent] = useState('');
    const [ createPost, {loading} ] = useMutation(
        CREATE_POST,
        {
            onError(err) {
                console.log(err)
                
            },
            onCompleted() {
                handleClose();
            }
        },
    )

    const handleChange = (e) => {
        setContent(e.target.value)
    }

    const handleOk = () => {
        createPost({
            variables: {
                body: content
            }
        })
    }

    return (
        <Modal
            open={visible} 
            title='Post'
            maskClosable={false}
            onCancel={handleClose}
            footer={
                <Button
                    className='mt-4'
                    type="primary"
                    disabled={content.trim() === ''}
                    onClick={handleOk}
                    loading={loading}
                >Post</Button>
            }
        >
            <TextArea
                showCount
                maxLength={200}
                onChange={handleChange}
                placeholder="Please Input"
                style={{ height: 180, resize: 'none' }}
            />

        </Modal>
    )
}

Post.propTypes = {
    visible: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
}

export default Post