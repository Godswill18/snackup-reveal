import { Component, Suspense, useEffect, useRef, useState } from "react";

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

class SectionErrorBoundary extends Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full flex flex-col items-center justify-center gap-3 py-16 text-center">
          <p className="text-sm text-muted-foreground">Failed to load this section.</p>
          <button
            onClick={() => window.location.reload()}
            className="text-xs text-primary hover:underline"
          >
            Reload page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
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
        <SectionErrorBoundary>
          <Suspense fallback={<Skeleton minHeight={minHeight} />}>
            {children}
          </Suspense>
        </SectionErrorBoundary>
      ) : (
        <Skeleton minHeight={minHeight} />
      )}
    </div>
  );
}
