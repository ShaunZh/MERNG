import PropTypes from 'prop-types';

function Avatar(props) {
    const { username, avatar } = props;

    if (avatar) {
        return <img className="ui avatar image" src={avatar} alt='avatar' /> 
    }
    return <span
        className='size-10 rounded-full bg-sky-500 text-center leading-8 text-white mr-4 text-2xl' >{username.slice(0, 1)}</span>
}

Avatar.propTypes = {
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    id: PropTypes.string.isRequired
}

export default Avatar;