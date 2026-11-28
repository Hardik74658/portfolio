import { ICON_NAMES } from '../data/icons';
import { SOCIAL_NAMES } from '../components/ui/SocialIcon';

/*
 * Field types understood by the admin form renderer (fields.jsx):
 *   text, textarea, number, bool, select, icon,
 *   chips   - short string list edited as tags (Enter to add)
 *   list    - ordered list of longer strings (one box each)
 *   file    - a single URL with an upload button (image preview when it is an image)
 *   images  - ordered list of image URLs with upload
 *   group   - nested object with its own fields
 *   objects - ordered list of objects (add, duplicate, reorder, delete)
 */

const sectionFields = (label) => ({
  type: 'group',
  label,
  fields: [
    { key: 'visible', label: 'Show this section on the site', type: 'bool' },
    { key: 'eyebrow', label: 'Small label above the title', type: 'text' },
    { key: 'title', label: 'Title', type: 'text' },
    { key: 'lede', label: 'Intro line', type: 'textarea' },
  ],
});

export const TABS = [
  {
    id: 'profile',
    label: 'Profile & Hero',
    hint: 'Your name, the rotating roles, resume, photo and contact details.',
    path: 'profile',
    spec: {
      type: 'group',
      fields: [
        { key: 'firstName', label: 'First name', type: 'text', half: true },
        { key: 'lastName', label: 'Last name', type: 'text', half: true },
        { key: 'eyebrow', label: 'Status line above your name', type: 'text' },
        { key: 'roles', label: 'Rotating roles (shown one after another)', type: 'chips' },
        { key: 'tagline', label: 'Tagline after the rotating role', type: 'textarea' },
        { key: 'resumeUrl', label: 'Resume (PDF link or upload)', type: 'file', accept: 'application/pdf,image/*' },
        { key: 'resumeLabel', label: 'Resume button text', type: 'text', half: true },
        { key: 'portraitUrl', label: 'Profile photo', type: 'file', accept: 'image/*' },
        { key: 'badgeValue', label: 'Photo badge number', type: 'text', half: true },
        { key: 'badgeLabel', label: 'Photo badge text', type: 'text', half: true },
        { key: 'email', label: 'Email', type: 'text', half: true },
        { key: 'phone', label: 'Phone', type: 'text', half: true },
        { key: 'location', label: 'Location', type: 'text' },
      ],
    },
  },
  {
    id: 'socials',
    label: 'Social Links',
    hint: 'Shown in the hero, contact section and footer. The icon is picked from the name.',
    path: 'socials',
    spec: {
      type: 'objects',
      itemLabel: (s) => s.name || 'Link',
      newItem: () => ({ name: 'Website', url: '' }),
      fields: [
        { key: 'name', label: 'Network', type: 'select', options: SOCIAL_NAMES, allowCustom: true, half: true },
        { key: 'url', label: 'URL', type: 'text', half: true },
      ],
    },
  },
  {
    id: 'sections',
    label: 'Section Titles',
    hint: 'Headings for each section, and whether each section is shown at all.',
    path: 'sections',
    spec: {
      type: 'group',
      fields: [
        { key: 'about', ...sectionFields('About') },
        { key: 'skills', ...sectionFields('Skills') },
        { key: 'projects', ...sectionFields('Projects') },
        { key: 'experience', ...sectionFields('Experience') },
        { key: 'contact', ...sectionFields('Contact') },
      ],
    },
  },
  {
    id: 'about',
    label: 'About',
    hint: 'Wrap a word in *stars* in the quote to highlight it in orange.',
    path: 'about',
    spec: {
      type: 'group',
      fields: [
        { key: 'quote', label: 'Quote', type: 'textarea' },
        {
          key: 'stats', label: 'Stats', type: 'objects',
          itemLabel: (s) => `${s.value || ''} ${s.label || ''}`.trim() || 'Stat',
          newItem: () => ({ value: '', label: '' }),
          fields: [
            { key: 'value', label: 'Number', type: 'text', half: true },
            { key: 'label', label: 'Label', type: 'text', half: true },
          ],
        },
        {
          key: 'faqs', label: 'Questions & answers', type: 'objects',
          itemLabel: (f) => f.question || 'Question',
          newItem: () => ({ question: '', answer: '' }),
          fields: [
            { key: 'question', label: 'Question', type: 'text' },
            { key: 'answer', label: 'Answer', type: 'textarea', rows: 5 },
          ],
        },
      ],
    },
  },
  {
    id: 'skills',
    label: 'Skills',
    hint: 'Skill cards and the scrolling skills strip. Wide cards take two columns.',
    path: 'skills',
    spec: {
      type: 'group',
      fields: [
        { key: 'marquee', label: 'Scrolling skills strip', type: 'chips' },
        {
          key: 'categories', label: 'Skill cards', type: 'objects',
          itemLabel: (c) => c.title || 'Card',
          newItem: () => ({ title: 'New category', icon: 'CodeBracketIcon', wide: false, items: [] }),
          fields: [
            { key: 'title', label: 'Card title', type: 'text', half: true },
            { key: 'icon', label: 'Icon', type: 'icon', options: ICON_NAMES, half: true },
            { key: 'wide', label: 'Wide card (two columns)', type: 'bool' },
            { key: 'items', label: 'Skills', type: 'chips' },
          ],
        },
      ],
    },
  },
  {
    id: 'projects',
    label: 'Projects',
    hint: 'Add, reorder or hide projects. The first image is the card cover. Leave GitHub empty to hide that button.',
    path: 'projects',
    spec: {
      type: 'group',
      fields: [
        { key: 'filters', label: 'Filter buttons (match a project tag; "All", "Resume Projects", "Vibe Code" are special)', type: 'chips' },
        { key: 'initialCount', label: 'Projects shown before "View All"', type: 'number', half: true },
        {
          key: 'items', label: 'Projects', type: 'objects',
          itemLabel: (p) => `${p.hidden ? '(hidden) ' : ''}${p.title || 'Untitled project'}`,
          newItem: () => ({
            id: Date.now(), title: 'New project', description: '', longDescription: '',
            tags: [], images: [], features: [], technologies: [],
            github: '', demo: '', icon: 'CubeIcon', category: 'client', hidden: false,
          }),
          fields: [
            { key: 'hidden', label: 'Hide this project', type: 'bool' },
            { key: 'title', label: 'Title', type: 'text' },
            { key: 'description', label: 'Short description (card)', type: 'textarea', rows: 2 },
            { key: 'longDescription', label: 'Overview (details popup)', type: 'textarea', rows: 6 },
            { key: 'images', label: 'Images', type: 'images' },
            { key: 'tags', label: 'Tags (also used by the filters)', type: 'chips' },
            { key: 'features', label: 'Key features', type: 'list' },
            { key: 'technologies', label: 'Technologies', type: 'chips' },
            { key: 'demo', label: 'Live demo URL', type: 'text', half: true },
            { key: 'github', label: 'GitHub URL', type: 'text', half: true },
            { key: 'icon', label: 'Icon', type: 'icon', options: ICON_NAMES, half: true },
            { key: 'category', label: 'Category', type: 'select', options: ['client', 'resume', 'vibe', 'basic'], allowCustom: true, half: true },
          ],
        },
      ],
    },
  },
  {
    id: 'experience',
    label: 'Experience',
    hint: 'Your work timeline, newest first.',
    path: 'experience',
    spec: {
      type: 'group',
      fields: [
        { key: 'availability', label: 'Status pill under the timeline (empty hides it)', type: 'text' },
        {
          key: 'items', label: 'Roles', type: 'objects',
          itemLabel: (e) => [e.role, e.company].filter(Boolean).join(' · ') || 'Role',
          newItem: () => ({
            id: `exp-${Date.now()}`, role: 'New role', subtitle: '', company: '', location: '',
            duration: '', url: '', urlLabel: '', description: [], tech: [], icon: 'BriefcaseIcon',
          }),
          fields: [
            { key: 'role', label: 'Role / title', type: 'text', half: true },
            { key: 'subtitle', label: 'Subtitle (optional)', type: 'text', half: true },
            { key: 'company', label: 'Company', type: 'text', half: true },
            { key: 'location', label: 'Location', type: 'text', half: true },
            { key: 'duration', label: 'Dates', type: 'text', half: true },
            { key: 'icon', label: 'Icon', type: 'icon', options: ICON_NAMES, half: true },
            { key: 'url', label: 'Link (optional)', type: 'text', half: true },
            { key: 'urlLabel', label: 'Link text', type: 'text', half: true },
            { key: 'description', label: 'Bullet points', type: 'list' },
            { key: 'tech', label: 'Tech / skills tags', type: 'chips' },
          ],
        },
      ],
    },
  },
  {
    id: 'footer',
    label: 'Footer',
    hint: 'The big call to action at the bottom of the page.',
    path: 'footer',
    spec: {
      type: 'group',
      fields: [
        { key: 'eyebrow', label: 'Small label', type: 'text', half: true },
        { key: 'ctaLabel', label: 'Button text', type: 'text', half: true },
        { key: 'headline', label: 'Headline', type: 'text' },
        { key: 'marqueeText', label: 'Big scrolling name', type: 'text', half: true },
        { key: 'copyright', label: 'Copyright line (after the year)', type: 'text', half: true },
      ],
    },
  },
];
