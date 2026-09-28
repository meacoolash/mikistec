let ctx: AudioContext | null = null

export function getAudioCtx(): AudioContext | null {
  if (typeof window === "undefined") return null
  if (!ctx) {
    ctx = new AudioContext()
    try {
      const buf = ctx.createBuffer(1, 1, 22050)
      const src = ctx.createBufferSource()
      src.buffer = buf
      src.connect(ctx.destination)
      src.start(0)
    } catch {
      // ignore
    }
  }
  if (ctx.state === "suspended") {
    ctx.resume()
  }
  return ctx
}
