// Project case-study data. Each project renders as a card (index.html) and a
// full case-study page (project.html?slug=...). Projects with hasDeepDive
// also power the "Architecture Case Studies" section with an SVG diagram.

function arrowDefs(id) {
  return `<defs><marker id="${id}" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#7c9eff"/></marker></defs>`;
}

const svgRag = `
<svg viewBox="0 0 820 480" fill="none" xmlns="http://www.w3.org/2000/svg" font-family="ui-monospace,monospace">
${arrowDefs("arag")}
<rect x="20" y="210" width="120" height="56" rx="10" fill="#131620" stroke="#33394d"/>
<text x="80" y="243" fill="#eef0f5" font-size="13" text-anchor="middle">Clients</text>
<rect x="190" y="210" width="150" height="56" rx="10" fill="#131620" stroke="#7c9eff"/>
<text x="265" y="234" fill="#eef0f5" font-size="12" text-anchor="middle">FastAPI</text>
<text x="265" y="250" fill="#9aa1b5" font-size="10" text-anchor="middle">Stateless API layer</text>

<!-- sync query path -->
<rect x="400" y="90" width="170" height="56" rx="10" fill="#131620" stroke="#33394d"/>
<text x="485" y="114" fill="#eef0f5" font-size="12" text-anchor="middle">pgvector Search</text>
<text x="485" y="130" fill="#9aa1b5" font-size="10" text-anchor="middle">semantic retrieval</text>

<rect x="620" y="90" width="170" height="56" rx="10" fill="#131620" stroke="#33394d"/>
<text x="705" y="114" fill="#eef0f5" font-size="12" text-anchor="middle">OpenAI API</text>
<text x="705" y="130" fill="#9aa1b5" font-size="10" text-anchor="middle">streaming completion</text>

<rect x="400" y="180" width="170" height="46" rx="10" fill="#131620" stroke="#33394d"/>
<text x="485" y="208" fill="#eef0f5" font-size="12" text-anchor="middle">Redis (cache + session)</text>

<!-- async ingestion path -->
<rect x="400" y="290" width="170" height="46" rx="10" fill="#131620" stroke="#33394d"/>
<text x="485" y="318" fill="#eef0f5" font-size="12" text-anchor="middle">AWS S3 (raw docs)</text>

<rect x="400" y="356" width="170" height="56" rx="10" fill="#131620" stroke="#33394d"/>
<text x="485" y="380" fill="#eef0f5" font-size="12" text-anchor="middle">Kafka job queue</text>
<text x="485" y="396" fill="#9aa1b5" font-size="10" text-anchor="middle">ingestion events</text>

<rect x="620" y="356" width="170" height="56" rx="10" fill="#131620" stroke="#33394d"/>
<text x="705" y="380" fill="#eef0f5" font-size="12" text-anchor="middle">Embedding workers</text>
<text x="705" y="396" fill="#9aa1b5" font-size="10" text-anchor="middle">vectorize + index</text>

<text x="485" y="70" fill="#7c9eff" font-size="11" text-anchor="middle">LOW-LATENCY QUERY PATH</text>
<text x="485" y="345" fill="#38e6c5" font-size="11" text-anchor="middle">ASYNC INGESTION PATH</text>

<line x1="140" y1="230" x2="188" y2="230" stroke="#33394d" stroke-width="1.5" marker-end="url(#arag)"/>
<line x1="340" y1="222" x2="398" y2="200" stroke="#33394d" stroke-width="1.5" marker-end="url(#arag)"/>
<line x1="340" y1="234" x2="398" y2="300" stroke="#33394d" stroke-width="1.5" marker-end="url(#arag)"/>
<line x1="485" y1="226" x2="485" y2="178" stroke="#33394d" stroke-width="1.5" marker-end="url(#arag)"/>
<line x1="570" y1="118" x2="618" y2="118" stroke="#33394d" stroke-width="1.5" marker-end="url(#arag)"/>
<line x1="485" y1="336" x2="485" y2="354" stroke="#33394d" stroke-width="1.5" marker-end="url(#arag)"/>
<line x1="570" y1="384" x2="618" y2="384" stroke="#33394d" stroke-width="1.5" marker-end="url(#arag)"/>
<line x1="705" y1="356" x2="705" y2="146" stroke="#33394d" stroke-width="1.5" stroke-dasharray="4 4"/>
<line x1="705" y1="146" x2="573" y2="118" stroke="#33394d" stroke-width="1.5" marker-end="url(#arag)" stroke-dasharray="4 4"/>
</svg>`;

