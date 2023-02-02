import AllPosts from "../all-posts/All-Posts";
import PostDetail from "../post-detail/post-detail";
import "../css/style.css"
import axios from "axios";
import { useEffect, useState } from "react";
import NewPost from "../new-post/NewPost";

function Dashboard() {
    const [postsState, setPostsState] = useState([]);
    const [selectedState, setSelectedState] = useState(0);
    const [fetchCountState, setFetchCountState] = useState(1);

    const fetchData = () => {
        axios.get("http://localhost:8086/api/v1/posts")
            .then(response => {
                setPostsState(response.data);
            }).catch(error => {
        });
    }

    useEffect(() => fetchData(), [fetchCountState]);

    const setSelected = (id) => {
        setSelectedState(id);
    }

    const onNewPostAdded = (newState) => {
        setFetchCountState(newState);
    }

    const onPostDeleted = (newState) => {
        setFetchCountState(newState);
        setSelectedState(0);
    }

    const onPostEdited = (newState) => {
        setFetchCountState(newState);
    }

    return (
        <>
            <p>Total: {fetchCountState} fetches</p>
            <AllPosts
                posts={postsState}
                setSelected={setSelected} />
            <hr />
            <div className="row">
                <div className="col-6">
                    <div className="component">
                        <h4>New Post</h4>
                        <NewPost onNewPostAdded={onNewPostAdded} />
                    </div>
                </div>
                {
                    selectedState !== 0 &&
                    <div className="col-6">
                        <div className="component">
                            <h4>Selected Post</h4>
                            <PostDetail
                                id={selectedState}
                                onPostDeleted={onPostDeleted} 
                                onPostEdited={onPostEdited}/>
                        </div>
                    </div>
                }
            </div>
        </>
    );
}

export default Dashboard;