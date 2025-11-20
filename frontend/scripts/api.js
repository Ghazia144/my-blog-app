const API_URL = "http://localhost:5000/api";

// Signup request
export async function signupUser(userData) {
    const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });

    return res.json();
}

export async function loginUser(loginData) {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
    });

    return res.json();
}

export async function getAllBlogs() {
    const res = await fetch(`${API_URL}/blogs`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    return res.json();
}

export async function getBlogById(id) {
    const res = await fetch(`${API_URL}/blogs/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store"
    });

    return res.json();
}

export async function createBlog(blogData, token) {
    const res = await fetch(`${API_URL}/blogs/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(blogData)
    });

    return res.json();
}

export async function updateBlogById(id, updatedBlog) {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/blogs/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(updatedBlog),
        cache: "no-store" 
    });

    return res.json();
}


export async function deleteBlogById(id) {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/blogs/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return res.json();
}




