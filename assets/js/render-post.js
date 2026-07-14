// Renders a blog post page from POSTS based on ?slug=.

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("site-nav");
  window.addEventListener("scroll", () => nav?.classList.toggle("scrolled", window.scrollY > 8), { passive: true });
  fillSiteLinks();

  const slug = new URLSearchParams(location.search).get("slug");
  const post = POSTS.find((p) => p.slug === slug);
  const root = document.getElementById("post-root");

  if (!post) {
    root.innerHTML = `
      <div class="not-found">
        <p class="section-kicker">404</p>
        <h1>Post not found</h1>
        <a href="index.html#writing" class="btn btn-primary">Back to writing</a>
      </div>`;
    document.title = "Post not found — J Gaurav Varma";
    return;
  }

  document.title = `${post.title} — J Gaurav Varma`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", post.excerpt);

  root.innerHTML = `
    <header class="page-header container">
      <div class="breadcrumb"><a href="index.html">Home</a> / <a href="index.html#writing">Writing</a> / ${post.title}</div>
      <p class="section-kicker">${post.date} · ${post.readTime}</p>
      <h1>${post.title}</h1>
      <p class="tagline">${post.excerpt}</p>
      <div class="page-header-meta">${post.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
    </header>
    <section class="container">
      <div class="post-body">${post.body}</div>
      <div style="text-align:center; margin-top:64px; padding-top:40px; border-top:1px solid var(--border)">
        <a href="index.html#writing" class="btn btn-outline">← Back to all writing</a>
      </div>
    </section>`;
});
