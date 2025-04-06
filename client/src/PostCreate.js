import React , {useState} from "react";
import axios from "axios";

export default function PostCreate({ onPostCreated }) {
  const [title, setTitle] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    await axios.post('http://posts.com/posts/create', { title });
    setTitle('');
    onPostCreated(); // ✅ post sonrası listeyi güncelle
  };

return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Create Post</h3>
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label htmlFor="blogTitle" className="form-label">Blog Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="blogTitle"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Enter blog title"
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