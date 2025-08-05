

export default async function uploadBlogPost(formData) {
    if (localStorage.getItem('token') === null) {
        throw new Error('User is not authenticated. Please log in.');
    }
    try{

        const response = await fetch('http://localhost:1231/api/upload/', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: formData
        });

        const data = await response.json();

        if(!response.ok) {
            throw new Error(data.message || 'Failed to upload blog post');
        }
        return data;
    } catch (error) {
        console.error("Error uploading blog post:", error);
        throw error;
    }
}