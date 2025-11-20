import { getBlogById, updateBlogById, deleteBlogById } from "./api.js";

const blogContainer = document.getElementById("blogContainer");
const updateBtn = document.getElementById("updateBlog");

// Get blog ID from URL
const params = new URLSearchParams(window.location.search);
const blogId = params.get("id");

let currentBlog = null;

// Load single blog
async function loadBlog() {
    const blog = await getBlogById(blogId);
    currentBlog = blog;

    blogContainer.innerHTML = `
        <h1 id="blogTitle">${blog.title}</h1>
        <p id="blogContent">${blog.content}</p>
    `;
}

loadBlog();


// -------------------- UPDATE MODE --------------------
updateBtn.addEventListener("click", async () => {
    if (updateBtn.textContent === "Update") {
        // Switch to edit mode
        blogContainer.innerHTML = `
            <input id="editTitle" 
                   value="${currentBlog.title}" 
                   style="width:100%; padding:12px; border-radius:8px; margin-bottom:20px; border:1px solid #ccc">

            <textarea id="editContent"
                      style="width:100%; height:250px; padding:12px; border-radius:8px; border:1px solid #ccc">${currentBlog.content}</textarea>
        `;

        updateBtn.textContent = "Save";
        return;
    }

    // Save mode
    const updatedTitle = document.getElementById("editTitle").value;
    const updatedContent = document.getElementById("editContent").value;

    const updatedBlog = {
        title: updatedTitle,
        content: updatedContent
    };

    const res = await updateBlogById(blogId, updatedBlog);

    if (res.message === "You are not allowed to update this blog") {
        alert(res.message);  // show alert for unauthorized users
        return;
    } else if (res.message === "Blog updated successfully") {
        alert("Blog Updated!");
        window.location.reload();
    } else {
        alert(res.message || "Failed to update blog.");
    }

    // Force reload
    window.location.reload();
});

// -------------------- DELETE BLOG --------------------
const deletebtn = document.getElementById("deleteBlog");

deletebtn.addEventListener("click", async () => {
    const confirmDelete = confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    const res = await deleteBlogById(blogId);

    if (res.message === "You are not allowed to delete this blog") {
        alert(res.message);  // unauthorized
        return;
    } else if (res.message === "Blog deleted successfully") {
        alert("Blog Deleted!");
        window.location.href = "index.html";
    } else {
        alert(res.message || "Failed to delete blog.");
    }

});
