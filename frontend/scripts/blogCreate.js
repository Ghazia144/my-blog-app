import { createBlog } from "./api.js";

const form = document.getElementById("createBlogForm");

if (form) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        if (!token) {
            alert("You must be logged in to publish a blog!");
            return;
        }

        const blogData = {
            title: document.getElementById("title").value,
            content: document.getElementById("content").value
        };

        const response = await createBlog(blogData, token);
        console.log("SERVER RESPONSE:", response);
        console.log(response._id)
        if (response.blog && response.blog._id) {
            confirm("Blog published successfully!");
            window.location.href = "index.html";
        } else {
            alert(response.message || "Failed to create blog.");
        }
    });
}
