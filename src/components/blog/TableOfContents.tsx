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
    <aside className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgb(8,8,10)] overflow-hidden">
      <div className="px-5 py-4 border-b border-[rgba(255,255,255,0.06)] bg-[rgba(232,86,0,0.04)]">
        <h4 className="text-sm font-semibold text-white tracking-wide">
          Relevant Contents
        </h4>
      </div>
      <nav className="px-5 py-5">
        <ul className="flex flex-col gap-3">
          {items.map((item) => {
            const isActive = active === item.id;
            return (
              <li
                key={item.id}
                className={item.level === 2 ? "pl-4" : ""}
                style={{
                  listStyle: item.level === 1 ? "disc" : "circle",
                  listStylePosition: "inside",
                }}
              >
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item.id)}
                  className={`inline text-sm leading-[150%] transition-colors ${
                    isActive
                      ? "text-accent-orange"
                      : "text-[rgba(255,255,255,0.55)] hover:text-white"
                  }`}
                >
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
