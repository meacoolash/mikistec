import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Miki Stec | You're good. Your website should be too.",
    short_name: "Miki Stec",
    description:
      "I research your business, write it, build it, and launch it. You just say yes.",
    start_url: "/",
    display: "standalone",
    background_color: "#F6F5F3",
    theme_color: "#2E58E0",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
