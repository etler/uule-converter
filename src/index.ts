import { type CanonicalUule, decodeCanonicalUule, encodeCanonicalUule } from "@/canonical"
import { type CoordinateUule, decodeCoordinateUule, encodeCoordinateUule } from "@/coordinate"

export function decodeUule(uuleString: string): CanonicalUule | CoordinateUule {
  const [encoding, data] = uuleString.split("+")
  if (encoding === undefined || data === undefined) {
    throw new Error("Invalid UULE string")
  }
  switch (encoding) {
    case "w":
      return decodeCanonicalUule(data)
    case "a":
      return decodeCoordinateUule(data)
    default:
      throw new Error(`Unsuported UULE encoding "${encoding}"`)
  }
}

export function encodeUule(data: CanonicalUule | CoordinateUule): string {
  switch (data.type) {
    case "canonical":
      return encodeCanonicalUule(data)
    case "coordinate":
      return encodeCoordinateUule(data)
  }
}
