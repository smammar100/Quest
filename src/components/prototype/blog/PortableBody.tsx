import { PortableText, type PortableTextComponents } from 'next-sanity';
import { urlForImage } from '../../../sanity/image';

// Turn a heading's text into an anchor id, e.g. "Tools to grow revenue" → "tools-to-grow-revenue".
export function headingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

type Block = { _type?: string; style?: string; children?: { text?: string }[] };

// Plain text of a Portable Text block (its span children joined).
function blockText(block: Block): string {
  return (block.children ?? []).map((c) => c.text ?? '').join('');
}

// Extract the H2 headings so the detail page can build its "In this article" TOC.
export function tocFromBody(body: unknown[] | undefined): { id: string; title: string }[] {
  if (!Array.isArray(body)) return [];
  return (body as Block[])
    .filter((b) => b._type === 'block' && b.style === 'h2')
    .map((b) => {
      const title = blockText(b);
      return { id: headingId(title), title };
    })
    .filter((h) => h.title);
}

const components: PortableTextComponents = {
  block: {
    h2: ({ children, value }) => (
      <h2
        id={headingId(blockText(value as Block))}
        className="w-full scroll-mt-24 font-display text-3xl font-extrabold tracking-tight text-ink"
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display text-xl font-bold text-ink">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="font-sans text-lg leading-relaxed text-midgrey">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-coral pl-5 font-sans text-lg italic text-ink">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="ml-5 flex list-disc flex-col gap-2 font-sans text-lg text-midgrey">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="ml-5 flex list-decimal flex-col gap-2 font-sans text-lg text-midgrey">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => (
      <a
        href={(value as { href?: string })?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-coral underline underline-offset-2 hover:no-underline"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      const v = value as { asset?: unknown; alt?: string };
      if (!v?.asset) return null;
      return (
        <img
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          src={urlForImage(value as any).width(1400).url()}
          alt={v.alt ?? ''}
          loading="lazy"
          decoding="async"
          className="h-[450px] w-full rounded-quest bg-[#f2ecdf] object-cover"
        />
      );
    },
  },
};

// Renders a Sanity Portable Text body with Quest typography.
export function PortableBody({ value }: { value: unknown[] }) {
  return (
    <div className="flex w-full max-w-3xl flex-col gap-5">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <PortableText value={value as any} components={components} />
    </div>
  );
}
