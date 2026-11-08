import { useMemo, useState } from "react";
import { FLASHCARDS } from "../data/flashcards";
import { DOMAINS } from "../data/domains";
import { shuffle } from "../data";

export default function Flashcards({ onExit }: { onExit: () => void }) {
  const [domainFilter, setDomainFilter] = useState<number>(0); // 0 = all
  const [order, setOrder] = useState(() => FLASHCARDS.map((c) => c.id));
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const cards = useMemo(() => {
    const list = domainFilter === 0 ? FLASHCARDS : FLASHCARDS.filter((c) => c.domain === domainFilter);
    const map = new Map(FLASHCARDS.map((c) => [c.id, c]));
    return order.map((id) => map.get(id)!).filter((c) => list.includes(c));
  }, [domainFilter, order]);

  const card = cards[Math.min(idx, cards.length - 1)];

  const reset = (f: number) => {
    setDomainFilter(f);
    setIdx(0);
    setFlipped(false);
  };

  const doShuffle = () => {
    setOrder(shuffle(FLASHCARDS.map((c) => c.id)));
    setIdx(0);
    setFlipped(false);
  };

  const dom = card ? DOMAINS.find((d) => d.id === card.domain)! : null;

  return (
    <div className="mx-auto w-full max-w-2xl px-4 pb-16">
      <div className="mb-6 flex items-center justify-between">
        <button onClick={onExit} className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          ← Dashboard
        </button>
        <h2 className="text-lg font-semibold">Flashcards</h2>
        <button onClick={doShuffle} className="rounded-md border border-border bg-card px-3 py-2 text-sm transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          Shuffle
        </button>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => reset(0)}
          className={`rounded-full px-3.5 py-1.5 font-mono text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${domainFilter === 0 ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
        >
          All ({FLASHCARDS.length})
        </button>
        {DOMAINS.map((d) => (
          <button
            key={d.id}
            onClick={() => reset(d.id)}
            className={`rounded-full px-3.5 py-1.5 font-mono text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${domainFilter === d.id ? "text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
            style={domainFilter === d.id ? { backgroundColor: d.color } : undefined}
          >
            {d.code} ({FLASHCARDS.filter((c) => c.domain === d.id).length})
          </button>
        ))}
      </div>

      {card && dom ? (
        <>
          <button
            onClick={() => setFlipped((f) => !f)}
            className="card-glow flex min-h-64 w-full cursor-pointer flex-col items-center justify-center rounded-xl border border-border bg-card p-8 text-center transition-transform duration-200 hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={flipped ? "Show term" : "Show definition"}
          >
            <span className="mb-4 rounded-full px-2.5 py-1 font-mono text-[10px] font-bold" style={{ backgroundColor: `${dom.color}1f`, color: dom.color }}>
              {dom.code} {dom.title}
            </span>
            {!flipped ? (
              <>
                <p className="text-xl font-bold md:text-2xl">{card.front}</p>
                <p className="mt-6 font-mono text-xs text-muted-foreground">tap to reveal</p>
              </>
            ) : (
              <p className="text-sm leading-relaxed text-foreground/90 md:text-base">{card.back}</p>
            )}
          </button>
          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={() => { setIdx((i) => Math.max(0, i - 1)); setFlipped(false); }}
              disabled={idx === 0}
              className="rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium transition-colors hover:bg-secondary disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              ← Prev
            </button>
            <span className="font-mono text-sm text-muted-foreground">
              {idx + 1} / {cards.length}
            </span>
            <button
              onClick={() => { setIdx((i) => Math.min(cards.length - 1, i + 1)); setFlipped(false); }}
              disabled={idx >= cards.length - 1}
              className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Next →
            </button>
          </div>
        </>
      ) : (
        <p className="rounded-lg border border-border bg-card p-6 text-center text-sm text-muted-foreground">No cards in this filter.</p>
      )}
    </div>
  );
}
