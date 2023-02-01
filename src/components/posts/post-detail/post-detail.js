function PostDetail({title, content}) {
    return (
        <>
            <div>
                <h1>{title}</h1>
                <p>{content}</p>
            </div>
            <hr />
            <input type="button" value="Delete" className="btn btn-danger" /> &nbsp; &nbsp;
            <input type="button" value="Edit title" className="btn btn-primary"></input>
        </>
    );
}

export default PostDetail;