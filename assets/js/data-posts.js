// Writing / System Design blog placeholders — real posts to be written per slug.
window.POSTS = [
  {
    slug: "designing-a-distributed-chat-system",
    title: "How I Designed a Distributed Chat System",
    excerpt: "WebSocket fan-out across instances, Kafka for durable persistence, and why Redis Pub/Sub is the piece that makes horizontal scaling actually work.",
    tags: ["Distributed Systems", "WebSockets", "Kafka"],
    date: "2026-08",
    readTime: "Coming soon",
    body: `<p>Full write-up in progress. This post will walk through the architecture behind the <a href="project.html?slug=distributed-chat-platform">Distributed Real-Time Chat Platform</a> case study — specifically how message delivery stays correct once you run more than one WebSocket instance.</p>
    <h2>What it will cover</h2>
    <ul>
      <li>Why naive multi-instance WebSocket servers break message delivery</li>
      <li>Using Redis Pub/Sub for cross-instance fan-out vs. Kafka for durable persistence</li>
      <li>Service discovery, API gateways, and keeping WebSocket instances stateless with respect to each other</li>
    </ul>
    <p>Check back soon, or read the <a href="project.html?slug=distributed-chat-platform">full project case study</a> for the architecture in detail today.</p>`,
  },
  {
    slug: "high-throughput-rag-pipelines",
    title: "Designing High-Throughput RAG Pipelines",
    excerpt: "Separating ingestion from retrieval, choosing chunking strategies, and why RAG systems live or die on their ingestion pipeline.",
    tags: ["AI Infrastructure", "RAG", "pgvector"],
    date: "2026-08",
    readTime: "Coming soon",
    body: `<p>Full write-up in progress. This post will dig into the ingestion vs. retrieval split behind the <a href="project.html?slug=distributed-rag-platform">Distributed RAG Platform</a>.</p>
    <h2>What it will cover</h2>
    <ul>
      <li>Why coupling ingestion and querying in one request path kills latency for everyone</li>
      <li>Chunking and batching strategies for embedding generation</li>
      <li>Making ingestion idempotent and resumable with Kafka</li>
    </ul>
    <p>Read the <a href="project.html?slug=distributed-rag-platform">full project case study</a> in the meantime.</p>`,
  },
  {
    slug: "scaling-ai-chatbot-thousands-of-users",
    title: "Scaling an AI Chatbot to Thousands of Users",
    excerpt: "Multi-tenancy, distributed locking, and keeping one noisy tenant from degrading everyone else's chat latency.",
    tags: ["Multi-Tenancy", "Scalability", "Redis"],
    date: "2026-09",
    readTime: "Coming soon",
    body: `<p>Full write-up in progress, based on lessons from building the <a href="project.html?slug=ai-chatbot-as-a-service">Multi-Tenant AI Chatbot as a Service</a>.</p>
    <h2>What it will cover</h2>
    <ul>
      <li>Tenant-scoping every cache key and lock name from day one</li>
      <li>Distributed locking with Redis to prevent duplicate crawl/ingestion jobs</li>
      <li>Scaling API and worker tiers independently as tenant count grows</li>
    </ul>`,
  },
  {
    slug: "redis-caching-patterns",
    title: "Redis Caching Patterns I Actually Use",
    excerpt: "Cache-as-source-of-truth, distributed locks, and Pub/Sub fan-out — three patterns that show up in almost every backend I build.",
    tags: ["Redis", "Caching", "Backend"],
    date: "2026-09",
    readTime: "Coming soon",
    body: `<p>Full write-up in progress. Drawing from patterns used across the <a href="project.html?slug=visa-verification-portal">Visa Verification Portal</a> (cache-as-source-of-truth) and <a href="project.html?slug=distributed-chat-platform">Distributed Chat Platform</a> (Pub/Sub fan-out).</p>
    <h2>What it will cover</h2>
    <ul>
      <li>When to make Redis the sole read path instead of a passthrough cache</li>
      <li>Distributed locking for coordinating background jobs</li>
      <li>Pub/Sub for real-time fan-out across horizontally scaled instances</li>
    </ul>`,
  },
  {
    slug: "kafka-for-background-processing",
    title: "Kafka for Background Processing",
    excerpt: "Durable job queues, idempotent consumers, and why offset commits should happen after the write, not before.",
    tags: ["Kafka", "Async Processing"],
    date: "2026-10",
    readTime: "Coming soon",
    body: `<p>Full write-up in progress, covering the ingestion pipelines behind the <a href="project.html?slug=distributed-rag-platform">RAG Platform</a> and <a href="project.html?slug=ai-chatbot-as-a-service">AI Chatbot as a Service</a>.</p>
    <h2>What it will cover</h2>
    <ul>
      <li>Structuring Kafka topics and partitions for ordered, parallelizable ingestion</li>
      <li>Idempotent writes so retried messages never duplicate data</li>
      <li>Committing offsets after a durable write, not before</li>
    </ul>`,
  },
  {
    slug: "designing-event-driven-systems",
    title: "Designing Event-Driven Systems",
    excerpt: "How to decide what belongs on the synchronous request path versus the event bus — and why that decision is the whole architecture.",
    tags: ["System Design", "Event-Driven Architecture"],
    date: "2026-10",
    readTime: "Coming soon",
    body: `<p>Full write-up in progress. A cross-cutting look at the event-driven decisions made across most of the <a href="index.html#projects">projects</a> on this site.</p>
    <h2>What it will cover</h2>
    <ul>
      <li>A simple test for what belongs in-request vs. on an event bus</li>
      <li>Designing for at-least-once delivery and idempotent consumers</li>
      <li>Failure recovery patterns for asynchronous pipelines</li>
    </ul>`,
  },
];
