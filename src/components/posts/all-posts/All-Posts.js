import Post from "../post/post";
import "../css/style.css"
import PostForm from "../post-form/PostForm";
import axios from "axios";
import { useEffect, useState } from "react";

function AllPosts() {
    const [postsState, setPostsState] = useState([]);

    const fetchData = () => {
        axios.get("http://localhost:8086/api/v1/posts")
            .then(response => {
                console.log('Success: ', response);
                setPostsState(response.data);
            }).catch(error => {
            });
    }

    useEffect(() => {
        fetchData();
    }, []);

    const postsBlock = postsState.map(m => <Post id={m.id} key={m.id} title={m.title} content={m.content} />);

    return (
        <div className="row">
            {postsBlock}
        </div>
    );
}
export default AllPosts;