import { type CanonicalUule, decodeCanonicalUule, encodeCanonicalUule } from "@/canonical"
import { type CoordinateUule, decodeCoordinateUule, encodeCoordinateUule } from "@/coordinate"

export type { CanonicalUule } from "@/canonical"
export type { CoordinateUule } from "@/coordinate"
export interface ErrorResult {
  type: "error"
  message: string
}

export function decodeUule(uuleString: string): CanonicalUule | CoordinateUule | ErrorResult {
  const [format, data] = decodeURIComponent(uuleString).split(/\+| /)
  if (format === undefined || data === undefined) {
    return {
      type: "error",
      message: "Invalid UULE string",
    }
  }
  switch (format) {
    case "w":
      return decodeCanonicalUule(data)
    case "a":
      return decodeCoordinateUule(data)
    default:
      return {
        type: "error",
        message: `Unsuported UULE format "${format}"`,
      }
  }
}

export function encodeUule(data: CanonicalUule | CoordinateUule): string {
  switch (data.type) {
    case "canonical":
      return `w+${encodeCanonicalUule(data)}`
    case "coordinate":
      return `a+${encodeCoordinateUule(data)}`
  }
}
