// Renders a full project case-study page from PROJECTS based on ?slug=.

document.addEventListener("DOMContentLoaded", () => {
  initNavBasics();
  fillSiteLinks();

  const slug = new URLSearchParams(location.search).get("slug");
  const project = PROJECTS.find((p) => p.slug === slug);
  const root = document.getElementById("project-root");

  if (!project) {
    root.innerHTML = `
      <div class="not-found">
        <p class="section-kicker">404</p>
        <h1>Project not found</h1>
        <p>The case study you're looking for doesn't exist or moved.</p>
        <a href="index.html#projects" class="btn btn-primary">Back to projects</a>
      </div>`;
    document.title = "Project not found — J Gaurav Varma";
    return;
  }

  document.title = `${project.title} — J Gaurav Varma`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", project.tagline);

  root.innerHTML = renderHeader(project) + renderBody(project);
  initReveal();
  initDeepDiveAccordion();
});

function initNavBasics() {
  const nav = document.getElementById("site-nav");
  window.addEventListener("scroll", () => nav?.classList.toggle("scrolled", window.scrollY > 8), { passive: true });
  document.querySelector(".nav-toggle")?.addEventListener("click", () => document.querySelector(".nav-links")?.classList.toggle("open"));
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
    { threshold: 0.1 }
  );
  targets.forEach((t) => io.observe(t));
}

function initDeepDiveAccordion() {
  document.querySelectorAll(".dd-item-head").forEach((head) => {
    head.addEventListener("click", () => head.closest(".dd-item").classList.toggle("open"));
  });
}

function list(items) {
  return `<ul class="cs-list">${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;
}

function stackPills(items) {
  return `<div class="cs-stack-grid">${items.map((t) => `<span class="tag">${t}</span>`).join("")}</div>`;
}

function renderHeader(p) {
  return `
  <header class="page-header container reveal">
    <div class="breadcrumb"><a href="index.html">Home</a> / <a href="index.html#projects">Projects</a> / ${p.title}</div>
    <p class="section-kicker">${p.category}${p.timeframe ? " · " + p.timeframe : ""}</p>
    <h1>${p.title}</h1>
    <p class="tagline">${p.tagline}</p>
    <div class="page-header-meta">${stackPills(p.techStack)}</div>
    <div class="page-actions">
      <a href="${p.github}" class="btn btn-outline" ${p.github === "#" ? 'aria-disabled="true" title="Repo link coming soon"' : 'target="_blank" rel="noopener"'}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/></svg>
        GitHub
      </a>
      <a href="${p.demo}" class="btn btn-primary" ${p.demo === "#" ? 'aria-disabled="true" title="Live demo coming soon"' : 'target="_blank" rel="noopener"'}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        Live Demo
      </a>
    </div>
  </header>`;
}

function renderBody(p) {
  return `
  <section class="container case-study">

    <div class="cs-block reveal">
      <h2>Project Overview</h2>
      <p>${p.overview}</p>
    </div>

    <div class="cs-block reveal">
      <h2>Problem Statement</h2>
      <p>${p.problem}</p>
    </div>

    <div class="cs-block reveal" id="architecture">
      <h2>Architecture</h2>
      <p>${p.architecture}</p>
      ${
        p.diagramSvg
          ? `<div class="diagram-wrap" style="margin-top:24px">${p.diagramSvg}</div>`
          : `<div class="placeholder-box" style="margin-top:24px">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v16H4z"/><path d="M4 9h16M9 20V9"/></svg>
              Architecture diagram coming soon
            </div>`
      }
    </div>

    <div class="cs-block reveal">
      <h2>Tech Stack</h2>
      ${stackPills(p.techStack)}
    </div>

    <div class="cs-block reveal">
      <h2>Challenges</h2>
      ${list(p.challenges)}
    </div>

    <div class="cs-block reveal">
      <h2>Scalability</h2>
      <p>${p.scalability}</p>
    </div>

    <div class="cs-block reveal">
      <h2>Performance Optimizations</h2>
      ${list(p.performanceOptimizations)}
    </div>

    <div class="cs-block reveal">
      <h2>Engineering Decisions</h2>
      ${list(p.engineeringDecisions)}
    </div>

    ${
      p.hasDeepDive
        ? `<div class="cs-block reveal">
            <h2>Architecture Deep-Dive</h2>
            ${renderDeepDive(p.deepDive)}
          </div>`
        : ""
    }

    <div class="cs-block reveal">
      <h2>Lessons Learned</h2>
      <p>${p.lessonsLearned}</p>
    </div>

    <div class="cs-block reveal">
      <h2>Future Improvements</h2>
      ${list(p.futureImprovements)}
    </div>

    <div class="cs-block reveal">
      <h2>API Design</h2>
      <div class="placeholder-box">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m6-5h11a2 2 0 0 1 2 2v3M3 8v11a2 2 0 0 0 2 2h3m-5-13h18m-2 13h3a2 2 0 0 0 2-2V8"/></svg>
        Endpoint reference and request/response schema coming soon
      </div>
    </div>

    <div class="cs-block reveal">
      <h2>System Design</h2>
      <div class="placeholder-box">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v16H4z"/><path d="M9 9h6v6H9z"/></svg>
        Detailed system design walkthrough coming soon
      </div>
    </div>

    <div class="cs-block reveal">
      <h2>Gallery</h2>
      <div class="gallery-grid">
        ${[1, 2, 3]
          .map(
            () => `<div class="placeholder-box" style="aspect-ratio:4/3;display:flex;align-items:center;justify-content:center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin:0"><path d="M4 4h16v16H4z"/><circle cx="9" cy="10" r="2"/><path d="M4 16l5-5 4 4 3-3 4 4"/></svg>
            </div>`
          )
          .join("")}
      </div>
    </div>

    <div class="cs-block reveal" style="text-align:center; border-top:1px solid var(--border)">
      <a href="index.html#projects" class="btn btn-outline">← Back to all projects</a>
    </div>

  </section>`;
}

function renderDeepDive(d) {
  const rows = [
    ["Requirements", d.requirements],
    ["High-Level Design", d.hld],
    ["Low-Level Design", d.lld],
    ["Tradeoffs", d.tradeoffs],
    ["Scaling Strategy", d.scaling],
    ["Caching Strategy", d.caching],
    ["Async Processing", d.async],
    ["Database Design", d.dbDesign],
    ["Failure Recovery", d.failureRecovery],
    ["Monitoring", d.monitoring],
    ["Future Scaling", d.futureScaling],
  ];
  return `<div class="deepdive-accordion">
    ${rows
      .map(
        ([label, content], i) => `
      <div class="dd-item ${i === 0 ? "open" : ""}">
        <div class="dd-item-head"><h4>${label}</h4>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
        </div>
        <div class="dd-item-body"><div class="dd-item-body-inner"><div class="dd-item-body-content">
          ${Array.isArray(content) ? list(content).replace('class="cs-list"', "") : `<p>${content}</p>`}
        </div></div></div>
      </div>`
      )
      .join("")}
  </div>`;
}
