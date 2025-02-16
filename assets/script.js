document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector(".navbar-link-container");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = "rgba(34, 34, 34, 0.9)";
        } else {
            navbar.style.backgroundColor = "#222";
        }
    });
    
    // close mobile nav slide auto
    window.navigation.addEventListener("locationchange", (event) => {
        document.getElementById("menu-check").checked = false;
    })
});
