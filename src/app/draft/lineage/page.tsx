import { LineageMap } from "./LineageMap";
import { css } from "./styles";

export const metadata = {
  title: "Lineage",
  description: "Who read whom — philosophers, physicists and mathematicians as one weave.",
  robots: { index: false, follow: false },
};

export default function LineagePage() {
  return (
    <div className="ln">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <LineageMap />
    </div>
  );
}
