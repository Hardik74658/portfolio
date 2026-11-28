import React, { createContext, useContext, useRef, useState } from 'react';
import {
  ArrowUpIcon, ArrowDownIcon, TrashIcon, PlusIcon, DocumentDuplicateIcon,
  ChevronDownIcon, ArrowUpTrayIcon, XMarkIcon, PhotoIcon,
} from '@heroicons/react/24/outline';
import { getIcon } from '../data/icons';
import { withBase } from '../data/projects';

/** Provided by AdminPage: uploads a File and resolves to its public URL. */
export const UploadContext = createContext(async () => { throw new Error('Uploads unavailable'); });

const INPUT = 'w-full rounded-xl border border-ink-900/10 bg-white px-3.5 py-2.5 text-sm text-ink-900 outline-none transition focus:border-accent-500 focus:ring-4 focus:ring-accent-500/10';
const LABEL = 'mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-500';
const ICON_BTN = 'grid h-8 w-8 place-items-center rounded-lg text-ink-400 transition hover:bg-ink-900/[0.06] hover:text-ink-900 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer disabled:cursor-default';

const move = (arr, from, to) => {
  const next = [...arr];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
};

const isImage = (url = '') => /\.(png|jpe?g|webp|gif|svg|avif)(\?|$)/i.test(url) || /\/image\/upload\//.test(url) || /convex\.cloud\/api\/storage/.test(url);

function useUpload() {
  const upload = useContext(UploadContext);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const run = async (file) => {
    setBusy(true); setError('');
    try { return await upload(file); }
    catch (e) { setError(e.message || 'Upload failed'); return null; }
    finally { setBusy(false); }
  };
  return { run, busy, error };
}

/* ------------------------------ primitives ------------------------------ */

function TextField({ value, onChange, placeholder }) {
  return <input className={INPUT} value={value ?? ''} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />;
}

function TextArea({ value, onChange, rows = 3 }) {
  return <textarea className={`${INPUT} resize-y leading-relaxed`} rows={rows} value={value ?? ''} onChange={(e) => onChange(e.target.value)} />;
}

