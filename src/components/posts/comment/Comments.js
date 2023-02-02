import Comment from "./Comment";

function Comments(props) {
    const comments = props.comments.map(comment =>
        <Comment
            id={comment.id}
            key={comment.id}
            comment={comment.name} />
    );

    return <ul style={{ textAlign: "left" }}>{comments}</ul>;
}

export default Comments;