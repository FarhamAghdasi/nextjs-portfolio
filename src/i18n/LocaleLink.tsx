'use client';

import React from 'react';
import Link, { LinkProps } from 'next/link';
import { useLocaleContext } from './LocaleProvider';

type LocaleLinkProps = Omit<LinkProps, 'href'> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

/**
 * Drop-in replacement for next/link's <Link>. Pass locale-neutral
 * hrefs like "/about/" and it will automatically become "/fa/about/"
 * when rendered on a Persian page.
 */
const LocaleLink = React.forwardRef<HTMLAnchorElement, LocaleLinkProps>(
  ({ href, ...props }, ref) => {
    const { localizeHref } = useLocaleContext();
    return <Link ref={ref} href={localizeHref(href)} {...props} />;
  }
);

LocaleLink.displayName = 'LocaleLink';

export default LocaleLink;
