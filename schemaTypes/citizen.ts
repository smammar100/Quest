import {defineType, defineField, defineArrayMember} from 'sanity'

// The "Citizen" content type — drives the demand-side /quests/[slug]/hire page
// (hire-someone): full-bleed hero, "what you can hire for" image cards, example
// quests, and a hiring FAQ. Mirrors the citizen page sections.
export const citizen = defineType({
  name: 'citizen',
  title: 'Citizen',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'capabilities', title: 'What you can hire for'},
    {name: 'quests', title: 'Example quests'},
    {name: 'faq', title: 'FAQ'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Category name, e.g. "Field data".',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL segment — the page renders at /quests/<slug>/hire.',
      options: {source: 'title', maxLength: 96},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon (Material Symbol)',
      type: 'string',
      description: 'Material Symbols glyph name, e.g. "pin_drop".',
    }),

    // ── Hero ──
    defineField({
      name: 'heroHeading',
      title: 'Hero heading (H1)',
      type: 'string',
      group: 'hero',
      description: 'e.g. "Hire a trusted field data human near you."',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'heroSubtext',
      title: 'Hero subtext',
      type: 'text',
      rows: 2,
      group: 'hero',
      description: 'Short supporting line under the H1.',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      group: 'hero',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
    }),

    // ── What you can hire for (image cards) ──
    defineField({
      name: 'capabilitiesEyebrow',
      title: 'Section eyebrow',
      type: 'string',
      group: 'capabilities',
      initialValue: 'What you can hire for',
    }),
    defineField({
      name: 'capabilitiesHeading',
      title: 'Section heading',
      type: 'string',
      group: 'capabilities',
      description: 'e.g. "Every kind of field data quest."',
    }),
    defineField({
      name: 'capabilities',
      title: 'Cards',
      type: 'array',
      group: 'capabilities',
      description: 'The image cards shown in the "What you can hire for" grid (first 4 shown).',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'capability',
          fields: [
            defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'blurb', title: 'Blurb', type: 'string'}),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
              fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
            }),
          ],
          preview: {select: {title: 'title', subtitle: 'blurb', media: 'image'}},
        }),
      ],
    }),

    // ── Example quests (listing grid) ──
    defineField({
      name: 'questsEyebrow',
      title: 'Section eyebrow',
      type: 'string',
      group: 'quests',
      initialValue: 'Example quests',
    }),
    defineField({
      name: 'questsHeading',
      title: 'Section heading',
      type: 'string',
      group: 'quests',
      description: 'e.g. "What people post."',
    }),
    defineField({
      name: 'questsSubtext',
      title: 'Section subtext',
      type: 'text',
      rows: 2,
      group: 'quests',
    }),
    defineField({
      name: 'quests',
      title: 'Cards',
      type: 'array',
      group: 'quests',
      description: 'Example quest cards posters can browse.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'quest',
          fields: [
            defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'pay', title: 'Pay', type: 'string', description: 'e.g. "$240" or "$22/hr"'}),
            defineField({name: 'posted', title: 'Posted', type: 'string', description: 'e.g. "1 day ago"'}),
            defineField({name: 'time', title: 'Time needed', type: 'string', description: 'e.g. "2 days"'}),
            defineField({name: 'teaser', title: 'Teaser', type: 'text', rows: 3}),
          ],
          preview: {select: {title: 'title', subtitle: 'pay'}},
        }),
      ],
    }),

    // ── FAQ ──
    defineField({
      name: 'faqHeading',
      title: 'FAQ heading',
      type: 'string',
      group: 'faq',
      description: 'e.g. "Hiring field data help — questions."',
    }),
    defineField({
      name: 'faqSubtext',
      title: 'FAQ subtext',
      type: 'text',
      rows: 2,
      group: 'faq',
      initialValue: 'Everything you need to know about hiring on Quest.',
    }),
    defineField({
      name: 'faqs',
      title: 'Questions',
      type: 'array',
      group: 'faq',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'faq',
          fields: [
            defineField({name: 'question', title: 'Question', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'answer', title: 'Answer', type: 'text', rows: 4, validation: (r) => r.required()}),
          ],
          preview: {select: {title: 'question'}},
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'slug.current', media: 'heroImage'},
  },
})
