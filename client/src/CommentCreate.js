import React , {useState} from "react";
import axios from "axios";

export default function CommentCreate({ postId, onPostCreated }) {

    const [content, setContent] = useState("");
    
    const onSubmit = async (event) => {
        event.preventDefault();
        await axios.post(`http://posts.com/posts/${postId}/comments`, {content});
        setContent("");
        onPostCreated();
    }
return (

    <div className="container mt-7">
        <div className="row justify-content-center">
            <div className="col-md-15">
            <div className="card shadow-lg">
                <div className="card-body">
                <h5 className="card-title text-center mb-2">Create Comment</h5>
                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="blogContent"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        placeholder="Enter comment content"
                        required
                    />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Submit</button>
                </form>
                </div>
            </div>
            </div>
        </div>
    </div>
);
}
