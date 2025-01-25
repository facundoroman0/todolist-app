document.addEventListener("DOMContentLoaded", () => {
    const storedName = localStorage.getItem("username");
    if (storedName) {
      window.location.href = "app/index.html"; 
    }

    const loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value;
      localStorage.setItem("username", username);
      window.location.href = "app/index.html"; 
    });
  });