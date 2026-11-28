import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { DEFAULT_CONTENT, mergeContent } from '../data/defaultContent';
import { withBase } from '../data/projects';

const CACHE_KEY = 'portfolio-content-v1';
const ContentContext = createContext(DEFAULT_CONTENT);

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : undefined;
  } catch {
    return undefined;
  }
}

/** Resolves local asset paths (e.g. "/foo.png") against Vite's base URL. */
function resolveAssets(content) {
  return {
    ...content,
    profile: {
      ...content.profile,
      portraitUrl: withBase(content.profile.portraitUrl || ''),
    },
    projects: {
      ...content.projects,
      items: (content.projects.items || []).map((p) => ({
        ...p,
        images: (p.images || []).filter(Boolean).map(withBase),
      })),
    },
  };
}

/**
 * Supplies live site content. Saved content (from the admin page) streams in
 * from Convex; until it arrives we show the last cached copy, then defaults.
 * `null` from Convex means nothing was saved yet, so defaults are used.
 */
export function ContentProvider({ children }) {
  const live = useQuery(api.content.get);

  useEffect(() => {
    if (live === undefined) return;
    try {
      if (live) localStorage.setItem(CACHE_KEY, JSON.stringify(live.data));
      else localStorage.removeItem(CACHE_KEY);
    } catch { /* storage unavailable: fine */ }
  }, [live]);

  const value = useMemo(() => {
    const source = live === undefined ? readCache() : live?.data;
    return resolveAssets(mergeContent(source));
  }, [live]);

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export const useContent = () => useContext(ContentContext);
