import Link from "next/link";
import { SpacetimeSushi } from "./SpacetimeSushi";
import { css } from "./styles";

export const metadata = {
  title: "Spacetime Sushi",
  description:
    "A small game about the present moment: slice a block of spacetime and watch simultaneity fall apart.",
  robots: { index: false, follow: false },
};

export default function SpacetimeSushiPage() {
  return (
    <div className="ss">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div className="ss-col">
        <header className="ss-head">
          <span className="ss-eye">Draft · a small physics toy</span>
          <h1>
            Spacetime
            <br />
            Sushi.
          </h1>
          <p>
            Carlo Rovelli&rsquo;s picture: the whole of spacetime is a block, already there — a
            sushi roll. Your present moment is nothing but a slice through it, and how fast you move
            decides at what angle you cut. Move differently, cut differently, and other people&rsquo;s
            nows stop being yours.
          </p>
        </header>

        <SpacetimeSushi />

        <section className="ss-note">
          <h2>What you are actually doing</h2>
          <p>
            The roll is a spacetime diagram: left and right is space, up is the future. Every
            filling is an event — something that happens somewhere, once. Nothing inside the roll
            ever moves; the block is finished.
          </p>
          <p>
            The bright line is your surface of simultaneity. Tilting it is exactly the maths of
            special relativity: at speed <span className="ss-num">β</span> your now is the line{" "}
            <span className="ss-num">t = βx + c</span>. That is why the knife stops at 45° — the
            light cone is a wall, and it is the one piece of order everyone agrees on. Inside it,
            before and after are absolute. Outside it, they are only your slice.
          </p>
          <p className="ss-src">
            After <em>The Order of Time</em> and <em>Reality Is Not What It Seems</em>. The physics
            here is the special-relativistic half of the story — the part where the universal
            present dies. Loop quantum gravity picks up where this leaves off.
          </p>
        </section>

        <footer className="ss-foot">
          <Link href="/draft/list">All drafts</Link>
          <Link href="/games">Games</Link>
        </footer>
      </div>
    </div>
  );
}
