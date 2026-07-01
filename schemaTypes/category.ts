import {defineType, defineField, defineArrayMember} from 'sanity'

// The "Hero" content type — drives the supply-side /quests/[slug] page
// (earn-as-a-Hero): hero, the earnings "numbers" section, the FAQ, and the
// list of sub-categories. Internal name stays `category` so existing
// documents and the `_type == "category"` query keep working.
export const category = defineType({
  name: 'category',
  title: 'Hero',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'quests', title: 'Quests'},
    {name: 'numbers', title: 'Numbers'},
    {name: 'faq', title: 'FAQ'},
    {name: 'subs', title: 'Sub-categories'},
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
      description: 'URL segment, the page renders at /quests/<slug>.',
      options: {source: 'title', maxLength: 96},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon (Material Symbol)',
      type: 'string',
      description: 'Material Symbols glyph name, e.g. "pin_drop".',
    }),

    // ── Browse-menu category (flat "Earn as a human" list) ──
    defineField({
      name: 'isMenuCategory',
      title: 'Browse-menu category',
      type: 'boolean',
      description:
        'On = this is a flat "Earn as a human" Browse-menu category (not a full vertical page). It links to its parent vertical + sub below.',
      initialValue: false,
    }),
    defineField({
      name: 'vertical',
      title: 'Parent vertical',
      type: 'string',
      description: 'For menu categories: which vertical page this links to.',
      options: {
        list: [
          {title: 'Field data', value: 'field-data'},
          {title: 'Errands', value: 'errands'},
          {title: 'Content', value: 'content'},
          {title: 'Events', value: 'events'},
          {title: 'Home', value: 'home'},
        ],
      },
      hidden: ({parent}) => !parent?.isMenuCategory,
    }),
    defineField({
      name: 'subSlug',
      title: 'Subcategory filter slug',
      type: 'string',
      description: 'For menu categories: deep-links to /quests/<vertical>?sub=<subSlug>.',
      hidden: ({parent}) => !parent?.isMenuCategory,
    }),

    // ── Hero ──
    defineField({
      name: 'heroHeading',
      title: 'Hero heading (H1)',
      type: 'string',
      group: 'hero',
      description: 'e.g. "Field data quests near you."',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'heroSubtext',
      title: 'Hero subtext',
      type: 'text',
      rows: 2,
      group: 'hero',
      description: 'e.g. "Browse over 1,284 open field data quests near you."',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      group: 'hero',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
    }),
    defineField({
      name: 'count',
      title: 'Open quests count',
      type: 'string',
      group: 'hero',
      description: 'Display count shown in the hero, e.g. "1,284".',
    }),

    // ── Numbers / earnings ──
    defineField({
      name: 'earnings',
      title: 'Earnings section',
      type: 'object',
      group: 'numbers',
      options: {collapsible: true, collapsed: false},
      fields: [
        defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'The numbers'}),
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          description: 'e.g. "What field data Heroes earn."',
        }),
        defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
        defineField({name: 'bandMin', title: 'Band min ($/hr)', type: 'number'}),
        defineField({name: 'bandMax', title: 'Band max ($/hr)', type: 'number'}),
        defineField({
          name: 'bars',
          title: 'Chart bars (relative heights 0–100)',
          type: 'array',
          of: [defineArrayMember({type: 'number'})],
          description: 'One value per bar; the median bar is highlighted by index below.',
        }),
        defineField({name: 'medianIndex', title: 'Median bar index', type: 'number'}),
        defineField({
          name: 'axisLabel',
          title: 'Axis label',
          type: 'string',
          initialValue: 'Hourly rate (USD)',
        }),
      ],
    }),

    // ── Open quests (listing grid) ──
    defineField({
      name: 'quests',
      title: 'Open quests',
      type: 'array',
      group: 'quests',
      description: 'The listing cards shown in the "Open quests" grid.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'quest',
          fields: [
            defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'pay', title: 'Pay', type: 'string', description: 'e.g. "$240" or "$22/hr"'}),
            defineField({
              name: 'payType',
              title: 'Pay type',
              type: 'string',
              options: {list: ['Fixed payout', 'Hourly']},
            }),
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
      name: 'faqs',
      title: 'FAQ',
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

    // ── Sub-categories ──
    defineField({
      name: 'subcategories',
      title: 'Sub-categories',
      type: 'array',
      group: 'subs',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'subcategory',
          fields: [
            defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()}),
            defineField({
              name: 'slug',
              title: 'Slug',
              type: 'slug',
              options: {source: 'title', maxLength: 96},
            }),
            defineField({name: 'blurb', title: 'Blurb', type: 'string'}),
          ],
          preview: {select: {title: 'title', subtitle: 'blurb'}},
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'slug.current', media: 'heroImage'},
  },
})
