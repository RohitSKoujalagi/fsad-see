const API_URL = '/api/posts';

// Helper to handle response
const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(error.error || response.statusText);
    }
    return response.json();
};

export const fetchPosts = async () => {
    const response = await fetch(API_URL);
    return handleResponse(response);
};

export const fetchPostById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    return handleResponse(response);
};

export const createPost = async (postData) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
    });
    return handleResponse(response);
};

export const updatePost = async (id, postData) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
    });
    return handleResponse(response);
};

export const deletePost = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    return handleResponse(response);
};

export const fetchComments = async (postId) => {
    const response = await fetch(`${API_URL}/${postId}/comments`);
    return handleResponse(response);
};

export const createComment = async (postId, commentData) => {
    const response = await fetch(`${API_URL}/${postId}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
    });
    return handleResponse(response);
};
