import axios from "axios";
import { useRef, useState } from "react";
import { PostServiceBaseURL } from "../service/posts-service";

function NewPost({onNewPostAdded}) {
    const [post, setPost] = useState({
        title: "",
        content: ""
    });
    const newPostForm = useRef();
    const handleFieldChange = () => {
        const newPost = {
            title: newPostForm.current['title'].value,
            content: newPostForm.current['content'].value
        }
        setPost(newPost);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(PostServiceBaseURL, post)
            .then(data => {
                setPost({
                    title: "",
                    content: ""
                });
                onNewPostAdded(c => c + 1);
            }).catch(error => {
                console.log('Error', error.message)
            });
    }
    return (
        <form ref={newPostForm} onSubmit={handleSubmit}>
                <div className="form-group mt-3">
                    <input type="text" className="form-control" name="title" value={post.title} placeholder="Title" onChange={handleFieldChange} required />
                </div>
                <div className="form-group mt-3">
                    <textarea className="form-control" name="content" rows="5" value={post.content} placeholder="Type the details" onChange={handleFieldChange} required></textarea>
                </div>
                <div className="form-group mt-3">
                    <button type="submit">Submit</button>
                </div>
        </form>
    );
}

export default NewPost;