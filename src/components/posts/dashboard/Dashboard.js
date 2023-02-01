import AllPosts from "../all-posts/All-Posts";
import PostDetail from "../post-detail/post-detail";
import PostForm from "../post-form/PostForm";

function Dashboard() {
    return (
        <>
            <AllPosts />
            <hr />
            <div className="row">
                <div className="col-6">
                    <div className="component">
                        <h4>New Post</h4>
                        <PostForm />
                    </div>
                </div>
                <div className="col-6">
                    <div className="component">
                        <h4>Selected Post</h4>
                        <PostDetail title="Example" content="Detail" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;