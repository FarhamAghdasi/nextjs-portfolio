'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from '@/i18n/LocaleLink';
import Image from 'next/image';
import { gsap } from 'gsap';

import LanguageSwitcher from '@/i18n/LanguageSwitcher';
import { useLocale, useLocalizedData } from '@/i18n/LocaleProvider';
import contentEn from '@/data/en/header.json';
import contentFa from '@/data/fa/header.json';
const arrowIcon = '/assets/imgs/icons/arrow-top-right.svg';

const Header = () => {
    const locale = useLocale();
    const content = useLocalizedData(contentEn, contentFa);
    const [isHovered, setIsHovered] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const [strokeDashoffset, setStrokeDashoffset] = useState(307.919);
    const [isProgressActive, setIsProgressActive] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [subMenuOpen, setSubMenuOpen] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [subSubMenuOpen, setSubSubMenuOpen] = useState(false);

    const svgRef = useRef<SVGPathElement | null>(null);
    const cursorRef = useRef<HTMLDivElement | null>(null);
    const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
    const menuRef = useRef<HTMLDivElement | null>(null);

    const openMenuWithAnimation = () => {
        const menuEl = menuRef.current;
        if (menuEl) {
            gsap.to(menuEl, {
                x: '0%',
                duration: 0.3,
                ease: 'power2.out',
                onStart: () => {
                    setIsMenuOpen(true);
                    console.log('Menu opened');
                },
            });
        } else {
            setIsMenuOpen(true);
            console.log('Menu element not found, setting isMenuOpen to true');
        }
    };

    const closeMenuWithAnimation = () => {
        const menuEl = menuRef.current;
        if (menuEl) {
            gsap.to(menuEl, {
                x: '-100%',
                duration: 0.3,
                ease: 'power2.out',
                onComplete: () => {
                    setIsMenuOpen(false);
                    setSubMenuOpen(false);
                    setSubSubMenuOpen(false);
                    setHoveredIndex(null);
                    console.log('Menu closed');
                },
            });
        } else {
            setIsMenuOpen(false);
            setSubMenuOpen(false);
            setSubSubMenuOpen(false);
            setHoveredIndex(null);
            console.log('Menu element not found, resetting states');
        }
    };

    useEffect(() => {
        const handlePopState = () => {
            closeMenuWithAnimation();
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    useEffect(() => {
        let ticking = false;
        const updateProgress = () => {
            const scroll = window.scrollY;
            const height = document.documentElement.scrollHeight - window.innerHeight;
            const pathLength = 307.919;
            if (height > 0) {
                setStrokeDashoffset(pathLength - (scroll * pathLength) / height);
                setIsProgressActive(scroll > 150);
            }
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(updateProgress);
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        updateProgress();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 300) {
                navbar?.classList.add('nav-scroll');
            } else {
                navbar?.classList.remove('nav-scroll');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        // No entrance animation/timer here on purpose: the heading text is
        // already visible in the server-rendered HTML before any JS runs
        // (that's what a slow-network visitor sees first). `gsap.set` just
        // guarantees it stays at y:0/opacity:1 the instant this effect
        // mounts — no fade, no delay, nothing that could make it flicker or
        // disappear for even a frame while the page is still loading.
        gsap.set('.loader-wrap-heading .load-text, .loader-wrap-heading', { y: 0, opacity: 1 });

        // The exit used to fire on a fixed 2s timer. That's a guess tuned
        // for a fast device/connection — on a slow one, real page load
        // (bundle parse, fonts, images) can easily take longer, so the
        // curtain lifted and the text got yanked out before the visitor
        // ever really saw it. Instead, wait for the page to actually be
        // ready: `MIN_VISIBLE_MS` stops a flash-hide on very fast/cached
        // loads, `MAX_WAIT_MS` stops the loader hanging forever if `load`
        // never fires for some reason.
        const MIN_VISIBLE_MS = 700;
        const MAX_WAIT_MS = 8000;
        const shownAt = Date.now();

        let exitTl: gsap.core.Timeline | null = null;
        let settled = false;
        let holdTimer: number | null = null;

        const playExit = () => {
            if (settled) return;
            settled = true;
            const remaining = Math.max(0, MIN_VISIBLE_MS - (Date.now() - shownAt));

            holdTimer = window.setTimeout(() => {
                exitTl = gsap.timeline();
                exitTl
                    .to('.loader-wrap-heading .load-text, .loader-wrap-heading', {
                        y: -100,
                        opacity: 0,
                        onComplete: () => {
                            const headerContainer = document.querySelector('header .container');
                            if (headerContainer) {
                                gsap.fromTo(headerContainer, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1 });
                            }
                        },
                    })
                    .to(svgRef.current, { duration: 0.5, attr: { d: content.svgCurve }, ease: 'power2.easeIn' })
                    .to(svgRef.current, { duration: 0.5, attr: { d: content.svgFlat }, ease: 'power2.easeOut' })
                    .to('.loader-wrap', { y: -1500 })
                    .to('.loader-wrap', {
                        zIndex: -1,
                        display: 'none',
                        onComplete: () => {
                            (window as Window & { __appLoaded?: boolean }).__appLoaded = true;
                            window.dispatchEvent(new Event('appLoaded'));
                        },
                    });
            }, remaining);
        };

        if (document.readyState === 'complete') {
            playExit();
        } else {
            window.addEventListener('load', playExit);
        }
        const maxTimer = window.setTimeout(playExit, MAX_WAIT_MS);

        // Without this, React 18 Strict Mode's mount->unmount->remount in dev
        // creates a second, orphaned timeline racing the first one against
        // the same elements, which is exactly the kind of thing that leaves
        // the loader text in an inconsistent state.
        return () => {
            exitTl?.kill();
            window.removeEventListener('load', playExit);
            window.clearTimeout(maxTimer);
            if (holdTimer !== null) window.clearTimeout(holdTimer);
        };
    }, [content.svgCurve, content.svgFlat]);

    useEffect(() => {
        const animateit = (e: MouseEvent) => {
            const target = e.currentTarget as HTMLAnchorElement;
            if (!target.closest('.hamenu')) return;
            const hoverAnim = target.querySelector('.hover-anim') as HTMLElement;
            const { offsetX: x, offsetY: y } = e;
            const { offsetWidth: width, offsetHeight: height } = target;
            const move = 25;
            const xMove = (x / width) * (move * 2) - move;
            const yMove = (y / height) * (move * 2) - move;
            if (hoverAnim) hoverAnim.style.transform = `translate(${xMove}px, ${yMove}px)`;
            if (e.type === 'mouseleave') hoverAnim.style.transform = '';
        };
    
        const editCursor = (e: MouseEvent) => {
            if (cursorRef.current) {
                cursorRef.current.style.left = `${e.clientX}px`;
                cursorRef.current.style.top = `${e.clientY}px`;
            }
        };
    
        const links = [...linkRefs.current];
        links.forEach((link) => {
            if (link) {
                link.addEventListener('mousemove', animateit);
                link.addEventListener('mouseleave', animateit);
            }
        });
        window.addEventListener('mousemove', editCursor);
    
        return () => {
            links.forEach((link) => {
                if (link) {
                    link.removeEventListener('mousemove', animateit);
                    link.removeEventListener('mouseleave', animateit);
                }
            });
            window.removeEventListener('mousemove', editCursor);
        };
    }, []);
    

    const toggleMenu = () => {
        if (isMenuOpen) {
            closeMenuWithAnimation();
        } else {
            openMenuWithAnimation();
        }
        if (window.innerWidth <= 991) {
            setIsNavbarOpen(false);
        } else {
            setIsNavbarOpen(!isNavbarOpen);
        }
    };

    const handleSubMenuToggle = () => {
        setSubMenuOpen(!subMenuOpen);
    };

    const scrollToTop = () => {
        const start = window.scrollY;
        const duration = 800;
        const startTime = performance.now();

        const animateScroll = (currentTime: number) => {
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const easeInOutQuad = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
            window.scrollTo(0, start * (1 - easeInOutQuad(progress)));
            if (progress < 1) requestAnimationFrame(animateScroll);
        };

        requestAnimationFrame(animateScroll);
    };

    const hamMenuText = locale === 'fa'
        ? {
            home: 'خانه',
            about: 'درباره من',
            portfolio: 'نمونه‌کارها',
            contact: 'تماس با من',
            blog: 'وبلاگ',
            templates: 'قالب‌های HTML',
            works: 'نمونه‌کارها',
        }
        : {
            home: 'Home',
            about: 'About Me',
            portfolio: 'Portfolio',
            contact: 'Contact Me',
            blog: 'Blog',
            templates: 'HTML Templates',
            works: 'Works',
        };

    const hamburgerMenuItems = [
        { key: 'home', label: hamMenuText.home, href: '/' },
        { key: 'about', label: hamMenuText.about, href: '/about/' },
        { key: 'portfolio', label: hamMenuText.portfolio, href: '/portfolio/', hasSubMenu: true },
        { key: 'contact', label: hamMenuText.contact, href: '/contact/' },
        { key: 'blog', label: hamMenuText.blog, href: '/blog/' },
    ];

    return (
        <>
            <div className="loader-wrap">
                <svg viewBox="0 0 1000 1000" preserveAspectRatio="none">
                    <path ref={svgRef} d="M0,1005S175,995,500,995s500,5,500,5V0H0Z" />
                </svg>
                <div className="loader-wrap-heading">
                    <div className="load-text">
                        {content.loaderText}
                    </div>
                </div>
            </div>

            <div ref={cursorRef} className="cursor" />
            <canvas id="canvas_banner" className="banner_canvas" />

            <div className={`progress-wrap cursor-pointer ${isProgressActive ? 'active-progress' : ''}`} onClick={scrollToTop}>
                <svg className="progress-circle svg-content" viewBox="-1 -1 102 102">
                    <path
                        d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
                        style={{
                            strokeDasharray: '307.919, 307.919',
                            strokeDashoffset,
                        }}
                    />
                </svg>
            </div>

            <nav className="navbar">
                <div className="container mx-auto px-4 flex items-center justify-between gap-6">
                    <Link href="/" className="logo">
                        <span className="text-2xl font-bold uppercase">farham</span>
                    </Link>

                    <div className={`${isNavbarOpen ? 'flex' : 'hidden'} lg:flex`}>
                        <ul className="navbar-nav flex list-none m-0 p-0 items-center">
                            {content.menuItems
                                .filter((item) => item.href !== '/contact/')
                                .map((item, idx) => (
                                    <li key={idx}>
                                        <Link
                                            href={item.href}
                                            className="nav-link no-underline"
                                            onClick={() => closeMenuWithAnimation()}
                                            ref={(el) => {
                                                linkRefs.current[idx] = el;
                                            }}
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                        </ul>
                    </div>

                    <div className="topnav flex items-center gap-3">
                        <LanguageSwitcher className="me-[20px]" />
                        <Link href={content.ctaHref} className="butn butn-rounded">
                            <div className="flex items-center">
                                <span>{content.ctaText}</span>
                                <span className="icon ms-[10px]">
                                    <Image src={arrowIcon} alt="Arrow" width={20} height={20} className="rtl-flip" unoptimized/>
                                </span>
                            </div>
                        </Link>
                        <div
                            className="menu-icon cursor-pointer"
                            onClick={toggleMenu}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            <span className={`icon menu-icon-anim ${isHovered ? 'fa fa-align-center' : 'fa fa-align-right'}`} />
                        </div>
                    </div>
                </div>
            </nav>

            <div ref={menuRef} className={`hamenu ${isMenuOpen ? 'open' : ''}`} style={{ left: isMenuOpen ? '0' : '-100%' }}>
                <div className="close-menu cursor-pointer" onClick={toggleMenu}>✕</div>
                <div className="w-full px-4 lg:flex">
                    <div className="menu-links">
                        <ul className="main-menu rest">
                            {hamburgerMenuItems.map((item, idx) => (
                                <li
                                    key={idx}
                                    onMouseEnter={() => setHoveredIndex(idx)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    onClick={() => {
                                        if (item.key !== 'portfolio') {
                                            closeMenuWithAnimation();
                                        }
                                    }}
                                    className={hoveredIndex !== null && hoveredIndex !== idx ? 'hoverd' : ''}
                                >
                                    <div className="o-hidden">
                                        {item.key === 'portfolio' ? (
                                            <div className="link cursor-pointer dmenu" onClick={handleSubMenuToggle}>
                                                <span className="fill-text" data-text={item.label}>
                                                    {item.label}
                                                </span>
                                                <i />
                                            </div>
                                        ) : (
                                            <Link
                                                href={item.href}
                                                className="link"
                                                ref={(el) => {
                                                    linkRefs.current[content.menuItems.length + idx] = el;
                                                }}
                                            >
                                                <span className="fill-text hover-anim" data-text={item.label}>
                                                    {item.label}
                                                </span>
                                            </Link>
                                        )}
                                    </div>
                                    {item.key === 'portfolio' && (
                                        <div className={`sub-menu ${subMenuOpen ? 'sub-open' : ''}`} style={{ display: subMenuOpen ? 'block' : 'none' }}>
                                            <ul>
                                                <li>
                                                    <Link href="/templates" className="sub-link" onClick={() => closeMenuWithAnimation()}>
                                                        {hamMenuText.templates}
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/portfolio" className="sub-link" onClick={() => closeMenuWithAnimation()}>
                                                        {hamMenuText.works}
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="cont-info valign">
                        <div className="text-center full-width">
                            <div className="social-icon mt-[40px]">
                                {content.socialLinks.map((link, i) => (
                                    <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.name}>
                                        <i className={link.icon} />
                                    </a>
                                ))}
                            </div>
                            <div className="item mt-[30px]">
                                <h5>{content.contactLocation}</h5>
                            </div>
                            <div className="item mt-[10px]">
                                <h5>
                                    <a href={`tel:${content.contactPhone.replace(/\s+/g, '')}`} dir="ltr">{content.contactPhone}</a>
                                </h5>
                            </div>
                            <div className="item mt-[10px]">
                                <h5>
                                    <a href={`mailto:${content.contactEmail}`}>{content.contactEmail}</a>
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;