function Toggle({ value, onChange, label }) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-3 select-none">
      <button
        type="button"
        role="switch"
        aria-checked={!!value}
        onClick={() => onChange(!value)}
        className={`relative h-6 w-11 rounded-full transition ${value ? 'bg-accent-600' : 'bg-ink-900/15'}`}
      >
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${value ? 'left-[22px]' : 'left-0.5'}`} />
      </button>
      <span className="text-sm font-medium text-ink-700">{label}</span>
    </label>
  );
}

function SelectField({ value, onChange, options, allowCustom, icon }) {
  const custom = allowCustom && value && !options.includes(value);
  const Icon = icon ? getIcon(value) : null;
  return (
    <div className="flex items-center gap-2">
      {Icon && (
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-500/10 text-accent-600">
          <Icon className="h-5 w-5" />
        </span>
      )}
      <select className={INPUT} value={custom ? '__custom' : value ?? ''} onChange={(e) => onChange(e.target.value === '__custom' ? '' : e.target.value)}>
        {!options.includes(value) && !allowCustom && <option value={value ?? ''}>{value || '—'}</option>}
        {options.map((o) => <option key={o} value={o}>{icon ? o.replace(/Icon$/, '') : o}</option>)}
        {allowCustom && <option value="__custom">Custom…</option>}
      </select>
      {allowCustom && (custom || value === '') && (
        <input className={INPUT} placeholder="Custom value" value={value ?? ''} onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  );
}

function Chips({ value = [], onChange }) {
  const [draft, setDraft] = useState('');
  const add = () => {
    const parts = draft.split(',').map((s) => s.trim()).filter(Boolean);
    if (parts.length) onChange([...value, ...parts]);
    setDraft('');
  };
  return (
    <div className="rounded-xl border border-ink-900/10 bg-white p-2 focus-within:border-accent-500 focus-within:ring-4 focus-within:ring-accent-500/10">
      <div className="flex flex-wrap gap-1.5">
        {value.map((chip, i) => (
          <span key={`${chip}-${i}`} className="group inline-flex items-center gap-1 rounded-full bg-cream-100 py-1 pl-3 pr-1 text-sm text-ink-700">
            <button type="button" title="Move left" disabled={i === 0} onClick={() => onChange(move(value, i, i - 1))} className="hidden text-ink-400 group-hover:inline disabled:opacity-0">‹</button>
            {chip}
            <button type="button" aria-label={`Remove ${chip}`} onClick={() => onChange(value.filter((_, j) => j !== i))} className="grid h-5 w-5 place-items-center rounded-full text-ink-400 hover:bg-ink-900/10 hover:text-ink-900">
              <XMarkIcon className="h-3.5 w-3.5" />
            </button>
          </span>
        ))}
        <input
          className="min-w-[10rem] flex-1 bg-transparent px-2 py-1 text-sm outline-none"
          placeholder={value.length ? 'Add more…' : 'Type and press Enter (commas add several)'}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') { e.preventDefault(); add(); }
            if (e.key === 'Backspace' && !draft && value.length) onChange(value.slice(0, -1));
          }}
          onBlur={add}
        />
      </div>
    </div>
  );
}

function StringList({ value = [], onChange }) {
  return (
    <div className="space-y-2">
      {value.map((item, i) => (
        <div key={i} className="flex items-start gap-2">
          <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
          <textarea
            className={`${INPUT} resize-y`}
            rows={2}
            value={item}
            onChange={(e) => onChange(value.map((v, j) => (j === i ? e.target.value : v)))}
          />
          <div className="flex shrink-0 flex-col">
            <button type="button" className={ICON_BTN} disabled={i === 0} onClick={() => onChange(move(value, i, i - 1))} aria-label="Move up"><ArrowUpIcon className="h-4 w-4" /></button>
            <button type="button" className={ICON_BTN} disabled={i === value.length - 1} onClick={() => onChange(move(value, i, i + 1))} aria-label="Move down"><ArrowDownIcon className="h-4 w-4" /></button>
          </div>
          <button type="button" className={`${ICON_BTN} mt-1 hover:!text-red-600`} onClick={() => onChange(value.filter((_, j) => j !== i))} aria-label="Remove"><TrashIcon className="h-4 w-4" /></button>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...value, ''])} className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-medium text-accent-700 hover:bg-accent-500/10">
        <PlusIcon className="h-4 w-4" /> Add point
      </button>
    </div>
  );
}

function FileField({ value, onChange, accept = 'image/*' }) {
  const ref = useRef(null);
  const { run, busy, error } = useUpload();
  const preview = value && (accept.startsWith('image') || isImage(value));
  return (
    <div className="flex items-start gap-3">
      {preview ? (
        <img src={withBase(value)} alt="" className="h-16 w-16 shrink-0 rounded-xl border border-ink-900/10 object-cover" />
      ) : null}
      <div className="min-w-0 flex-1 space-y-2">
        <div className="flex gap-2">
          <input className={INPUT} value={value ?? ''} placeholder="Paste a URL or upload a file" onChange={(e) => onChange(e.target.value)} />
          <button type="button" disabled={busy} onClick={() => ref.current?.click()} className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-ink-900 px-3.5 text-sm font-medium text-white transition hover:bg-ink-700 disabled:opacity-60">
            <ArrowUpTrayIcon className="h-4 w-4" /> {busy ? 'Uploading…' : 'Upload'}
          </button>
        </div>
        {value && !preview && <a href={withBase(value)} target="_blank" rel="noreferrer" className="text-xs text-accent-700 underline">Open current file</a>}
        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>
      <input ref={ref} type="file" accept={accept} hidden onChange={async (e) => {
        const file = e.target.files?.[0];
        e.target.value = '';
        if (file) { const url = await run(file); if (url) onChange(url); }
      }} />
    </div>
  );
}

function ImagesField({ value = [], onChange }) {
  const ref = useRef(null);
  const { run, busy, error } = useUpload();
  const [url, setUrl] = useState('');
  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {value.map((src, i) => (
          <figure key={`${src}-${i}`} className="group relative overflow-hidden rounded-xl border border-ink-900/10 bg-cream-100">
            <img src={withBase(src)} alt="" className="aspect-[16/10] w-full object-cover object-top" />
            {i === 0 && <span className="absolute left-2 top-2 rounded-full bg-accent-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">Cover</span>}
            <div className="absolute inset-x-0 bottom-0 flex justify-end gap-1 bg-gradient-to-t from-ink-950/70 p-1.5 opacity-0 transition group-hover:opacity-100 focus-within:opacity-100">
              <button type="button" className="grid h-7 w-7 place-items-center rounded-lg bg-white/90 text-ink-700 disabled:opacity-40" disabled={i === 0} onClick={() => onChange(move(value, i, i - 1))} aria-label="Move earlier"><ArrowUpIcon className="h-3.5 w-3.5 -rotate-90" /></button>
              <button type="button" className="grid h-7 w-7 place-items-center rounded-lg bg-white/90 text-ink-700 disabled:opacity-40" disabled={i === value.length - 1} onClick={() => onChange(move(value, i, i + 1))} aria-label="Move later"><ArrowDownIcon className="h-3.5 w-3.5 -rotate-90" /></button>
              <button type="button" className="grid h-7 w-7 place-items-center rounded-lg bg-white/90 text-red-600" onClick={() => onChange(value.filter((_, j) => j !== i))} aria-label="Remove image"><TrashIcon className="h-3.5 w-3.5" /></button>
            </div>
          </figure>
        ))}
        <button type="button" disabled={busy} onClick={() => ref.current?.click()} className="grid aspect-[16/10] place-items-center rounded-xl border-2 border-dashed border-ink-900/15 text-sm font-medium text-ink-500 transition hover:border-accent-500 hover:text-accent-700 disabled:opacity-60">
          <span className="flex flex-col items-center gap-1"><PhotoIcon className="h-6 w-6" />{busy ? 'Uploading…' : 'Upload images'}</span>
        </button>
      </div>
      <div className="mt-3 flex gap-2">
        <input className={INPUT} placeholder="…or paste an image URL" value={url} onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && url.trim()) { e.preventDefault(); onChange([...value, url.trim()]); setUrl(''); } }} />
        <button type="button" disabled={!url.trim()} onClick={() => { onChange([...value, url.trim()]); setUrl(''); }} className="shrink-0 rounded-xl border border-ink-900/10 px-3.5 text-sm font-medium disabled:opacity-40">Add</button>
      </div>
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
      <input ref={ref} type="file" accept="image/*" multiple hidden onChange={async (e) => {
        const files = [...(e.target.files || [])];
        e.target.value = '';
        const urls = [];
        for (const f of files) { const u = await run(f); if (u) urls.push(u); }
        if (urls.length) onChange([...value, ...urls]);
      }} />
    </div>
  );
}

/* ------------------------------ composites ------------------------------ */

function Group({ spec, value = {}, onChange, nested }) {
  const body = (
    <div className="grid gap-x-4 gap-y-5 sm:grid-cols-2">
      {spec.fields.map((f) => (
        <div key={f.key} className={f.half ? '' : 'sm:col-span-2'}>
          <Field spec={f} value={value?.[f.key]} onChange={(v) => onChange({ ...value, [f.key]: v })} />
        </div>
      ))}
    </div>
  );
  if (!nested) return body;
  return (
    <fieldset className="rounded-2xl border border-ink-900/[0.08] bg-cream-50/60 p-4 sm:p-5">
      <legend className="px-2 font-display text-base font-semibold text-ink-900">{spec.label}</legend>
      {body}
    </fieldset>
  );
}

function Objects({ spec, value = [], onChange }) {
  const [open, setOpen] = useState(() => new Set());
  const toggle = (i) => setOpen((s) => { const n = new Set(s); n.has(i) ? n.delete(i) : n.add(i); return n; });
  const update = (i, v) => onChange(value.map((x, j) => (j === i ? v : x)));
  const remap = (fn) => setOpen((s) => new Set([...s].map(fn).filter((x) => x >= 0)));

  return (
    <div className="space-y-2.5">
      {value.map((item, i) => {
        const isOpen = open.has(i);
        return (
          <div key={item?.id ?? i} className={`overflow-hidden rounded-2xl border bg-white transition ${isOpen ? 'border-accent-500/40 shadow-soft' : 'border-ink-900/10'}`}>
            <div className="flex items-center gap-1 pr-2">
              <button type="button" onClick={() => toggle(i)} className="flex min-w-0 flex-1 items-center gap-3 px-4 py-3 text-left cursor-pointer">
                <span className="w-6 shrink-0 font-display text-xs tabular-nums text-accent-600">{String(i + 1).padStart(2, '0')}</span>
                <span className="truncate font-medium text-ink-900">{spec.itemLabel ? spec.itemLabel(item || {}) : `Item ${i + 1}`}</span>
                <ChevronDownIcon className={`ml-auto h-4 w-4 shrink-0 text-ink-400 transition ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              <button type="button" className={ICON_BTN} disabled={i === 0} aria-label="Move up"
                onClick={() => { onChange(move(value, i, i - 1)); remap((x) => (x === i ? i - 1 : x === i - 1 ? i : x)); }}><ArrowUpIcon className="h-4 w-4" /></button>
              <button type="button" className={ICON_BTN} disabled={i === value.length - 1} aria-label="Move down"
                onClick={() => { onChange(move(value, i, i + 1)); remap((x) => (x === i ? i + 1 : x === i + 1 ? i : x)); }}><ArrowDownIcon className="h-4 w-4" /></button>
              <button type="button" className={ICON_BTN} aria-label="Duplicate"
                onClick={() => {
                  const copy = JSON.parse(JSON.stringify(item));
                  if (copy && 'id' in copy) copy.id = typeof copy.id === 'number' ? Date.now() : `${copy.id}-copy-${Date.now()}`;
                  const next = [...value]; next.splice(i + 1, 0, copy); onChange(next);
                  remap((x) => (x > i ? x + 1 : x));
                }}><DocumentDuplicateIcon className="h-4 w-4" /></button>
              <button type="button" className={`${ICON_BTN} hover:!text-red-600`} aria-label="Delete"
                onClick={() => {
                  if (!window.confirm(`Delete "${spec.itemLabel ? spec.itemLabel(item || {}) : 'this item'}"?`)) return;
                  onChange(value.filter((_, j) => j !== i));
                  remap((x) => (x === i ? -1 : x > i ? x - 1 : x));
                }}><TrashIcon className="h-4 w-4" /></button>
            </div>
            {isOpen && (
              <div className="border-t border-ink-900/[0.06] bg-cream-50/40 p-4 sm:p-5">
                <Group spec={spec} value={item} onChange={(v) => update(i, v)} />
              </div>
            )}
          </div>
        );
      })}
      <button
        type="button"
        onClick={() => { onChange([...value, spec.newItem ? spec.newItem() : {}]); setOpen((s) => new Set(s).add(value.length)); }}
        className="inline-flex items-center gap-2 rounded-xl border-2 border-dashed border-ink-900/15 px-4 py-2.5 text-sm font-semibold text-ink-600 transition hover:border-accent-500 hover:text-accent-700"
      >
        <PlusIcon className="h-4 w-4" /> Add
      </button>
    </div>
  );
}