const svgChatbotSaaS = `
<svg viewBox="0 0 820 460" fill="none" xmlns="http://www.w3.org/2000/svg" font-family="ui-monospace,monospace">
${arrowDefs("asaas")}
<rect x="20" y="190" width="140" height="66" rx="10" fill="#131620" stroke="#33394d"/>
<text x="90" y="216" fill="#eef0f5" font-size="12" text-anchor="middle">Tenant A/B/C</text>
<text x="90" y="232" fill="#9aa1b5" font-size="10" text-anchor="middle">widget / dashboard</text>

<rect x="210" y="190" width="150" height="66" rx="10" fill="#131620" stroke="#7c9eff"/>
<text x="285" y="216" fill="#eef0f5" font-size="12" text-anchor="middle">Next.js + FastAPI</text>
<text x="285" y="232" fill="#9aa1b5" font-size="10" text-anchor="middle">stateless, load-balanced</text>

<rect x="410" y="80" width="160" height="56" rx="10" fill="#131620" stroke="#33394d"/>
<text x="490" y="104" fill="#eef0f5" font-size="12" text-anchor="middle">Redis</text>
<text x="490" y="120" fill="#9aa1b5" font-size="10" text-anchor="middle">cache + distributed lock</text>

<rect x="410" y="190" width="160" height="66" rx="10" fill="#131620" stroke="#33394d"/>
<text x="490" y="216" fill="#eef0f5" font-size="12" text-anchor="middle">Kafka</text>
<text x="490" y="232" fill="#9aa1b5" font-size="10" text-anchor="middle">crawl / ingest / embed workers</text>

<rect x="410" y="300" width="160" height="56" rx="10" fill="#131620" stroke="#33394d"/>
<text x="490" y="324" fill="#eef0f5" font-size="12" text-anchor="middle">PostgreSQL + pgvector</text>
<text x="490" y="340" fill="#9aa1b5" font-size="10" text-anchor="middle">per-tenant vector store</text>

<rect x="620" y="80" width="160" height="56" rx="10" fill="#131620" stroke="#33394d"/>
<text x="700" y="104" fill="#eef0f5" font-size="12" text-anchor="middle">Third-party LLM API</text>
<text x="700" y="120" fill="#9aa1b5" font-size="10" text-anchor="middle">context-aware response</text>

<rect x="620" y="300" width="160" height="56" rx="10" fill="#131620" stroke="#33394d"/>
<text x="700" y="324" fill="#eef0f5" font-size="12" text-anchor="middle">AWS S3 + EC2</text>
<text x="700" y="340" fill="#9aa1b5" font-size="10" text-anchor="middle">document + asset storage</text>

<line x1="160" y1="223" x2="208" y2="223" stroke="#33394d" stroke-width="1.5" marker-end="url(#asaas)"/>
<line x1="360" y1="205" x2="408" y2="120" stroke="#33394d" stroke-width="1.5" marker-end="url(#asaas)"/>
<line x1="360" y1="223" x2="408" y2="223" stroke="#33394d" stroke-width="1.5" marker-end="url(#asaas)"/>
<line x1="490" y1="136" x2="490" y2="188" stroke="#33394d" stroke-width="1.5" marker-end="url(#asaas)"/>
<line x1="570" y1="108" x2="618" y2="108" stroke="#33394d" stroke-width="1.5" marker-end="url(#asaas)"/>
<line x1="490" y1="256" x2="490" y2="298" stroke="#33394d" stroke-width="1.5" marker-end="url(#asaas)"/>
<line x1="570" y1="228" x2="618" y2="328" stroke="#33394d" stroke-width="1.5" marker-end="url(#asaas)"/>
</svg>`;

const svgVisa = `
<svg viewBox="0 0 820 400" fill="none" xmlns="http://www.w3.org/2000/svg" font-family="ui-monospace,monospace">
${arrowDefs("avisa")}
<rect x="20" y="160" width="180" height="66" rx="10" fill="#131620" stroke="#33394d"/>
<text x="110" y="188" fill="#eef0f5" font-size="12" text-anchor="middle">2,500+ Attendees</text>
<text x="110" y="204" fill="#9aa1b5" font-size="10" text-anchor="middle">lookup requests</text>

<rect x="250" y="160" width="180" height="66" rx="10" fill="#131620" stroke="#7c9eff"/>
<text x="340" y="188" fill="#eef0f5" font-size="12" text-anchor="middle">Load-balanced App</text>
<text x="340" y="204" fill="#9aa1b5" font-size="10" text-anchor="middle">1,000+ concurrent users</text>

<rect x="480" y="160" width="160" height="66" rx="10" fill="#131620" stroke="#38e6c5"/>
<text x="560" y="188" fill="#eef0f5" font-size="12" text-anchor="middle">Redis Cache</text>
<text x="560" y="204" fill="#9aa1b5" font-size="10" text-anchor="middle">source of truth for reads</text>

<rect x="480" y="280" width="160" height="56" rx="10" fill="#131620" stroke="#33394d"/>
<text x="560" y="304" fill="#eef0f5" font-size="12" text-anchor="middle">Scheduled Sync Worker</text>
<text x="560" y="320" fill="#9aa1b5" font-size="10" text-anchor="middle">off the request path</text>

<rect x="680" y="280" width="120" height="56" rx="10" fill="#131620" stroke="#33394d"/>
<text x="740" y="304" fill="#eef0f5" font-size="12" text-anchor="middle">Google Sheets</text>
<text x="740" y="320" fill="#9aa1b5" font-size="10" text-anchor="middle">API</text>

<text x="560" y="120" fill="#38e6c5" font-size="11" text-anchor="middle">no per-request external calls → no 403 rate-limit failures</text>

<line x1="200" y1="193" x2="248" y2="193" stroke="#33394d" stroke-width="1.5" marker-end="url(#avisa)"/>
<line x1="430" y1="193" x2="478" y2="193" stroke="#33394d" stroke-width="1.5" marker-end="url(#avisa)"/>
<line x1="560" y1="226" x2="560" y2="278" stroke="#33394d" stroke-width="1.5" stroke-dasharray="4 4"/>
<line x1="640" y1="308" x2="678" y2="308" stroke="#33394d" stroke-width="1.5" marker-end="url(#avisa)"/>
<line x1="560" y1="278" x2="560" y2="228" stroke="#33394d" stroke-width="1.5" marker-end="url(#avisa)" stroke-dasharray="4 4"/>
</svg>`;

