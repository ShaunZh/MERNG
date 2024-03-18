import { useQuery } from '@apollo/client'
import { QUERY_POSTS } from '../../graphql/posts';


function DispPosts() {
    const { loading, error, data } = useQuery(QUERY_POSTS)

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    console.log(data);
    return data.getPosts.map(({ id, post, username, commentCount, likeCount }) => (
        <div key={id}>
            <h3>{post} - {username}</h3>
            <br />
            <div>commentCount: {commentCount}</div>
            <br />
            <div>likeCount: {likeCount}</div>
        </div>
    ));
}

export default function Home() {
    return (
        <div>
            Home
            <p>Posts</p>
            <div>
                <DispPosts />
            </div>
        </div>
    )
}
