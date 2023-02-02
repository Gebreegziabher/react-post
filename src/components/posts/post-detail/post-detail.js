import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import Comments from "../comment/Comments";
import { SeletedPostContext } from "../context/SelectedPostContext";
import { PostServiceBaseURL } from "../service/posts-service";

function PostDetail({ onPostDeleted, onPostEdited }) {

    const idContext = useContext(SeletedPostContext);

    const [postDetail, setPostDetail] = useState({});
    const [isPostTitleFormVisible, setPostTitleFormVisible] = useState(false);
    const [isPostContentFormVisible, setPostContentFormVisible] = useState(false);
    const [commentsState, setCommentsState] = useState([]);

    const fetchPostDetail = () => {
        axios.get(PostServiceBaseURL +"/"+ idContext+"/with-comments")
            .then(response => {
                setPostDetail(response.data);
                const comments = response.data.comments.map(m => { return {id:m.id, name:m.name} });
                setCommentsState(comments);
            })
            .catch(err => console.log(err.message))
    };

    useEffect(() => fetchPostDetail(), [idContext]);

    const onDeletePostClicked = () => {
        axios.delete(PostServiceBaseURL +"/"+ idContext, postDetail)
            .then(response => {
                onPostDeleted(c => c + 1);
            })
            .catch(err => console.log(err.message));
    }

    const onToggleChangeTitleClicked = () => {
        setPostTitleFormVisible(!isPostTitleFormVisible);
    }

    const postTitleForm = useRef();
    const handleTitleChange = () => {
        setPostDetail({
            id: postDetail.id,
            title: postTitleForm.current['title'].value,
            content: postDetail.content
        });
    }

    const onToggleChangeContentClicked = () => {
        setPostContentFormVisible(!isPostContentFormVisible);
    }

    const postContentForm = useRef();
    const handleContentChange = () => {
        setPostDetail({
            id: postDetail.id,
            title: postDetail.title,
            content: postContentForm.current['content'].value
        });
    }

    //Submit update data
    const submitEditedPost = (event) => {
        event.preventDefault();
        axios.put(PostServiceBaseURL +"/"+ idContext, postDetail)
        .then(response => {
            onPostEdited(c => c + 1);
        })
        .catch(err => console.log(err.message));
    };

    return (
        <>
            <div style={{ textAlign: "center" }}>
                <h1>{postDetail.title}</h1>
                <p>{postDetail.content}</p>

                <strong>Comments</strong>
                {commentsState.length !=0 ? <Comments comments={commentsState}/> : <p>{"No comments"}</p>}

                <input type="button" value="Delete" className="btn btn-danger" onClick={onDeletePostClicked} />&nbsp;
                <input type="button" value="Edit title(Toggle)" className="btn btn-primary" onClick={onToggleChangeTitleClicked}></input>&nbsp;
                <input type="button" value="Edit content(Toggle)" className="btn btn-secondary" onClick={onToggleChangeContentClicked}></input>
            </div>
            <div>
                {
                    isPostTitleFormVisible &&
                    <form ref={postTitleForm} onSubmit={submitEditedPost}>
                        <div className="form-group mt-3">
                            <input type="text" className="form-control" name="title" value={postDetail.title} placeholder="Title" onChange={handleTitleChange} required />
                        </div>
                        <div className="form-group mt-3">
                            <button type="submit">Update</button>
                        </div>
                    </form>
                }
                {
                    isPostContentFormVisible &&
                    <form ref={postContentForm} onSubmit={submitEditedPost}>
                        <div className="form-group mt-3">
                            <textarea className="form-control" name="content" rows="5" value={postDetail.content} placeholder="Type the details" onChange={handleContentChange} required></textarea>
                        </div>
                        <div className="form-group mt-3">
                            <button type="submit">Update</button>
                        </div>
                    </form>
                }
            </div>
        </>
    );
}

export default PostDetail;