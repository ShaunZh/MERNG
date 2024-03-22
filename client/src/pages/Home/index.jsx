import { useState } from 'react';
import { useQuery, useSubscription } from '@apollo/client'
import { message } from 'antd'
import { QUERY_POSTS,  NEW_SUBSCRIPTION } from '../../graphql/posts';
import PostList from '../../components/PostList';

export default function Home() {
    const [posts, setPosts] = useState([]);
    const { loading, error } = useQuery(QUERY_POSTS, {
        onCompleted(data) {
            setPosts(data.getPosts)
        }
    })
    useSubscription(NEW_SUBSCRIPTION, {
        onSubscriptionData(subData) {
            const data = subData.subscriptionData.data?.postCreated;
            setPosts([data, ...posts])
            message.info('New Post')
        }
    })

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;


    return (
        <div className="w-full min-h-full py-8">
            <PostList postList={posts}  />
        </div>
    )
}
