// #blog — editorial grid below #faq (V1 from /prototype/blog-news).
// Unsplash covers hotlinked for now; swap for CMS/own assets when the blog ships.
const POSTS = [
  {
    slug: 'why-humans-still-matter',
    category: 'Manifesto',
    accent: 'coral',
    title: 'Why humans still matter in the age of AI',
    excerpt:
      'AI can write the plan, but someone still has to show up. Our founding manifesto on the work software will never finish.',
    date: 'Jun 28, 2026',
    read: '6 min read',
    img: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=70',
    alt: 'A team stacking hands together over a work table',
  },
  {
    slug: 'quest-api-for-agents',
    category: 'Product',
    accent: 'electric',
    title: 'Let your AI agent hire a human: the Quest API',
    excerpt:
      'Your agent can now post tasks, compare matched Heroes, and dispatch real-world work — all without leaving its loop.',
    date: 'Jun 21, 2026',
    read: '4 min read',
    img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=70',
    alt: 'A white robot looking up',
  },
  {
    slug: 'heroes-jakarta-10000',
    category: 'Community',
    accent: 'marigold',
    title: 'Meet the Heroes: 10,000 tasks in Jakarta',
    excerpt:
      'From parcel runs to event crews — how our first city hit five figures of completed quests in under a year.',
    date: 'Jun 14, 2026',
    read: '5 min read',
    img: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=900&q=70',
    alt: 'A city skyline at dusk',
  },
];

export default function BlogSection() {
  return (
    <section id="blog">
      <div className="blog-head">
        <h2 className="blog-title">Articles, stories & much more </h2>
        <p className="blog-lede">Stories from the humans getting real work done.</p>
      </div>

      <div className="blog-grid">
        {POSTS.map((post) => (
          <a className="blog-card" href={`/blog/${post.slug}`} key={post.title}>
            <div className={`blog-card__media blog-card__media--${post.accent}`}>
              <img src={post.img} alt={post.alt} width={900} height={600} loading="lazy" decoding="async" />
            </div>
            <div className="blog-card__body">
              <div className="blog-card__meta">
                <span className={`blog-chip blog-chip--${post.accent}`}>{post.category}</span>
                <span className="blog-date">{post.date}</span>
                <span className="blog-read">
                  <span className="material-symbols-outlined" aria-hidden="true">schedule</span>
                  {post.read}
                </span>
              </div>
              <h3 className="blog-card__title">{post.title}</h3>
              <p className="blog-card__excerpt">{post.excerpt}</p>
            </div>
          </a>
        ))}
      </div>

      <div className="blog-cta">
        <a href="/blog" className="blog-cta__btn">Read all stories</a>
      </div>
    </section>
  );
}
