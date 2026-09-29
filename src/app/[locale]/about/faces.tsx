import Image from "next/image"

/** "How I looked back then": one square face per era, shown on About and in the homepage Why me teaser. */
export const FACES = ["1981", "1988", "1999", "2004", "2010", "2015", "2019", "2022", "2026"] as const
export type Face = (typeof FACES)[number]
/** Replaced photos get a new file name so the image optimizer cache can't serve the old one. */
const FACE_FILE: Partial<Record<Face, string>> = { "2015": "2015-eyes" }

/** size = the largest CSS pixel width the circle is shown at, so Next serves a small file. */
export function FaceImg({ face, size, className = "", priority }: { face: Face; size: number; className?: string; priority?: boolean }) {
  return (
    <Image
      src={`/about/faces/${FACE_FILE[face] ?? face}.jpg`}
      alt=""
      width={size}
      height={size}
      priority={priority}
      className={`h-full w-full rounded-full object-cover ${className}`}
    />
  )
}

/** The overlapping row of faces with their year underneath. */
export function FaceStrip({ ring = "border-paper", yearClass = "text-ink/50", priority }: { ring?: string; yearClass?: string; priority?: boolean }) {
  return (
    <ol className="flex flex-wrap justify-center gap-y-6 pl-3 md:flex-nowrap">
      {FACES.map((f, i) => (
        <li key={f} className="group -ml-3 flex flex-col items-center gap-2" style={{ zIndex: i }}>
          <div
            className={`h-16 w-16 rounded-full border-[3px] ${ring} shadow-[0_8px_20px_-10px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:-translate-y-2 group-hover:scale-110 sm:h-20 sm:w-20 lg:h-24 lg:w-24`}
          >
            <FaceImg face={f} size={96} priority={priority} />
          </div>
          <span className={`text-xs font-semibold tabular-nums ${yearClass}`}>{f}</span>
        </li>
      ))}
    </ol>
  )
}
