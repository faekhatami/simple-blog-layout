document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.querySelector(".nav-toggle");
  const navList = document.querySelector("nav ul");

  navToggle.addEventListener("click", function () {
    navList.classList.toggle("active");
  });

  const scrollLinks = document.querySelectorAll('a[href^="#"]');
  scrollLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      target.scrollIntoView({ behavior: "smooth" });
    });
  });

  const form = document.getElementById("contactForm");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    fetch("https://example.com/api/submit", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Form submitted successfully!");
        form.reset();
      })
      .catch((error) => {
        alert("There was an error submitting the form.");
        console.error("Error:", error);
      });
  });

  // Fetching dynamic content example
  fetch("https://example.com/api/posts")
    .then((response) => response.json())
    .then((posts) => {
      const main = document.querySelector("main");
      posts.forEach((post) => {
        const article = document.createElement("article");
        article.innerHTML = `
                    <img src="${post.image}" alt="${post.title}">
                    <h2>${post.title}</h2>
                    <p>${post.excerpt}</p>
                    <a href="${post.url}" class="read-more">Read More</a>
                `;
        main.appendChild(article);
      });
    })
    .catch((error) => {
      console.error("Error fetching posts:", error);
    });
});
