import Post from "../post/post";

function AllPosts({posts, deletePost, setSelected }) {
    const postsBlock = posts.map(post => {
        return <Post
            id={post.id}
            key={post.id}
            title={post.title}
            content={post.content}
            deleteProduct={() => { deletePost(post.id) }}
            setSelected={() => { setSelected(post.id) }}
        />
    });

    return (
        <div className="row">
            {postsBlock}
        </div>
    );
}
export default AllPosts;