const svgChat = `
<svg viewBox="0 0 820 460" fill="none" xmlns="http://www.w3.org/2000/svg" font-family="ui-monospace,monospace">
${arrowDefs("achat")}
<rect x="20" y="200" width="130" height="56" rx="10" fill="#131620" stroke="#33394d"/>
<text x="85" y="233" fill="#eef0f5" font-size="12" text-anchor="middle">WS Clients</text>

<rect x="190" y="200" width="150" height="56" rx="10" fill="#131620" stroke="#7c9eff"/>
<text x="265" y="224" fill="#eef0f5" font-size="12" text-anchor="middle">API Gateway</text>
<text x="265" y="240" fill="#9aa1b5" font-size="10" text-anchor="middle">JWT auth, routing</text>

<rect x="390" y="130" width="150" height="46" rx="10" fill="#131620" stroke="#33394d"/>
<text x="465" y="158" fill="#eef0f5" font-size="12" text-anchor="middle">WS Server 1</text>
<rect x="390" y="200" width="150" height="46" rx="10" fill="#131620" stroke="#33394d"/>
<text x="465" y="228" fill="#eef0f5" font-size="12" text-anchor="middle">WS Server 2</text>
<rect x="390" y="270" width="150" height="46" rx="10" fill="#131620" stroke="#33394d"/>
<text x="465" y="298" fill="#eef0f5" font-size="12" text-anchor="middle">WS Server N</text>
<text x="465" y="112" fill="#9aa1b5" font-size="10" text-anchor="middle">service discovery + config</text>

<rect x="600" y="130" width="160" height="46" rx="10" fill="#131620" stroke="#38e6c5"/>
<text x="680" y="158" fill="#eef0f5" font-size="12" text-anchor="middle">Redis Pub/Sub</text>

<rect x="600" y="200" width="160" height="46" rx="10" fill="#131620" stroke="#33394d"/>
<text x="680" y="228" fill="#eef0f5" font-size="12" text-anchor="middle">Kafka</text>

<rect x="600" y="270" width="160" height="46" rx="10" fill="#131620" stroke="#33394d"/>
<text x="680" y="298" fill="#eef0f5" font-size="12" text-anchor="middle">MySQL</text>
<text x="600" y="340" width="160" height="46" fill="#9aa1b5" font-size="10">Persistence worker</text>

<rect x="390" y="360" width="150" height="46" rx="10" fill="#131620" stroke="#33394d"/>
<text x="465" y="388" fill="#eef0f5" font-size="12" text-anchor="middle">MinIO (media)</text>

<line x1="150" y1="228" x2="188" y2="228" stroke="#33394d" stroke-width="1.5" marker-end="url(#achat)"/>
<line x1="340" y1="215" x2="388" y2="160" stroke="#33394d" stroke-width="1.5" marker-end="url(#achat)"/>
<line x1="340" y1="228" x2="388" y2="228" stroke="#33394d" stroke-width="1.5" marker-end="url(#achat)"/>
<line x1="340" y1="240" x2="388" y2="290" stroke="#33394d" stroke-width="1.5" marker-end="url(#achat)"/>
<line x1="540" y1="153" x2="598" y2="153" stroke="#33394d" stroke-width="1.5" marker-end="url(#achat)"/>
<line x1="598" y1="153" x2="540" y2="220" stroke="#33394d" stroke-width="1.5" marker-end="url(#achat)" stroke-dasharray="4 4"/>
<line x1="540" y1="223" x2="598" y2="223" stroke="#33394d" stroke-width="1.5" marker-end="url(#achat)"/>
<line x1="680" y1="176" x2="680" y2="198" stroke="#33394d" stroke-width="1.5"/>
<line x1="680" y1="246" x2="680" y2="268" stroke="#33394d" stroke-width="1.5" marker-end="url(#achat)"/>
<line x1="465" y1="316" x2="465" y2="358" stroke="#33394d" stroke-width="1.5" marker-end="url(#achat)"/>
</svg>`;

