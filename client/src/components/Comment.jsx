import { useState } from 'react';
import {
    Modal,
    ModalHeader,
    ModalContent,
    ModalActions,
    Button,
    TextArea,
} from 'semantic-ui-react'
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
        <ModalHeader>Comment</ModalHeader>
        <ModalContent >
            <TextArea value={content} onChange={setContent}></TextArea>
        </ModalContent>
        <ModalActions>
                <Button color='black' content="Cancel" onClick={handleClose} />
                <Button
                content="Ok"
                labelPosition='right'
                icon='checkmark'
                positive
            />
        </ModalActions>
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
