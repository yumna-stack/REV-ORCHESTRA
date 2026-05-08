"use client";

import { useEffect, useState } from "react";

type TocItem = { id: string; label: string; level: 1 | 2 };

export default function TableOfContents({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const onIntersect: IntersectionObserverCallback = (entries) => {
      const visible = entries.filter((e) => e.isIntersecting);
      if (visible.length > 0) {
        const top = visible.sort(
          (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
        )[0];
        setActive(top.target.id);
      }
    };
    const io = new IntersectionObserver(onIntersect, {
      rootMargin: "-120px 0px -60% 0px",
      threshold: [0, 1],
    });
    items.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) io.observe(el);
    });
    observers.push(io);
    return () => observers.forEach((o) => o.disconnect());
  }, [items]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActive(id);
    }
  };

  return (
    <aside aria-label="On this page">
      <p className="text-[11px] font-semibold tracking-[0.16em] text-[rgba(14,15,17,0.5)] uppercase mb-4 pl-4">
        On this page
      </p>
      <nav className="border-l border-[rgba(0,0,0,0.1)]">
        <ul className="flex flex-col">
          {items.map((item) => {
            const isActive = active === item.id;
            const baseIndent = item.level === 2 ? "pl-8" : "pl-4";
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item.id)}
                  className={`relative block py-2 pr-3 ${baseIndent} text-sm leading-[150%] transition-colors duration-200 ${
                    isActive
                      ? "text-[rgb(14,15,17)] font-medium"
                      : "text-[rgba(14,15,17,0.5)] hover:text-[rgb(14,15,17)]"
                  }`}
                >
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 bottom-0 w-px transition-colors duration-200"
                    style={{
                      backgroundColor: isActive
                        ? "var(--color-accent-orange, #E85600)"
                        : "transparent",
                      marginLeft: -1,
                      width: isActive ? 2 : 1,
                    }}
                  />
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
