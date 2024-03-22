import { useState } from 'react';
import Avatar from './Avatar'
import PropTypes from 'prop-types'
import { ShareAltOutlined, CommentOutlined , LikeOutlined  } from '@ant-design/icons'
import Comment from './Comment'

function Post(props) {
    const [visibleComment, setVisibleComment] = useState(false);
    const { post, username, commentCount, likeCount} = props

    const handleComment = () => {
        setVisibleComment(true)
    }

    const handleOkComment = (comment) => {
        console.log(comment )
        setVisibleComment(false)
    }

    return (
        <div>
            <div className='flex hover:bg-slate-50 p-4 rounded-md'>
                <Avatar username={username} ></Avatar>
                <div className='w-full'>
                    <div className='text-xl'>
                        <span className='font-medium'>{username}</span>
                        <span className='text-slate-500'> @{username} </span>
                    </div>
                    <p className='py-8 cursor-pointer'>{post}</p>
                    <div className='flex justify-between w-1/2 items-center'>
                        <span className='flex items-center cursor-pointer'>
                            <CommentOutlined onClick={handleComment} className='mr-1'/>
                            {commentCount}
                        </span>
                        <span className='flex items-center cursor-pointer'>
                            <LikeOutlined className='mr-1'/>
                            {likeCount}
                        </span>
                        <ShareAltOutlined />
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