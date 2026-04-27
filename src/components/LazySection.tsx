import { Suspense, useEffect, useRef, useState } from "react";

function Skeleton({ minHeight }: { minHeight: string }) {
  return (
    <div
      style={{ minHeight }}
      className="w-full flex items-center justify-center"
    >
      <div className="w-6 h-6 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
    </div>
  );
}

interface LazySectionProps {
  children: React.ReactNode;
  /** Approximate section height — keeps the placeholder from collapsing to 0 */
  minHeight?: string;
}

/**
 * Defers rendering until the placeholder scrolls within 400 px of the viewport,
 * then mounts children inside a Suspense boundary so the lazy JS chunk
 * can stream in without blocking the rest of the page.
 */
export function LazySection({ children, minHeight = "50vh" }: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {mounted ? (
        <Suspense fallback={<Skeleton minHeight={minHeight} />}>
          {children}
        </Suspense>
      ) : (
        <Skeleton minHeight={minHeight} />
      )}
    </div>
  );
}
