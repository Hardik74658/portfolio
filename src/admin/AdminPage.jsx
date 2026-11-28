import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useMutation, useQuery } from 'convex/react';
import {
  ArrowTopRightOnSquareIcon, ArrowRightOnRectangleIcon, CheckCircleIcon,
  ExclamationTriangleIcon, LockClosedIcon, ArrowPathIcon, ArrowDownTrayIcon,
  ArrowUpTrayIcon,
} from '@heroicons/react/24/outline';
import { api } from '../../convex/_generated/api';
import { DEFAULT_CONTENT, mergeContent } from '../data/defaultContent';
import { TABS } from './schema';
import { Field, UploadContext } from './fields';

const TOKEN_KEY = 'portfolio-admin-token';
const clone = (x) => JSON.parse(JSON.stringify(x));

function readToken() {
  try { return localStorage.getItem(TOKEN_KEY) || ''; } catch { return ''; }
}
function writeToken(t) {
  try { t ? localStorage.setItem(TOKEN_KEY, t) : localStorage.removeItem(TOKEN_KEY); } catch { /* ignore */ }
}

/** Keeps search engines away and gives the tab a neutral title. */
function usePrivatePage() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Editor';
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    document.documentElement.classList.remove('dark');
    return () => { document.title = prevTitle; meta.remove(); };
  }, []);
}

export default function AdminPage() {
  usePrivatePage();
  const [token, setToken] = useState(readToken);
  const valid = useQuery(api.auth.check, token ? { token } : 'skip');

  const signOut = useCallback(() => { writeToken(''); setToken(''); }, []);
  useEffect(() => { if (token && valid === false) signOut(); }, [token, valid, signOut]);

  return (
    <div className="min-h-screen bg-[#f6f4ef] font-sans text-ink-900">
      {!token || valid === false ? (
        <Login onToken={(t) => { writeToken(t); setToken(t); }} />
      ) : valid === undefined ? (
        <Centered><Spinner /> Checking session…</Centered>
      ) : (
        <Editor token={token} onSignOut={signOut} />
      )}
    </div>
  );
}

/* --------------------------------- login --------------------------------- */

function Login({ onToken }) {
  const login = useMutation(api.auth.login);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!password) return;
    setBusy(true); setError('');
    try {
      const res = await login({ password });
      if (res.ok) onToken(res.token);
      else setError(res.error);
    } catch (err) {
      setError(err.message || 'Could not sign in');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Centered>
      <form onSubmit={submit} className="w-full max-w-sm rounded-3xl border border-ink-900/10 bg-white p-8 shadow-soft">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent-500/10 text-accent-600">
          <LockClosedIcon className="h-6 w-6" />
        </span>
        <h1 className="mt-5 font-display text-2xl font-semibold">Portfolio editor</h1>
        <p className="mt-1 text-sm text-ink-500">Enter your password to edit the site.</p>
        <input
          type="password"
          autoFocus
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          aria-label="Password"
          className="mt-6 w-full rounded-xl border border-ink-900/10 px-4 py-3 outline-none focus:border-accent-500 focus:ring-4 focus:ring-accent-500/10"
        />
        {error && <p className="mt-3 text-sm text-red-600" role="alert">{error}</p>}
        <button disabled={busy || !password} className="mt-5 w-full rounded-xl bg-ink-900 py-3 font-medium text-white transition hover:bg-ink-700 disabled:opacity-50">
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </Centered>
  );
}

/* --------------------------------- editor -------------------------------- */

