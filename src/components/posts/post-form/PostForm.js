import axios from "axios";
import { useEffect, useRef, useState } from "react";

function PostForm() {
    const [post, setPost] = useState({
        title: "",
        content: ""
    });

    //const [newPostCreated, setNewPostCreated] = useState(false);

    const newPostForm = useRef();
    const handleChange = () => {
        const newPost = {
            title: newPostForm.current['title'].value,
            content: newPostForm.current['content'].value
        }
        setPost(newPost);
        //setNewPostCreated(true);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8086/api/v1/posts", post)
            .then(data => {
                console.log('Success', data);
            }).catch(error => {
                console.log('Error', error.message)
            });
    }
    return (
        <form ref={newPostForm} onSubmit={handleSubmit}>
            
                <div className="form-group mt-3">
                    <input type="text" className="form-control" name="title" placeholder="Title" onChange={handleChange} required />
                </div>
                <div className="form-group mt-3">
                    <textarea className="form-control" name="content" rows="5" placeholder="Type the details" onChange={handleChange} required></textarea>
                </div>
                <div className="form-group mt-3">
                    <button type="submit">Submit</button>
                </div>
        </form>
    );
}

export default PostForm;