/** Renders any field from its spec (see schema.js). */
export function Field({ spec, value, onChange }) {
  if (spec.type === 'group') return <Group spec={spec} value={value} onChange={onChange} nested={!!spec.label} />;
  if (spec.type === 'bool') return <Toggle value={value} onChange={onChange} label={spec.label} />;

  let input;
  switch (spec.type) {
    case 'textarea': input = <TextArea value={value} onChange={onChange} rows={spec.rows} />; break;
    case 'number': input = <input type="number" className={INPUT} value={value ?? ''} onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))} />; break;
    case 'select': input = <SelectField value={value} onChange={onChange} options={spec.options} allowCustom={spec.allowCustom} />; break;
    case 'icon': input = <SelectField value={value} onChange={onChange} options={spec.options} icon />; break;
    case 'chips': input = <Chips value={value} onChange={onChange} />; break;
    case 'list': input = <StringList value={value} onChange={onChange} />; break;
    case 'file': input = <FileField value={value} onChange={onChange} accept={spec.accept} />; break;
    case 'images': input = <ImagesField value={value} onChange={onChange} />; break;
    case 'objects': input = <Objects spec={spec} value={value} onChange={onChange} />; break;
    default: input = <TextField value={value} onChange={onChange} />;
  }
  return (
    <div>
      {spec.label && <span className={LABEL}>{spec.label}</span>}
      {input}
    </div>
  );
}
