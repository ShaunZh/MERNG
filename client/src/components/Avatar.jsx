import PropTypes from 'prop-types';

function Avatar(props) {
    const { username, avatar } = props;

    return (
        <div className='flex'>
            {
                avatar ?
                    <img className="ui avatar image" src={avatar} alt='avatar' /> :
                    <span className='rounded-full bg-cyan-300 size-8'>{username.slice(0, 1)}</span>
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