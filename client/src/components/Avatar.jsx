import PropTypes from 'prop-types';

function Avatar(props) {
    const { username, avatar } = props;
    return (
        <div>
            {
                avatar ?
                    <img className="ui avatar image" src={avatar} alt='avatar' /> :
                    <span className='avatar'>{username.slice(0, 1)}</span>
            }
            <span>{ username }</span>
        </div>
    )
}

Avatar.propTypes = {
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    id: PropTypes.string.isRequired
}

export default Avatar;