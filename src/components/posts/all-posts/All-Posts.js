import Post from "../post/post";

function AllPosts({posts, setSelected }) {
    const postsBlock = posts.map(post => {
        return <Post
            id={post.id}
            key={post.id}
            title={post.title}
            content={post.content}
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