import { useQuery, useSubscription } from '@apollo/client'
import { message } from 'antd'
import { QUERY_POSTS,  NEW_SUBSCRIPTION } from '../../graphql/posts';
import PostList from '../../components/PostList';

function DispPosts() {
    const { loading, error, data } = useQuery(QUERY_POSTS)
    useSubscription(NEW_SUBSCRIPTION, {
        onSubscriptionData(subData) {
            // message.info('')
        }
    })

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
