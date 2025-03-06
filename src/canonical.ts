import { fromUriSafeBase64, toUriSafeBase64 } from "@/uriSafeBase64"
import type { ErrorResult } from "@/index"
import { Uule } from "@/proto/uule-proto"

export interface CanonicalUule {
  type: "canonical"
  canonicalName: string
  role?: number
  producer?: number
}

export function encodeCanonicalUule({
  canonicalName,
  role = 2,
  producer = 32,
}: CanonicalUule): string {
  // Create a message conforming to the UULE protobuf schema
  const message = Uule.create({ role, producer, canonicalName })
  const buffer = Uule.encode(message).finish()
  const byteString = Array.from(buffer)
    .map((byte) => String.fromCharCode(byte))
    .join("")
  // Encode the message as a URI encoded base64 string
  return toUriSafeBase64(byteString)
}

export function decodeCanonicalUule(base64String: string): CanonicalUule | ErrorResult {
  // Convert base64 URI encoded UULE to its byte string
  const byteString = fromUriSafeBase64(base64String)
  // Convert byte string to a protobuf message
  const buffer = new Uint8Array(Array.from(byteString).map((byte) => byte.charCodeAt(0)))
  try {
    const message = Uule.decode(buffer)
    const { role, producer, canonicalName } = message
    return { type: "canonical", role, producer, canonicalName }
  } catch (error) {
    if (error instanceof Error) {
      return {
        type: "error",
        message: `Unable to decode canonical UULE message: "${error.message}"`,
      }
    } else {
      throw error
    }
  }
}
