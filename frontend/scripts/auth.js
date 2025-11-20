import { signupUser, loginUser, getAllBlogs } from "./api.js";

const signupForm = document.getElementById("signupForm")

if(signupForm){
    console.log('this is form')
    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const userData = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        }
        const response = await signupUser(userData)
        
        if(response.token){
            localStorage.setItem("token", response.token)
            localStorage.setItem("userId", response._id);
            alert("Sign Up Successful")
            window.location.href = "index.html"
            
        }else{
            alert(response.message || "Sign Up Failed")
        }
    })
}

const loginForm = document.getElementById("loginForm")

if(loginForm){
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const loginData = {
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        }
        const response = await loginUser(loginData)
        
        if(response.token){
            localStorage.setItem("token", response.token)
            alert("Login Successful")
            localStorage.setItem("userId", response._id);
            window.location.href = "index.html"  
        }else{
            alert(response.message || "Login Failed")
        }
    })
}


