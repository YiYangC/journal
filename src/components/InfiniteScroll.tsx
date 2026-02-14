"use client";

import { useEffect, useRef, useState } from "react";

interface InfiniteScrollProps {
  children: React.ReactNode;
  className?: string;
}

export default function InfiniteScroll({ children, className = "" }: InfiniteScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const clonesHeightRef = useRef(0);
  const scrollHeightRef = useRef(0);

  useEffect(() => {
    // Mobile detection
    const checkMobile = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
      setIsMobile(mobile);
    };
    checkMobile();
  }, []);

  useEffect(() => {
    if (isMobile || !containerRef.current) return;

    const container = containerRef.current;
    const menuItems = Array.from(container.children).filter(
      (child) => !child.classList.contains("loop__clone")
    ) as HTMLElement[];

    if (menuItems.length === 0) return;

    const cloneItems = () => {
      // Get the height of one menu item
      const itemHeight = menuItems[0].offsetHeight;
      // How many items fit in the window?
      const fitIn = Math.ceil(window.innerHeight / itemHeight);

      // Remove existing clones
      container.querySelectorAll(".loop__clone").forEach((clone) => {
        container.removeChild(clone);
      });

      // Add clones
      let totalClones = 0;
      menuItems.slice(0, fitIn).forEach((target) => {
        const clone = target.cloneNode(true) as HTMLElement;
        clone.classList.add("loop__clone");
        container.appendChild(clone);
        totalClones++;
      });

      // Store heights
      clonesHeightRef.current = totalClones * itemHeight;
      scrollHeightRef.current = container.scrollHeight;
    };

    const initScroll = () => {
      if (container.scrollTop <= 0) {
        container.scrollTop = 1;
      }
    };

    const scrollUpdate = () => {
      const scrollPos = container.scrollTop;

      if (clonesHeightRef.current + scrollPos >= scrollHeightRef.current) {
        // Scroll to the top when you've reached the bottom
        container.scrollTop = 1;
      } else if (scrollPos <= 0) {
        // Scroll to the bottom when you reach the top
        container.scrollTop = scrollHeightRef.current - clonesHeightRef.current;
      }
    };

    const render = () => {
      scrollUpdate();
      animationFrameRef.current = requestAnimationFrame(render);
    };

    const handleResize = () => {
      cloneItems();
      initScroll();
    };

    // Initialize
    cloneItems();
    initScroll();
    animationFrameRef.current = requestAnimationFrame(render);

    window.addEventListener("resize", handleResize);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  if (isMobile) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        overflowY: "scroll",
        height: "100vh",
      }}
    >
      {children}
    </div>
  );
}
