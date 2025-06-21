"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import gsap from "gsap";

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (pathname === "/about") {
      gsap.set(el, { paddingBottom: 120 });
    } else {
      gsap.set(el, { paddingBottom: 0 });
    }

    if (
      pathname.startsWith("/templates") ||
      (pathname.startsWith("/portfolio/") && pathname !== "/portfolio")
    ) {
      gsap.set(el, { opacity: 1, y: 0, clearProps: "opacity,y" });
      return;
    }

    gsap.fromTo(
      el,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );

    return () => {
      if (!el) return;
      gsap.to(el, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(el, { clearProps: "all" });
        },
      });
    };
  }, [pathname]);

  return <div ref={containerRef}>{children}</div>;
}
