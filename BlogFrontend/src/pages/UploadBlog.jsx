import { useState } from "react";
import { uploadBlogPost } from "../services/api";


const UploadBlog = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');

    const user = JSON.parse(localStorage.getItem('user'));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if(user.isAdmin !== true) {
            setError('You do not have permission to upload blog posts.');
            return;
        }

        if(!file) {
            setError('Please select a file to upload');
            return;
        }
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('blogFile', file);

        uploadBlogPost(formData)
            .then((data) => {
                console.log('Blog post uploaded successfully:', data);
                setTitle('');
                setDescription('');
                setFile(null);
            })
            .catch((err) => {
                console.error('Error uploading blog post:', err);
                setError(err.message || 'Failed to upload blog post');
            });
    }

    return (
        <div>
            <h2>Upload a Blog</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input
                        type="text"
                        placeholder="Enter blog title"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label>Description</label>
                    <input
                        type="text"
                        placeholder="Enter blog description"
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label>File</label>
                    <input
                        type="file"
                        required
                        onChange={(e) => setFile(e.target.files[0])}
                    ></input>
                </div>
                <button type="submit">Upload</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    )
}

export default UploadBlog;