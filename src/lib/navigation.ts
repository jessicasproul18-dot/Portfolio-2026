import { Home, UserCircle2, Briefcase, Mail, type LucideIcon } from 'lucide-react';

export type NavigationItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

/** Pages that render the Get In Touch section with id="contact". */
const PAGES_WITH_CONTACT_SECTION = new Set(['/', '/about']);

export const navigationItems: NavigationItem[] = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'About', href: '/about', icon: UserCircle2 },
  { label: 'Portfolio', href: '/#work', icon: Briefcase },
  { label: 'Contact', href: '/#contact', icon: Mail },
];

/** Contact target for the current page: same-page hash when contact exists here. */
export const getContactHref = (pathname: string): string => {
  if (PAGES_WITH_CONTACT_SECTION.has(pathname)) return '#contact';
  return '/#contact';
};

/** Nav items with Contact (and same-page hashes) resolved for the current route. */
export const getNavigationItems = (pathname: string): NavigationItem[] =>
  navigationItems.map((item) => {
    if (item.label === 'Contact') {
      return { ...item, href: getContactHref(pathname) };
    }
    return item;
  });
