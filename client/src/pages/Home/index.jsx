import { useQuery } from '@apollo/client'
import { QUERY_POSTS } from '../../graphql/posts';
import PostList from '../../components/PostList';

function DispPosts() {
    const { loading, error, data } = useQuery(QUERY_POSTS)

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    return <PostList postList={data.getPosts}></PostList>
}

export default function Home() {
    return (
        <div className="w-full min-h-full py-8">
            <DispPosts />
        </div>
    )
}