function Editor({ token, onSignOut }) {
  const live = useQuery(api.content.get);
  const save = useMutation(api.content.save);
  const reset = useMutation(api.content.reset);
  const logout = useMutation(api.auth.logout);
  const genUpload = useMutation(api.content.generateUploadUrl);
  const fileUrl = useMutation(api.content.fileUrl);

  const [draft, setDraft] = useState(null);
  const [baseline, setBaseline] = useState(null);
  const [tab, setTab] = useState(TABS[0].id);
  const [status, setStatus] = useState(null); // {kind, text}
  const [saving, setSaving] = useState(false);
  const importRef = useRef(null);

  // Load the saved content once; later live updates don't clobber edits in progress.
  useEffect(() => {
    if (live === undefined || draft) return;
    const initial = clone(mergeContent(live?.data));
    setDraft(initial);
    setBaseline(JSON.stringify(initial));
  }, [live, draft]);

  const dirty = draft && JSON.stringify(draft) !== baseline;

  useEffect(() => {
    const warn = (e) => { if (dirty) { e.preventDefault(); e.returnValue = ''; } };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  const flash = (kind, text) => {
    setStatus({ kind, text });
    if (kind === 'ok') setTimeout(() => setStatus((s) => (s?.text === text ? null : s)), 3500);
  };

  const handleAuthError = (err) => {
    if (/Not signed in/.test(err?.message || '')) {
      flash('error', 'Your session expired. To keep these edits, export a backup (Backup & Reset tab), then reload, sign in and import it.');
      return true;
    }
    return false;
  };

  const doSave = useCallback(async () => {
    if (!draft || saving) return;
    setSaving(true);
    try {
      await save({ token, data: draft });
      setBaseline(JSON.stringify(draft));
      flash('ok', 'Saved. Your site is updated live.');
    } catch (err) {
      if (!handleAuthError(err)) flash('error', err.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft, saving, token, save]);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') { e.preventDefault(); doSave(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [doSave]);

  const upload = useCallback(async (file) => {
    if (file.size > 20 * 1024 * 1024) throw new Error('File is larger than 20 MB');
    const url = await genUpload({ token });
    const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': file.type || 'application/octet-stream' }, body: file });
    if (!res.ok) throw new Error('Upload failed');
    const { storageId } = await res.json();
    return await fileUrl({ token, storageId });
  }, [genUpload, fileUrl, token]);

  const active = TABS.find((t) => t.id === tab);
  const siteUrl = useMemo(() => import.meta.env.BASE_URL || '/', []);

  if (!draft) return <Centered><Spinner /> Loading content…</Centered>;

  const setSection = (v) => setDraft((d) => ({ ...d, [active.path]: v }));

  return (
    <UploadContext.Provider value={upload}>
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-ink-900/[0.08] bg-[#f6f4ef]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3">
          <div className="mr-auto flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-ink-900 font-display text-sm font-bold text-white">
              {`${draft.profile.firstName?.[0] || ''}${draft.profile.lastName?.[0] || ''}`.toUpperCase()}
            </span>
            <div className="leading-tight">
              <p className="font-display font-semibold">Portfolio editor</p>
              <p className="text-xs text-ink-500">
                {dirty ? 'Unsaved changes' : live?.updatedAt ? `Saved ${new Date(live.updatedAt).toLocaleString()}` : 'Showing built-in content (nothing saved yet)'}
              </p>
            </div>
          </div>
          <a href={siteUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium text-ink-600 hover:bg-ink-900/[0.06]">
            View site <ArrowTopRightOnSquareIcon className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={async () => { if (dirty && !window.confirm('Sign out and lose unsaved changes?')) return; try { await logout({ token }); } catch { /* ignore */ } onSignOut(); }}
            className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium text-ink-600 hover:bg-ink-900/[0.06]"
          >
            <ArrowRightOnRectangleIcon className="h-4 w-4" /> Sign out
          </button>
          <button
            type="button"
            disabled={!dirty}
            onClick={() => { if (window.confirm('Discard all unsaved changes?')) setDraft(JSON.parse(baseline)); }}
            className="rounded-xl border border-ink-900/10 bg-white px-4 py-2 text-sm font-medium disabled:opacity-40"
          >
            Discard
          </button>
          <button
            type="button"
            disabled={!dirty || saving}
            onClick={doSave}
            className="rounded-xl bg-accent-600 px-5 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-accent-700 disabled:opacity-40"
          >
            {saving ? 'Saving…' : 'Save & publish'}
          </button>
        </div>
        {status && (
          <div className={`border-t px-4 py-2 text-center text-sm ${status.kind === 'ok' ? 'border-green-600/10 bg-green-50 text-green-800' : 'border-red-600/10 bg-red-50 text-red-700'}`} role="status">
            <span className="inline-flex items-center gap-1.5">
              {status.kind === 'ok' ? <CheckCircleIcon className="h-4 w-4" /> : <ExclamationTriangleIcon className="h-4 w-4" />}
              {status.text}
            </span>
          </div>
        )}
      </header>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[220px_1fr]">
        {/* Tabs */}
        <nav className="-mx-4 flex gap-1 overflow-x-auto px-4 pb-1 lg:sticky lg:top-24 lg:mx-0 lg:flex-col lg:self-start lg:overflow-visible lg:px-0" aria-label="Sections">
          {[...TABS, { id: 'backup', label: 'Backup & Reset' }].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`shrink-0 rounded-xl px-4 py-2.5 text-left text-sm font-medium transition ${tab === t.id ? 'bg-ink-900 text-white' : 'text-ink-600 hover:bg-ink-900/[0.06]'}`}
            >
              {t.label}
            </button>
          ))}
        </nav>

        {/* Panel */}
        <main className="min-w-0 rounded-3xl border border-ink-900/[0.08] bg-white p-5 shadow-soft sm:p-8">
          {active ? (
            <>
              <h2 className="font-display text-2xl font-semibold">{active.label}</h2>
              {active.hint && <p className="mt-1 text-sm text-ink-500">{active.hint}</p>}
              <div className="mt-7">
                <Field spec={active.spec} value={draft[active.path]} onChange={setSection} />
              </div>
            </>
          ) : (
            <Backup
              onExport={() => {
                const blob = new Blob([JSON.stringify(draft, null, 2)], { type: 'application/json' });
                const a = document.createElement('a');
                a.href = URL.createObjectURL(blob);
                a.download = `portfolio-content-${new Date().toISOString().slice(0, 10)}.json`;
                a.click();
                URL.revokeObjectURL(a.href);
              }}
              onImport={() => importRef.current?.click()}
              onLoadDefaults={() => {
                if (window.confirm('Replace everything in the editor with the built-in content? Nothing changes on the site until you press Save.')) {
                  setDraft(clone(DEFAULT_CONTENT));
                  flash('ok', 'Built-in content loaded into the editor. Press Save to publish it.');
                }
              }}
              onReset={async () => {
                if (!window.confirm('Delete all saved edits? The live site will go back to the built-in content right away. This cannot be undone (export a backup first).')) return;
                try {
                  await reset({ token });
                  const fresh = clone(DEFAULT_CONTENT);
                  setDraft(fresh);
                  setBaseline(JSON.stringify(fresh));
                  flash('ok', 'Saved edits deleted. The site is showing the built-in content.');
                } catch (err) {
                  if (!handleAuthError(err)) flash('error', err.message || 'Reset failed');
                }
              }}
            />
          )}
        </main>
      </div>

      <input
        ref={importRef}
        type="file"
        accept="application/json,.json"
        hidden
        onChange={async (e) => {
          const file = e.target.files?.[0];
          e.target.value = '';
          if (!file) return;
          try {
            const parsed = JSON.parse(await file.text());
            setDraft(clone(mergeContent(parsed)));
            flash('ok', 'Backup loaded into the editor. Press Save to publish it.');
          } catch {
            flash('error', 'That file is not a valid backup.');
          }
        }}
      />
    </UploadContext.Provider>
  );
}

function Backup({ onExport, onImport, onLoadDefaults, onReset }) {
  const Row = ({ icon: Icon, title, text, action, onClick, danger }) => (
    <div className="flex flex-col gap-3 border-b border-ink-900/[0.06] py-5 last:border-0 sm:flex-row sm:items-center">
      <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${danger ? 'bg-red-50 text-red-600' : 'bg-accent-500/10 text-accent-600'}`}><Icon className="h-5 w-5" /></span>
      <div className="flex-1">
        <p className="font-medium">{title}</p>
        <p className="text-sm text-ink-500">{text}</p>
      </div>
      <button type="button" onClick={onClick} className={`shrink-0 rounded-xl px-4 py-2 text-sm font-semibold ${danger ? 'bg-red-600 text-white hover:bg-red-700' : 'border border-ink-900/10 hover:bg-ink-900/[0.04]'}`}>{action}</button>
    </div>
  );
  return (
    <>
      <h2 className="font-display text-2xl font-semibold">Backup & Reset</h2>
      <p className="mt-1 text-sm text-ink-500">Keep a copy of your content, restore one, or start over.</p>
      <div className="mt-4">
        <Row icon={ArrowDownTrayIcon} title="Export backup" text="Download everything in the editor as a JSON file." action="Export" onClick={onExport} />
        <Row icon={ArrowUpTrayIcon} title="Import backup" text="Load a backup file into the editor. Review it, then Save." action="Import" onClick={onImport} />
        <Row icon={ArrowPathIcon} title="Load built-in content" text="Fill the editor with the content that ships with the site code." action="Load" onClick={onLoadDefaults} />
        <Row icon={ExclamationTriangleIcon} title="Reset live site" text="Delete saved edits so the site shows the built-in content again." action="Reset" onClick={onReset} danger />
      </div>
    </>
  );
}

function Centered({ children }) {
  return <div className="grid min-h-screen place-items-center p-4 text-sm text-ink-500"><div className="flex w-full flex-col items-center gap-2">{children}</div></div>;
}

function Spinner() {
  return <span className="h-5 w-5 animate-spin rounded-full border-2 border-ink-900/15 border-t-accent-600" />;
}
