import { readFileSync } from "node:fs"
import { join } from "node:path"
import { ImageResponse } from "next/og"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

export default function AppleIcon() {
  const logo = readFileSync(
    join(process.cwd(), "src/app/android-chrome-192x192.png")
  ).toString("base64")

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F6F5F3",
        }}
      >
        <img
          src={`data:image/png;base64,${logo}`}
          width={132}
          height={132}
          alt=""
        />
      </div>
    ),
    size
  )
}
