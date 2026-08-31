'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const SCROLL_HASH_KEY = 'scrollToHash';

const scrollToId = (id: string) => {
  if (!id) return;
  const elem = document.getElementById(id);
  if (!elem) return;
  elem.scrollIntoView({ behavior: 'smooth' });
};

const ScrollToAnchor = () => {
  const pathname = usePathname();

  useEffect(() => {
    const pendingHash = sessionStorage.getItem(SCROLL_HASH_KEY);
    if (pendingHash) {
      const timeoutId = window.setTimeout(() => {
        sessionStorage.removeItem(SCROLL_HASH_KEY);
        scrollToId(pendingHash);
      }, 50);
      return () => window.clearTimeout(timeoutId);
    }

    // Fresh page open / normal navigation: do not auto-jump to a leftover hash
    if (window.location.hash) {
      window.history.replaceState(
        null,
        '',
        `${window.location.pathname}${window.location.search}`,
      );
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href || href.startsWith('mailto:') || href.startsWith('tel:')) return;

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }

      if (url.origin !== window.location.origin) return;

      const hashId = url.hash.replace(/^#/, '');
      const isHomePath = url.pathname === '/';
      const isSamePath =
        url.pathname === window.location.pathname ||
        (isHomePath && window.location.pathname === '/');

      // Same-page link with no hash (e.g. Home): clear hash and stay at top
      if (isSamePath && !hashId) {
        if (!window.location.hash && window.scrollY === 0) return;
        event.preventDefault();
        window.history.pushState(null, '', `${url.pathname}${url.search}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (!hashId) return;

      // Cross-page hash link: remember target, let Next.js navigate, then scroll
      if (!isSamePath) {
        sessionStorage.setItem(SCROLL_HASH_KEY, hashId);
        return;
      }

      const elem = document.getElementById(hashId);
      if (!elem) return;

      event.preventDefault();
      window.history.pushState(null, '', `#${hashId}`);
      elem.scrollIntoView({ behavior: 'smooth' });
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [pathname]);

  return null;
};

export default ScrollToAnchor;
