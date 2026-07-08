import {defineType, defineField, defineArrayMember} from 'sanity'

// The "Blogs" content type — drives /blog (index), the category filter, and
// /blog/<slug> (article detail). Body is Portable Text; the detail page builds
// its "In this article" table of contents from the H2 headings.
export const blog = defineType({
  name: 'blog',
  title: 'Blogs',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'meta', title: 'Meta'},
  ],
  fields: [
    // ── Content ──
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      description: 'URL segment — the article renders at /blog/<slug>.',
      options: {source: 'title', maxLength: 96},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'content',
      description: 'Drives the chip colour + filter pills.',
      options: {
        list: [
          {title: 'Manifesto', value: 'Manifesto'},
          {title: 'Product', value: 'Product'},
          {title: 'Community', value: 'Community'},
          {title: 'Field data', value: 'Field data'},
          {title: 'News', value: 'News'},
          {title: 'Guides', value: 'Guides'},
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      group: 'content',
      description: 'Short summary shown on cards and the article hero.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      group: 'content',
      description: 'Preferred. Uploaded image (respects hotspot/crop).',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
    }),
    defineField({
      name: 'coverImageUrl',
      title: 'Cover image URL (fallback)',
      type: 'url',
      group: 'content',
      description: 'Optional external image URL, used only when no image is uploaded above.',
    }),
    defineField({
      name: 'coverAlt',
      title: 'Cover alt text (for URL fallback)',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      group: 'content',
      description: 'Article content. H2 headings become the "In this article" contents.',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Heading', value: 'h2'},
            {title: 'Subheading', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
        }),
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
        }),
      ],
    }),

    // ── Meta ──
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      group: 'meta',
      initialValue: 'The Quest Team',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      group: 'meta',
      initialValue: () => new Date().toISOString(),
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'readMinutes',
      title: 'Read time (minutes)',
      type: 'number',
      group: 'meta',
      description: 'Shown as "X min read". Leave blank to estimate from the body.',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      group: 'meta',
      description: 'Show as the big featured story on /blog.',
      initialValue: false,
    }),
    defineField({
      name: 'popular',
      title: 'Popular',
      type: 'boolean',
      group: 'meta',
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: 'Newest first',
      name: 'publishedDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {title: 'title', subtitle: 'category', media: 'coverImage'},
  },
})
