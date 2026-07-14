// Shared behavior for index.html: nav, scroll-reveal, counters, accordion, and
// rendering project/architecture/blog cards from the data files.

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initReveal();
  initCounters();
  initExperienceAccordion();
  renderProjectCards();
  renderArchitectureCards();
  renderPostCards();
  renderGithub();
  fillSiteLinks();
});

function fillSiteLinks() {
  document.querySelectorAll("[data-resume-link]").forEach((el) => (el.href = SITE.resumeUrl));
  document.querySelectorAll("[data-github-link]").forEach((el) => (el.href = SITE.githubUrl));
  document.querySelectorAll("[data-linkedin-link]").forEach((el) => (el.href = SITE.linkedinUrl));
  document.querySelectorAll("[data-leetcode-link]").forEach((el) => (el.href = SITE.leetcodeUrl));
  document.querySelectorAll("[data-email-link]").forEach((el) => (el.href = `mailto:${SITE.email}`));
  document.querySelectorAll("[data-email-text]").forEach((el) => (el.textContent = SITE.email));
  document.querySelectorAll("[data-resume-updated]").forEach((el) => {
    el.textContent = new Date(SITE.resumeUpdated).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  });
}

function initNav() {
  const nav = document.getElementById("site-nav");
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");

  window.addEventListener("scroll", () => nav.classList.toggle("scrolled", window.scrollY > 8), { passive: true });

  toggle?.addEventListener("click", () => links.classList.toggle("open"));
  links?.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => links.classList.remove("open")));

  const sections = [...document.querySelectorAll("section[id]")];
  const navLinks = [...document.querySelectorAll(".nav-links a")];
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`));
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  sections.forEach((s) => spy.observe(s));
}

function initReveal() {
  const targets = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  targets.forEach((t, i) => {
    t.style.setProperty("--i", i % 8);
    io.observe(t);
  });
}

function initCounters() {
  const counters = document.querySelectorAll("[data-count-to]");
  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCount(entry.target);
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach((c) => io.observe(c));
}

function animateCount(el) {
  const to = parseFloat(el.dataset.countTo);
  const decimals = el.dataset.countTo.includes(".") ? 1 : 0;
  const duration = 1100;
  const start = performance.now();
  function tick(now) {
    const p = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = (to * eased).toFixed(decimals);
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = to.toFixed(decimals);
  }
  requestAnimationFrame(tick);
}

function initExperienceAccordion() {
  document.querySelectorAll(".exp-head").forEach((head) => {
    head.addEventListener("click", () => head.closest(".exp-card").classList.toggle("open"));
  });
}

function techTags(list, max = 5) {
  return list
    .slice(0, max)
    .map((t) => `<span class="tag">${t}</span>`)
    .join("");
}

function renderProjectCards() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;
  grid.innerHTML = PROJECTS.map(
    (p, i) => `
    <a href="project.html?slug=${p.slug}" class="card project-card reveal" style="--i:${i}">
      <div class="badge-row">
        <span class="project-kind">${p.category}</span>
      </div>
      <h3>${p.title}</h3>
      <p class="tagline">${p.tagline}</p>
      <div class="project-stack">${techTags(p.techStack)}</div>
      <span class="arrow-link">View case study
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </span>
    </a>`
  ).join("");
}

function renderArchitectureCards() {
  const grid = document.getElementById("architecture-grid");
  if (!grid) return;
  const deep = PROJECTS.filter((p) => p.hasDeepDive);
  grid.innerHTML = deep
    .map(
      (p, i) => `
    <a href="project.html?slug=${p.slug}#architecture" class="card arch-card reveal" style="--i:${i}">
      <div class="arch-diagram-thumb">${p.diagramSvg}</div>
      <div class="arch-card-body">
        <h3>${p.title}</h3>
        <p>${p.tagline}</p>
      </div>
    </a>`
    )
    .join("");
}

function renderPostCards() {
  const grid = document.getElementById("posts-grid");
  if (!grid) return;
  grid.innerHTML = POSTS.map(
    (post, i) => `
    <a href="post.html?slug=${post.slug}" class="card post-card reveal" style="--i:${i}">
      <div class="meta-row"><span>${post.date}</span><span>·</span><span>${post.readTime}</span></div>
      <h3>${post.title}</h3>
      <p>${post.excerpt}</p>
      <div class="project-stack">${techTags(post.tags, 3)}</div>
    </a>`
  ).join("");
}

async function renderGithub() {
  const grid = document.getElementById("github-grid");
  if (!grid) return;

  if (!SITE.githubUsername) {
    renderGithubFallback(grid);
    return;
  }

  try {
    const res = await fetch(`https://api.github.com/users/${SITE.githubUsername}/repos?sort=updated&per_page=6`);
    if (!res.ok) throw new Error("GitHub API error");
    const repos = await res.json();
    grid.innerHTML = repos
      .map(
        (r) => `
      <a href="${r.html_url}" target="_blank" rel="noopener" class="card gh-card reveal">
        <div class="gh-card-top">
          <span class="gh-card-name">${r.name}</span>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H8M17 7v9"/></svg>
        </div>
        <p style="font-size:0.88rem">${r.description ?? "No description provided."}</p>
        <div class="gh-stat-row">
          ${r.language ? `<span><span class="gh-lang-dot"></span>${r.language}</span>` : ""}
          <span>★ ${r.stargazers_count}</span>
          <span>⑂ ${r.forks_count}</span>
        </div>
      </a>`
      )
      .join("");
  } catch (e) {
    renderGithubFallback(grid);
  }
}

function renderGithubFallback(grid) {
  const fallback = PROJECTS.slice(0, 6).map((p) => ({
    name: p.slug,
    description: p.tagline,
    techStack: p.techStack,
  }));
  grid.innerHTML = fallback
    .map(
      (r) => `
    <div class="card gh-card reveal">
      <div class="gh-card-top">
        <span class="gh-card-name">${r.name}</span>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H8M17 7v9"/></svg>
      </div>
      <p style="font-size:0.88rem">${r.description}</p>
      <div class="gh-stat-row">
        <span><span class="gh-lang-dot"></span>${r.techStack[0]}</span>
        <span>Repo link coming soon</span>
      </div>
    </div>`
    )
    .join("");
}
