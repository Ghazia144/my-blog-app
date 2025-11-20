import { getAllBlogs } from "./api.js";

const blogsContainer = document.getElementById("blogsContainer");

async function loadBlogs() {
    const blogs = await getAllBlogs();
    console.log("Blogs fetched:", blogs);

    blogsContainer.innerHTML = ""; // clear container

    blogs.forEach(blog => {
        const div = document.createElement("div");
        div.classList.add("blog-card");
        div.innerHTML = `
            <h3>${blog.title}</h3>
            <p>${blog.content.substring(0, 100)}...</p>
            <a href="blog.html?id=${blog._id}">Read More</a>
        `;
        blogsContainer.appendChild(div);
    });
}

loadBlogs();