import PropTypes from 'prop-types'
import Post from './Post';

function PostList(props) {
    const { postList = [] } = props;
    return (
        <div>
            {
                postList.map(post => (
                    <Post {...post} key={post.id}></Post>
                ))
            }
        </div>
    )
}

PostList.propTypes = {
    postList: PropTypes.arrayOf(PropTypes.shape({
        username: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        post: PropTypes.string.isRequired,
        commentCount: PropTypes.number,
        likeCount: PropTypes.number
    }))
}

export default PostList;