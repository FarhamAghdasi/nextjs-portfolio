'use client';

import React, { useState, useEffect, useRef, FC, MouseEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import LogoLight from '@/assets/imgs/Logo-light.png'
import ArrowRightTop from '@/assets/imgs/icons/arrow-top-right.svg'

import content from '@/data/header.json';

const Header: FC = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [strokeDashoffset, setStrokeDashoffset] = useState(307.919);
    const [isProgressActive, setIsProgressActive] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [subMenuOpen, setSubMenuOpen] = useState(false);

    const svgRef = useRef<SVGPathElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);
    const linkRefs = useRef<HTMLAnchorElement[]>([]);

    useEffect(() => {
        const updateProgress = () => {
            const scroll = window.scrollY;
            const height = document.documentElement.scrollHeight - window.innerHeight;
            const len = 307.919;
            setStrokeDashoffset(len - (scroll * len) / height);
            setIsProgressActive(scroll > 150);
        };

        window.addEventListener('scroll', updateProgress);
        updateProgress();
        return () => window.removeEventListener('scroll', updateProgress);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const navbar = document.querySelector('.navbar');
            const logo = navbar?.querySelector<HTMLImageElement>('.logo img');
            if (window.scrollY > 300) {
                navbar?.classList.add('nav-scroll');
                if (logo) logo.src = '@/assets/imgs/logo-dark.png';
            } else {
                navbar?.classList.remove('nav-scroll');
                if (logo) logo.src = '@/assets/imgs/Logo-light.png';
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const tl = gsap.timeline();
        tl.to('.loader-wrap-heading .load-text, .loader-wrap-heading', {
            delay: 2, y: -100, opacity: 0, onComplete() {
                const con = document.querySelector('header .container');
                if (con) gsap.fromTo(con, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1 });
            }
        })
            .to(svgRef.current, { duration: 0.5, attr: { d: content.svgCurve }, ease: 'power2.easeIn' })
            .to(svgRef.current, { duration: 0.5, attr: { d: content.svgFlat }, ease: 'power2.easeOut' })
            .to('.loader-wrap', { y: -1500 })
            .to('.loader-wrap', { zIndex: -1, display: 'none' });
    }, []);

    useEffect(() => {
        const animateit = (e: MouseEvent<HTMLAnchorElement>) => {
            const hover = (e.currentTarget.querySelector('.hover-anim') as HTMLElement);
            const { offsetX: x, offsetY: y, offsetWidth: w, offsetHeight: h } = e.nativeEvent as any;
            const move = 25;
            hover.style.transform = `translate(${(x / w) * move * 2 - move}px, ${(y / h) * move * 2 - move}px)`;
        };

        const editCursor = (e: MouseEvent<Window>) => {
            if (!cursorRef.current) return;
            cursorRef.current.style.left = e.clientX + 'px';
            cursorRef.current.style.top = e.clientY + 'px';
        };

        linkRefs.current.forEach(link => {
            link.addEventListener('mousemove', animateit as any);
            link.addEventListener('mouseleave', animateit as any);
        });
        window.addEventListener('mousemove', editCursor as any);

        return () => {
            linkRefs.current.forEach(link => {
                link.removeEventListener('mousemove', animateit as any);
                link.removeEventListener('mouseleave', animateit as any);
            });
            window.removeEventListener('mousemove', editCursor as any);
        };
    }, []);

    const toggleMenu = () => setIsMenuOpen(o => !o);
    const scrollToTop = () => {
        const start = window.scrollY;
        const dur = 800;
        const sTime = performance.now();
        const animate = (now: number) => {
            const t = Math.min((now - sTime) / dur, 1);
            const d = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            window.scrollTo(0, start * (1 - d));
            if (t < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    };

    return (
        <>
            <div className="loader-wrap">
                <svg viewBox="0 0 1000 1000" preserveAspectRatio="none">
                    <path ref={svgRef} d="M0,1005S175,995,500,995s500,5,500,5V0H0Z" />
                </svg>
                <div className="loader-wrap-heading">
                    <div className="load-text">{content.loaderText.split('').map((ch, i) => <span key={i}>{ch}</span>)}</div>
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
                            strokeDasharray: '307.919',
                            strokeDashoffset
                        }}
                    />
                </svg>
            </div>

            <nav className="navbar navbar-expand-lg">
                <div className="container">
                    <Link href="/" className="logo">
                        <Image src={LogoLight} alt={content.logoAlt} />
                    </Link>

                    <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
                        <ul className="navbar-nav">
                            {content.menuItems.map((item, idx) => (
                                <li key={idx} className="nav-item">
                                    <Link href={item.href} legacyBehavior passHref>
                                        <a
                                            ref={el => {
                                                if (el) linkRefs.current[idx] = el;
                                            }}
                                            className="nav-link"
                                        >
                                            <span className="hover-anim">{item.label}</span>
                                        </a>
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
                                    <Image src={ArrowRightTop} alt="" />
                                </span>
                            </div>
                        </Link>
                        <div className="menu-icon cursor-pointer" onClick={toggleMenu}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            <span className={`icon ${isHovered ? 'fa fa-align-center' : 'fa fa-align-right'}`} />
                        </div>
                    </div>
                </div>
            </nav>

            <div className={`hamenu ${isMenuOpen ? 'open' : ''}`} style={{ left: isMenuOpen ? '0' : '-100%' }}>
                <div className="close-menu cursor-pointer" onClick={toggleMenu}>✕</div>
                <div className="container-fluid rest d-lg-flex">
                    <div className="menu-links">
                        <ul className="main-menu rest">
                            {content.menuItems.map((item, idx) => (
                                <li key={idx} onMouseEnter={() => setHoveredIndex(idx)} onMouseLeave={() => setHoveredIndex(null)}
                                    className={hoveredIndex !== null && hoveredIndex !== idx ? 'hoverd' : ''}
                                >
                                    <Link href={item.href} className="link">
                                        <span className="fill-text" data-text={item.label}>{item.label}</span>
                                    </Link>
                                    {item.label === 'Portfolio' && (
                                        <div className={`sub-menu ${subMenuOpen ? 'sub-open' : ''}`}>
                                            <ul>
                                                <li><Link href="/templates" className="sub-link">HTML Templates</Link></li>
                                                <li><Link href="/portfolio" className="sub-link">Works</Link></li>
                                            </ul>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="cont-info valign text-center">
                        <div className="social-icon mt-40">
                            {content.socialLinks.map((s, i) => (
                                <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.name}>
                                    <i className={s.icon} />
                                </a>
                            ))}
                        </div>
                        <div className="item mt-30"><h5>{content.contactLocation}</h5></div>
                        <div className="item mt-10"><h5><a href={`tel:${content.contactPhone.replace(/\s+/g, '')}`}>{content.contactPhone}</a></h5></div>
                        <div className="item mt-10"><h5><a href={`mailto:${content.contactEmail}`}>{content.contactEmail}</a></h5></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
