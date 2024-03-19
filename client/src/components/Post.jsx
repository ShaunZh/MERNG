import { useState } from 'react';
import Avatar from './Avatar'
import PropTypes from 'prop-types'
import Comment from './Comment'

function Post(props) {
    const [visibleComment, setVisibleComment] = useState(false);
    const { id, post, username, commentCount, likeCount} = props

    const handleComment = () => {
        setVisibleComment(true)
    }

    const handleOkComment = (comment) => {
        console.log(comment )
        setVisibleComment(false)
    }
    console.log('props', props, id)

    return (
        <div>
            <div className='flex'>
                <Avatar username={username} ></Avatar>
                <div>
                    <div className='text-xl'>
                        <span className='font-medium'>{username}</span>
                        <span className='text-slate-500'> @{username} </span>
                    </div>
                    <p className=''>{post }</p>
                    <div className='flex justify-between'>
                        <i className="comment icon rounded-full size-8" onClick={handleComment}></i>
                        <i className="thumbs up icon">{commentCount}</i>
                        <i className="thumbs up icon">{ likeCount }</i>
                    </div>
                </div>
            </div>
            {
                visibleComment && 
                <Comment
                    open={visibleComment}
                    handleClose={() => setVisibleComment(false)}
                    handleOk={handleOkComment}
                />

            }

        </div>
    )
}

 Post.propTypes = {
    username: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    post: PropTypes.string.isRequired,
    commentCount: PropTypes.number,
    likeCount: PropTypes.number
}

export default  Post