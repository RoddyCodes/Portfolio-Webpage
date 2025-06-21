// blog/post.js

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const postFile = params.get("post");

  const titleElement = document.getElementById("post-title");
  const contentElement = document.getElementById("post-content");

  if (!postFile) {
    contentElement.innerHTML = "<p>Error: No post specified.</p>";
    return;
  }

  const postPath = `posts/${postFile}.md`;

  fetch(postPath)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Post not found.");
      }
      return response.text();
    })
    .then((markdown) => {
      const converter = new showdown.Converter();
      const html = converter.makeHtml(markdown);

      const formattedTitle = postFile
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());
      titleElement.textContent = formattedTitle;

      contentElement.innerHTML = html;
    })
    .catch((error) => {
      titleElement.textContent = "Error";
      contentElement.innerHTML = `<p>Sorry, we couldn't load the blog post. Please check the URL and try again.</p>`;
      console.error("Error fetching post:", error);
    });
});
