'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { useRouter, usePathname } from 'next/navigation';

import content from '@/data/header.json';
import logoLight from '@/assets/imgs/Logo-light.png';
import arrowIcon from '@/assets/imgs/icons/arrow-top-right.svg';

const Header = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [isHovered, setIsHovered] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const [strokeDashoffset, setStrokeDashoffset] = useState(307.919);
    const [isProgressActive, setIsProgressActive] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [subMenuOpen, setSubMenuOpen] = useState(false);
    const [subSubMenuOpen, setSubSubMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const svgRef = useRef<SVGPathElement | null>(null);
    const cursorRef = useRef<HTMLDivElement | null>(null);
    const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
    const menuRef = useRef<HTMLDivElement | null>(null); // رفرنس برای منوی همبرگری

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
        const updateProgress = () => {
            const scroll = window.scrollY;
            const height = document.documentElement.scrollHeight - window.innerHeight;
            const pathLength = 307.919;
            if (height > 0) {
                setStrokeDashoffset(pathLength - (scroll * pathLength) / height);
                setIsProgressActive(scroll > 150);
            }
        };

        window.addEventListener('scroll', updateProgress);
        updateProgress();
        return () => window.removeEventListener('scroll', updateProgress);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 300);
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
        const tl = gsap.timeline();
        tl.to('.loader-wrap-heading .load-text, .loader-wrap-heading', {
            delay: 2,
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
            .to('.loader-wrap', { zIndex: -1, display: 'none' });
    }, []);

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

        linkRefs.current.forEach((link) => {
            if (link) {
                link.addEventListener('mousemove', animateit);
                link.addEventListener('mouseleave', animateit);
            }
        });
        window.addEventListener('mousemove', editCursor);

        return () => {
            linkRefs.current.forEach((link) => {
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

    const handleSubSubMenuToggle = () => {
        setSubSubMenuOpen(!subSubMenuOpen);
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

    const hamburgerMenuItems = [
        { label: 'Home', href: '/' },
        { label: 'About Me', href: '/about' },
        { label: 'Portfolio', href: '/portfolio', hasSubMenu: true },
        { label: 'Contact Me', href: '/contact' },
        { label: 'Blog', href: '/blog' },
    ];

    return (
        <>
            <div className="loader-wrap">
                <svg viewBox="0 0 1000 1000" preserveAspectRatio="none">
                    <path ref={svgRef} d="M0,1005S175,995,500,995s500,5,500,5V0H0Z" />
                </svg>
                <div className="loader-wrap-heading">
                    <div className="load-text">
                        {content.loaderText.split('').map((ch, i) => (
                            <span key={i}>{ch}</span>
                        ))}
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
                            transition: 'stroke-dashoffset 10ms linear',
                            strokeDasharray: '307.919, 307.919',
                            strokeDashoffset,
                        }}
                    />
                </svg>
            </div>

            <nav className="navbar navbar-expand-lg">
                <div className="container">
                    <Link href="/" className="logo">
                        <Image src={logoLight} alt={content.logoAlt} width={100} height={50} />
                    </Link>

                    <div className={`collapse navbar-collapse ${isNavbarOpen ? 'show' : ''}`}>
                        <ul className="navbar-nav">
                            {content.menuItems
                                .filter((item) => item.label !== 'Contact Me')
                                .map((item, idx) => (
                                    <li key={idx} className="nav-item">
                                        <Link
                                            href={item.href}
                                            className="nav-link"
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

                    <div className="topnav d-flex align-items-center">
                        <Link href={content.ctaHref} className="butn butn-rounded">
                            <div className="d-flex align-items-center">
                                <span>{content.ctaText}</span>
                                <span className="icon ml-10">
                                    <Image src={arrowIcon} alt="Arrow" width={20} height={20} />
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
                <div className="container-fluid rest d-lg-flex">
                    <div className="menu-links">
                        <ul className="main-menu rest">
                            {hamburgerMenuItems.map((item, idx) => (
                                <li
                                    key={idx}
                                    onMouseEnter={() => setHoveredIndex(idx)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    onClick={() => {
                                        if (item.label !== 'Portfolio') {
                                            closeMenuWithAnimation();
                                        }
                                    }}
                                    className={hoveredIndex !== null && hoveredIndex !== idx ? 'hoverd' : ''}
                                >
                                    <div className="o-hidden">
                                        {item.label === 'Portfolio' ? (
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
                                    {item.label === 'Portfolio' && (
                                        <div className={`sub-menu ${subMenuOpen ? 'sub-open' : ''}`} style={{ display: subMenuOpen ? 'block' : 'none' }}>
                                            <ul>
                                                <li>
                                                    <Link href="/templates" className="sub-link" onClick={() => closeMenuWithAnimation()}>
                                                        HTML Templates
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/portfolio" className="sub-link" onClick={() => closeMenuWithAnimation()}>
                                                        Works
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
                            <div className="social-icon mt-40">
                                {content.socialLinks.map((link, i) => (
                                    <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.name}>
                                        <i className={link.icon} />
                                    </a>
                                ))}
                            </div>
                            <div className="item mt-30">
                                <h5>{content.contactLocation}</h5>
                            </div>
                            <div className="item mt-10">
                                <h5>
                                    <a href={`tel:${content.contactPhone.replace(/\s+/g, '')}`}>{content.contactPhone}</a>
                                </h5>
                            </div>
                            <div className="item mt-10">
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