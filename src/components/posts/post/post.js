function Post({title, content, setSelected}) {
  return (
    <div className="col-lg-4 col-md-6 d-flex align-items-stretch" onClick={setSelected}>
      <div className="icon-box">
        <div className="icon">
          <i className="bx bxl-dribbble"></i>
        </div>
        <h4>{title}</h4>
        <p>{content}</p>
        {/* <input className="btn btn-danger" type="button" value="Delete" onClick={props.deletePost} /> */}
      </div>
    </div>
  );
}

export default Post;