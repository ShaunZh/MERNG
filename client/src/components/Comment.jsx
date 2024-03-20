import { useState } from 'react';
import {
    Modal,
    Button,
    Input
} from 'antd'
import PropTypes from 'prop-types'

function Comment(props) {
    const { open, handleOk, handleClose } = props;
    const [content, setContent] = useState()

    return (
    <Modal
        onClose={handleClose}
        onOpen={() => handleOk(content)}
        open={open}
    >
        <div>Comment</div>
        <div >
            <Input.TextArea value={content} onChange={setContent}></Input.TextArea>
        </div>
        <div>
                <Button color='black' content="Cancel" onClick={handleClose} />
                <Button
                content="Ok"
                labelPosition='right'
                icon='checkmark'
                positive
            />
        </div>
    </Modal>
    )
}

Comment.propTypes = {
    open: PropTypes.bool,
    handleOk: function (content) {
        if (content.trim() === '') {
            return new Error('Please input comment!')
        }
    },
    handleClose: PropTypes.func.isRequired
}

export default Comment;