window.PROJECTS = [
  {
    slug: "distributed-rag-platform",
    title: "Distributed RAG Platform for High-Traffic AI Assistants",
    category: "Personal Project",
    company: null,
    timeframe: "2025 — Ongoing",
    tagline: "A horizontally scalable RAG platform that separates slow document ingestion from fast conversational queries, so a large upload never blocks a chat response.",
    techStack: ["FastAPI", "PostgreSQL", "pgvector", "Redis", "Kafka", "AWS S3", "OpenAI API", "Docker"],
    overview: "Most RAG demos fall apart the moment ingestion and querying share a request path — upload a large document and every concurrent chat session stalls behind it. This project is my answer to that: a distributed retrieval-augmented generation platform architected from the ground up to keep low-latency conversational queries and long-running ingestion work on completely separate execution paths, so either can scale independently.",
    problem: "High-concurrency AI assistants need two very different things at once: sub-second responses for conversational queries, and reliable processing of large document uploads that can take minutes to chunk, embed, and index. Coupling them in one synchronous path means ingestion spikes degrade chat latency for every other user on the system.",
    architecture: "Client requests hit a stateless FastAPI layer behind a load balancer. Conversational queries take the synchronous path — embed the query, hit pgvector for semantic retrieval, stream the OpenAI completion straight back to the client, with Redis caching hot queries and session context. Document uploads take the asynchronous path instead: the raw file lands in S3, a Kafka job queue picks up the ingestion event, and a pool of embedding workers chunks, vectorizes, and indexes the document into pgvector without ever touching the request thread a chat user is waiting on.",
    challenges: [
      "Keeping the query path fast while a large document is being ingested in the background on the same vector store",
      "Choosing chunking and embedding batch sizes that balance ingestion throughput against embedding API rate limits",
      "Making the ingestion pipeline idempotent so a retried Kafka message never double-indexes a document",
    ],
    scalability: "Because the query path and the ingestion path are decoupled by Kafka, each scales independently — I can add embedding worker replicas during a bulk-upload spike without touching the API tier that serves chat traffic, and scale the stateless FastAPI tier horizontally behind the load balancer since no session state lives on a single instance.",
    performanceOptimizations: [
      "Redis caching of hot queries and session context to cut repeat round-trips to pgvector",
      "Streaming completions token-by-token instead of waiting for the full response",
      "Batched embedding generation in the ingestion workers to amortize API call overhead",
    ],
    engineeringDecisions: [
      "Chose pgvector over a dedicated vector database to keep operational surface area small — one Postgres instance to run, back up, and reason about instead of two data stores",
      "Used Kafka rather than a simple task queue so ingestion events are durable and replayable if a worker crashes mid-batch",
      "Split query and ingestion into separate execution paths at the architecture level rather than just running ingestion in a background thread, so the two workloads can be scaled, deployed, and rate-limited independently",
    ],
    lessonsLearned: "The biggest lesson was that RAG systems live or die on their ingestion pipeline, not their retrieval logic — retrieval is a solved problem once the data is well-chunked and indexed, but getting ingestion to be idempotent, resumable, and non-blocking is where the real engineering work is.",
    futureImprovements: [
      "Hybrid search combining pgvector similarity with keyword/BM25 ranking",
      "Per-tenant rate limiting on the ingestion queue",
      "Incremental re-embedding when a source document is updated rather than a full re-index",
    ],
    github: "#",
    demo: "#",
    hasDeepDive: true,
    diagramSvg: svgRag,
    deepDive: {
      requirements: [
        "Serve conversational queries in low hundreds of milliseconds regardless of background ingestion load",
        "Support large document uploads (100+ pages) without blocking any other user's request",
        "Horizontal scalability on both the API tier and the ingestion workers independently",
      ],
      hld: "A stateless FastAPI tier fronted by a load balancer handles all inbound traffic. It branches into two paths: a synchronous query path (embed → pgvector search → LLM completion, streamed) and an asynchronous ingestion path (S3 upload → Kafka event → worker pool → pgvector write). Redis sits alongside the query path as a cache; Kafka sits alongside the ingestion path as a durable queue.",
      lld: "Ingestion workers consume from a partitioned Kafka topic keyed by tenant/document ID so a single document's chunks are processed in order by one worker, while different documents parallelize freely across partitions. Each worker writes chunk embeddings in batches inside a transaction, and commits its Kafka offset only after the batch is durably written — giving at-least-once processing with idempotent writes keyed on (document_id, chunk_index).",
      tradeoffs: "Chose eventual consistency for ingestion (a document may take seconds to become searchable) in exchange for query-path latency that never degrades under ingestion load. Also chose pgvector over a specialized vector DB, trading some raw ANN search performance at very large scale for a single operational data store.",
      scaling: "The API tier scales horizontally behind the load balancer since it holds no session state. The ingestion worker pool scales independently by adding Kafka consumers within the same consumer group — more partitions and more workers during bulk-upload periods, scaled back down otherwise.",
      caching: "Redis caches embeddings for frequently repeated queries and short-lived session/conversation context, cutting repeat round-trips to both the embedding model and pgvector for common questions.",
      async: "Kafka decouples ingestion from the request path entirely. Upload requests return as soon as the file lands in S3 and an event is published — the client is not held open while chunking and embedding happen.",
      dbDesign: "PostgreSQL with pgvector stores document chunks, their embeddings, and metadata (tenant, source document, chunk index) in a single indexed table, with an IVFFlat/HNSW index over the embedding column for approximate nearest-neighbor search.",
      failureRecovery: "Kafka consumer offsets commit only after a successful, transactional write, so a worker crash mid-batch results in re-processing rather than data loss. Writes are idempotent on (document_id, chunk_index) so re-processing never creates duplicate chunks.",
      monitoring: "Structured logs and latency histograms around the query path and ingestion pipeline separately, so a spike in ingestion queue depth can be diagnosed without confusing it with query-path degradation.",
      futureScaling: "Introducing tenant-aware partitioning in Kafka and per-tenant vector index sharding once a single tenant's document volume grows large enough to affect neighbors' query latency.",
    },
  },
  {
    slug: "ai-chatbot-as-a-service",
    title: "Multi-Tenant AI Chatbot as a Service",
    category: "Professional — Sirpi.io",
    company: "Sirpi.io",
    timeframe: "Dec 2024 — Sep 2025",
    tagline: "A multi-tenant RAG chatbot platform with asynchronous crawling, ingestion, and embedding pipelines, built to serve many customers' knowledge bases from one horizontally scalable service.",
    techStack: ["Next.js", "FastAPI", "PostgreSQL", "pgvector", "Redis", "Kafka", "AWS S3", "AWS EC2"],
    overview: "Architected and developed a multi-tenant AI chatbot as a service — each customer plugs in their own knowledge base (crawled site content, uploaded documents) and gets a context-aware chatbot backed by a scalable RAG pipeline, without operating any infrastructure of their own.",
    problem: "Serving many tenants from one platform means one noisy tenant — a huge site crawl, a burst of document uploads — can't be allowed to degrade another tenant's chat latency, and the ingestion pipeline (crawling, parsing, embedding) needs to run entirely outside the request/response cycle.",
    architecture: "Next.js and FastAPI serve the tenant-facing dashboard and chat API as stateless services behind a load balancer. Kafka-based workers handle crawling, document ingestion, and embedding generation asynchronously per tenant. Redis provides caching and distributed locking so concurrent crawl jobs for the same tenant don't race each other, and PostgreSQL with pgvector stores each tenant's embeddings for semantic retrieval. Third-party LLM APIs are integrated for the final context-aware response generation.",
    challenges: [
      "Isolating tenants' data and rate limits from each other on shared infrastructure",
      "Coordinating concurrent crawl and ingestion jobs for the same tenant without duplicate work",
      "Keeping request latency low while the platform integrates with external, sometimes slow, third-party LLM APIs",
    ],
    scalability: "Stateless API services scale horizontally behind the load balancer, and Kafka-based workers scale out independently to absorb ingestion spikes from any single tenant without affecting others. Redis-backed distributed locks keep per-tenant crawl jobs serialized where needed while still allowing full parallelism across tenants.",
    performanceOptimizations: [
      "Redis caching of frequent retrieval results and session context to minimize repeated pgvector lookups",
      "Distributed locking to avoid redundant crawl/embedding work when a tenant triggers overlapping jobs",
      "Stateless service design so any instance can serve any request, enabling simple horizontal scaling",
    ],
    engineeringDecisions: [
      "Built ingestion as Kafka-based workers rather than in-process background tasks, so ingestion throughput scales independently of the API tier",
      "Used distributed locking in Redis instead of database-level locks to keep coordination overhead outside the primary data store",
      "Kept the LLM integration behind an internal abstraction so swapping or adding a third-party LLM provider doesn't touch the retrieval or ingestion pipeline",
    ],
    lessonsLearned: "Multi-tenancy changes the caching and locking story completely — patterns that are trivial for a single-tenant app (a simple in-memory lock, a shared cache key) become correctness bugs the moment two tenants can collide, so tenant ID had to be a first-class part of every cache key and lock name from day one.",
    futureImprovements: [
      "Per-tenant usage dashboards and quota enforcement",
      "Configurable retrieval strategies per tenant (hybrid search, reranking)",
      "Streaming ingestion progress back to the tenant dashboard in real time",
    ],
    github: "#",
    demo: "#",
    hasDeepDive: true,
    diagramSvg: svgChatbotSaaS,
    deepDive: {
      requirements: [
        "Support many tenants on shared infrastructure with strict data isolation",
        "Asynchronous crawling and ingestion that never blocks the chat API",
        "Horizontal scaling on both API and worker tiers as tenant count grows",
      ],
      hld: "Tenant-facing Next.js frontends and a FastAPI backend form a stateless API tier behind a load balancer. Kafka carries crawl, ingestion, and embedding jobs to a worker pool. Redis provides caching and distributed locks. PostgreSQL with pgvector holds per-tenant embeddings. Responses are generated by calling out to third-party LLM APIs with retrieved context.",
      lld: "Every cache key, lock name, and Kafka message includes a tenant ID prefix so no coordination primitive can leak across tenants. Crawl jobs acquire a Redis-backed distributed lock scoped to (tenant_id, source_url) before starting, preventing duplicate crawls when a tenant triggers overlapping ingestion requests.",
      tradeoffs: "Chose a shared multi-tenant data store with tenant-scoped keys over per-tenant infrastructure — much cheaper to operate at scale, at the cost of needing rigorous discipline around tenant scoping in every query and cache key.",
      scaling: "API and worker tiers scale independently and horizontally; a tenant with a large crawl job only adds load to the worker pool, which can be scaled out without touching the API tier serving other tenants' chat traffic.",
      caching: "Redis caches retrieval results and session/conversation context per tenant, reducing repeated pgvector queries for common questions within a tenant's knowledge base.",
      async: "Crawling, parsing, and embedding all run as Kafka-driven background work, decoupled entirely from the chat request path.",
      dbDesign: "PostgreSQL with pgvector, partitioned logically by tenant_id on every table, with composite indexes on (tenant_id, embedding) to keep per-tenant retrieval fast as the platform's total document volume grows.",
      failureRecovery: "Kafka's consumer group offsets and idempotent worker writes mean a crashed ingestion worker resumes cleanly; distributed locks have TTLs so a worker crash while holding a lock doesn't permanently block that tenant's future jobs.",
      monitoring: "Per-tenant metrics on ingestion queue depth, crawl job duration, and chat response latency, so a single misbehaving tenant is visible before it affects platform-wide SLAs.",
      futureScaling: "Sharding pgvector by tenant cohort once total embedding volume outgrows a single Postgres instance comfortably, and introducing per-tenant rate limiting at the API gateway layer.",
    },
  },
  {
    slug: "visa-verification-portal",
    title: "High-Traffic Visa Verification Portal",
    category: "Professional — Sirpi.io",
    company: "Sirpi.io",
    timeframe: "Dec 2024 — Sep 2025",
    tagline: "Re-architected a visa lookup workflow that was failing under load — replaced live, per-request Google Sheets API calls with a Redis-backed cache and scheduled sync, serving 2,500+ attendees and 1,000+ concurrent users without rate-limit failures.",
    techStack: ["Redis", "K6", "Node.js", "Google Sheets API"],
    overview: "A visa verification portal for a large international seminar was failing under real traffic — every lookup hit the Google Sheets API directly, and the API's rate limits turned normal event-day traffic into a wave of 403 errors. I identified the bottleneck through load testing and redesigned the lookup workflow around a caching layer instead of a live API dependency.",
    problem: "The original lookup workflow called the Google Sheets API on every single user request. Google Sheets API enforces per-minute rate limits far below what 1,000+ concurrent attendees checking their visa status would generate, so the portal started returning 403 rate-limit errors under exactly the load it needed to handle.",
    architecture: "K6 load testing confirmed the Google Sheets API call was the bottleneck before any code changed. The fix moved the sheet data out of the request path entirely: a scheduled sync worker pulls the sheet on an interval and writes it into Redis, and every user-facing lookup reads only from Redis — never from the Sheets API directly. The load-balanced application tier then just serves reads from a cache that's always warm.",
    challenges: [
      "Diagnosing that the bottleneck was an external API's rate limit, not the application server, before committing to a fix",
      "Getting stakeholder buy-in on eventual consistency (a short sync interval) instead of always-live data",
      "Sizing the caching layer and sync interval to handle 1,000+ concurrent users while keeping the source data fresh enough for a live event",
    ],
    scalability: "By removing the external API entirely from the request path, the portal's capacity became a function of Redis and the application tier — both of which scale horizontally — instead of being capped by a third-party rate limit that couldn't be negotiated up on short notice.",
    performanceOptimizations: [
      "Redis-backed caching layer as the sole source of truth for user-facing reads",
      "Scheduled synchronization decoupled from request volume, so traffic spikes never increase load on the Sheets API",
      "K6 load testing used to validate the new design against the real 1,000+ concurrent user target before the event",
    ],
    engineeringDecisions: [
      "Chose a pull-based scheduled sync over a push/webhook model since Google Sheets doesn't offer reliable webhooks for cell changes",
      "Kept Redis as the single read path for the application so there's exactly one place lookup latency can be affected, instead of a mixed cache/passthrough model",
      "Used K6 to reproduce the failure under controlled load before and after the change, to prove the fix rather than assume it",
    ],
    lessonsLearned: "Load testing before redesigning, not after, was what made this fixable quickly — reproducing the 403 failures under K6 turned a vague 'the portal is slow' complaint into a concrete, provable bottleneck, which made the caching redesign an easy sell to stakeholders.",
    futureImprovements: [
      "Webhook or change-detection based sync to shrink the staleness window further",
      "Per-attendee lookup analytics to catch data issues before attendees do",
    ],
    github: "#",
    demo: "#",
    hasDeepDive: true,
    diagramSvg: svgVisa,
    deepDive: {
      requirements: [
        "Serve 1,000+ concurrent users and 2,500+ total attendees without external API failures",
        "Keep visa status data fresh enough to be trustworthy during a live event",
        "Eliminate 403 rate-limit failures observed under real event-day load",
      ],
      hld: "Attendees hit a load-balanced application tier. All lookup reads are served from Redis. A scheduled sync worker, running independently of request traffic, pulls the Google Sheet and writes the latest data into Redis on an interval — the Sheets API is never called from within a user request.",
      lld: "The sync worker fetches the full sheet, transforms rows into a normalized lookup structure keyed by attendee identifier, and writes it into Redis as a versioned key so a sync failure never leaves Redis half-updated — reads always hit the last fully-written version.",
      tradeoffs: "Traded strict real-time consistency for a bounded staleness window (the sync interval) in exchange for completely removing an external rate limit from the critical path — the right tradeoff once the sheet's actual update frequency was understood to be far lower than lookup request frequency.",
      scaling: "The application tier and Redis both scale horizontally with standard load-balancing and clustering; the scheduled sync worker's load is constant regardless of attendee traffic, so scaling reads never risks the sync path.",
      caching: "Redis is the sole read path for lookups — effectively a cache with no passthrough — so cache-hit rate is always 100% for the application tier by design.",
      async: "The sync job runs entirely asynchronously to user traffic on a fixed schedule, isolating the one component with an external rate limit from the component that needs to handle bursty concurrent load.",
      dbDesign: "Redis key structure versions each full sync as a single atomic write, so partial or failed syncs can't corrupt in-flight reads; a simple key rotation keeps the previous version available as a fallback.",
      failureRecovery: "If a scheduled sync fails, the application keeps serving the last successfully synced version from Redis rather than falling back to a live API call, so a transient Sheets API outage never surfaces as a user-facing error.",
      monitoring: "Sync job success/failure and staleness (time since last successful sync) tracked directly, since that single metric is the leading indicator of whether attendees are seeing correct data.",
      futureScaling: "Moving toward event-driven sheet-change detection to shrink the sync interval without increasing Sheets API call volume, for future events with stricter freshness requirements.",
    },
  },
  {
    slug: "distributed-chat-platform",
    title: "Distributed Real-Time Chat Platform",
    category: "Personal Project",
    company: null,
    timeframe: "2025",
    tagline: "A horizontally scalable, microservices-based real-time chat platform where WebSocket instances stay in sync through Redis Pub/Sub while Kafka handles durable, asynchronous message persistence.",
    techStack: ["FastAPI", "WebSockets", "Kafka", "Redis Pub/Sub", "MySQL", "MinIO", "Docker", "OpenTelemetry"],
    overview: "Real-time chat is deceptively hard to scale horizontally: the moment you run more than one WebSocket server, you need a way for a message sent to a socket on instance A to reach a recipient connected to instance B. This project architects that problem directly, using an event-driven pipeline that keeps WebSocket instances stateless with respect to each other.",
    problem: "A single WebSocket server can't handle unbounded concurrent connections, but naively running multiple instances breaks message delivery — there's no built-in way for one instance to know about a socket connected to a different instance, and message persistence needs to happen without blocking real-time delivery.",
    architecture: "WebSocket servers accept client connections and publish every chat event to Kafka for durable, asynchronous persistence, while simultaneously publishing to Redis Pub/Sub so every other WebSocket instance is notified in real time and can forward the message to any locally-connected recipient. The platform follows a microservices architecture with service discovery, an API Gateway, centralized configuration, JWT authentication, OpenTelemetry-based observability, and containerized deployment with Docker. MinIO handles media/file attachments and MySQL stores durable message history.",
    challenges: [
      "Delivering a message in real time to a recipient connected to a different WebSocket instance than the sender",
      "Keeping message persistence (Kafka → MySQL) fully decoupled from the real-time delivery path so a slow database write never delays a live message",
      "Coordinating service discovery, configuration, and authentication consistently across multiple independently deployable services",
    ],
    scalability: "Because WebSocket instances only hold local connection state and rely on Redis Pub/Sub for cross-instance fan-out, the platform scales by simply adding more WebSocket instances behind the API Gateway — no instance needs to know about any other instance directly, and Kafka absorbs persistence load independently of however many WebSocket servers are running.",
    performanceOptimizations: [
      "Redis Pub/Sub for near-instant cross-instance message fan-out instead of a database-polling approach",
      "Kafka as a durable buffer so persistence writes never sit in the real-time delivery path",
      "MinIO for object storage of media attachments, keeping large payloads out of the message pipeline itself",
    ],
    engineeringDecisions: [
      "Split real-time delivery (Redis Pub/Sub) from durable persistence (Kafka → MySQL) as two independent event consumers of the same chat event, rather than writing to MySQL synchronously on message send",
      "Adopted a microservices architecture with service discovery and an API Gateway specifically so the WebSocket tier, persistence tier, and auth tier can each be deployed and scaled on their own schedule",
      "Instrumented the system with OpenTelemetry from the start rather than adding observability after a production issue, given how much harder distributed tracing is to retrofit across services",
    ],
    lessonsLearned: "The hardest part of distributed real-time systems isn't sending a message — it's making sure every component agrees on where a socket lives right now, and designing so that no component ever needs a global view of connection state to do its job.",
    futureImprovements: [
      "Presence and typing-indicator propagation using the same Pub/Sub fan-out mechanism",
      "Message delivery acknowledgement and offline queuing for disconnected recipients",
      "Horizontal partitioning of Kafka topics by conversation ID to bound ordering guarantees to a single partition per conversation",
    ],
    github: "#",
    demo: "#",
    hasDeepDive: true,
    diagramSvg: svgChat,
    deepDive: {
      requirements: [
        "Real-time message delivery regardless of which WebSocket instance sender and recipient are connected to",
        "Durable message history that never blocks live delivery",
        "Independently deployable, horizontally scalable services with centralized auth and configuration",
      ],
      hld: "Clients connect via an API Gateway to one of many WebSocket server instances. Every chat event is published to both Kafka (for durable persistence) and Redis Pub/Sub (for real-time cross-instance fan-out). A persistence worker consumes from Kafka and writes to MySQL. MinIO stores media attachments referenced by message records.",
      lld: "Each WebSocket instance subscribes to the Redis Pub/Sub channels for the conversations it has active local connections for, so it only receives fan-out traffic relevant to its own connected clients rather than the entire platform's message volume.",
      tradeoffs: "Chose Redis Pub/Sub for delivery fan-out (fast, simple, at-most-once) paired with Kafka for persistence (durable, replayable) rather than relying on Kafka alone for both — Kafka consumer lag would be unacceptable for real-time delivery, so the two systems cover complementary guarantees.",
      scaling: "WebSocket instances scale horizontally behind the API Gateway with no shared state between them beyond the Pub/Sub subscriptions; Kafka and its persistence workers scale independently based on message-write volume rather than connection count.",
      caching: "Redis doubles as the Pub/Sub fan-out mechanism and, for connection routing, a lightweight registry of which instances hold active subscriptions for a given conversation.",
      async: "Persistence to MySQL happens fully asynchronously via Kafka consumers, so database write latency or contention never delays real-time message delivery to connected clients.",
      dbDesign: "MySQL stores durable message history keyed by conversation ID and timestamp, with media payloads stored in MinIO and referenced by object key rather than stored inline.",
      failureRecovery: "Kafka's durability means a persistence worker crash never loses messages — it resumes from its last committed offset. A WebSocket instance crash only drops its own locally-connected clients, who reconnect through the API Gateway to a healthy instance and resume receiving Pub/Sub fan-out immediately.",
      monitoring: "OpenTelemetry traces requests across the API Gateway, WebSocket tier, and persistence workers, making it possible to see exactly where latency is introduced in a cross-service message delivery path.",
      futureScaling: "Partitioning Kafka topics and Redis Pub/Sub channels by conversation ID or shard key as conversation volume grows, to keep per-instance subscription counts bounded.",
    },
  },
  {
    slug: "ai-stock-research-assistant",
    title: "AI Stock Research Assistant",
    category: "Professional — TradeBrains.in",
    company: "TradeBrains.in",
    timeframe: "Oct 2025 — May 2026",
    tagline: "An AI chatbot for a stock research platform with context-aware session memory and streaming responses — cut reply latency from 5–7 seconds down to roughly 1.5 seconds.",
    techStack: ["React", "Node.js", "WebSockets", "LLM APIs", "Lighthouse", "WebP"],
    overview: "Built an AI chatbot embedded in a stock research and analysis platform, capable of analyzing individual stocks and their historical performance while maintaining context across a session, so follow-up questions don't require repeating context.",
    problem: "The initial AI chat experience took 5–7 seconds to produce a reply with no incremental feedback, which felt broken for an interactive research tool, and the surrounding application itself was slow to load, dragging down the platform's Lighthouse score.",
    architecture: "The chatbot maintains context-aware session memory so the model has relevant prior turns and stock context without the client re-sending full history, and responses stream back token-by-token instead of waiting for full generation. Alongside the chatbot work, the broader application's performance was improved through route-based code splitting, WebP image compression to improve LCP, and deferring non-critical scripts to cut Total Blocking Time.",
    challenges: [
      "Cutting perceived latency from 5–7 seconds to ~1.5 seconds without sacrificing response quality",
      "Maintaining conversational context across a session without bloating every request with full chat history",
      "Improving Lighthouse performance score from 62 to 84 across a platform with many existing render-blocking assets",
    ],
    scalability: "Session memory is scoped and sized deliberately so context handling doesn't grow unbounded per user, and streaming responses reduce the time any single request holds a connection open, improving how many concurrent chat sessions the backend can serve.",
    performanceOptimizations: [
      "Streaming responses token-by-token, turning a 5–7 second wait into an immediately-visible, progressively-completing reply",
      "Route-based code splitting so users only download the JavaScript needed for the page they're on",
      "WebP image compression targeted specifically at improving Largest Contentful Paint",
      "Deferring non-critical scripts to reduce Total Blocking Time",
    ],
    engineeringDecisions: [
      "Chose to stream responses rather than optimize only the model call itself, since perceived latency mattered as much as raw latency for a research-tool feel",
      "Treated the Lighthouse score as a measurable target (62 → 84) rather than a vague 'make it faster' goal, prioritizing the specific metrics (LCP, TBT) that were dragging the score down",
    ],
    lessonsLearned: "A 25% real performance improvement came from targeting the two or three metrics actually failing in the Lighthouse report instead of broad, unfocused optimization — profiling first made the fix list obvious.",
    futureImprovements: [
      "Caching common stock-analysis queries to skip redundant model calls entirely",
      "Expanding session memory to support multi-stock comparison conversations",
    ],
    github: "#",
    demo: "#",
    hasDeepDive: false,
  },
  {
    slug: "crypto-trading-terminal",
    title: "Crypto Trading Terminal",
    category: "Professional — TradeBrains.in",
    company: "TradeBrains.in",
    timeframe: "Oct 2025 — May 2026",
    tagline: "A real-time market data layer synchronizing live order books, market feeds, and user balances — an integrated terminal for strategy creation, automated execution, and live PnL monitoring.",
    techStack: ["WebSockets", "JWT", "React", "Custom API Client"],
    overview: "Contributed to a crypto trading terminal by building the real-time market data layer that keeps order books, market feeds, and account balances synchronized live, plus a custom API client to talk to the exchange backend, with secure session management for authenticated trading actions.",
    problem: "Traders need live order book and balance data that stays accurate to the second, plus a secure, low-friction way to authenticate and act on that data — strategy creation, automated execution, and PnL monitoring all depend on the same real-time feed staying correct and in sync.",
    architecture: "A WebSocket-based market data layer streams order book updates, market feeds, and balance changes to the client in real time. A custom API client wraps exchange interactions for order placement and account queries, and JWT-based session management secures authenticated actions without adding noticeable latency to the trading workflow.",
    challenges: [
      "Keeping order book state consistent on the client as high-frequency updates stream in",
      "Synchronizing balance and PnL figures with live market data without introducing lag between the two",
      "Securing trading actions with JWT auth without adding friction to a fast-moving trading workflow",
    ],
    scalability: "The WebSocket data layer is built to fan out live feeds to many concurrently connected traders, with the custom API client isolating exchange-specific integration details so the terminal's core UI doesn't need to change if the underlying exchange API evolves.",
    performanceOptimizations: [
      "WebSocket streaming instead of polling for order book, feed, and balance updates",
      "Client-side reconciliation logic to apply incremental order book updates efficiently instead of re-fetching full state",
    ],
    engineeringDecisions: [
      "Built a custom API client abstraction rather than calling the exchange API directly from UI components, isolating integration churn from the trading UI",
      "Used JWT for session management to keep authentication stateless and compatible with the real-time, high-frequency nature of the terminal",
    ],
    lessonsLearned: "Real-time financial UIs demand that every data source (order book, feed, balance) be reconciled against a single consistent view — treating them as independent streams that happen to update the same screen is where subtle desync bugs creep in.",
    futureImprovements: [
      "Historical order book replay for strategy backtesting",
      "Configurable alerting on PnL thresholds",
    ],
    github: "#",
    demo: "#",
    hasDeepDive: false,
  },
];
