import { readFileSync } from "node:fs"
import { join } from "node:path"
import { ImageResponse } from "next/og"

const size = { width: 512, height: 512 }

export function GET() {
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
          width={376}
          height={376}
          alt=""
        />
      </div>
    ),
    size
  )
}
