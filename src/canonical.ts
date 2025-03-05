import { Uule } from "@/proto/uule-proto"

export interface CanonicalUule {
  type: "canonical"
  role?: number
  producer?: number
  canonicalName: string
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
  return `w+${encodeURIComponent(btoa(byteString).replace(/\+/g, "-").replace(/\//g, "_"))}`
}

export function decodeCanonicalUule(base64String: string): CanonicalUule {
  // Convert base64 URI encoded UULE to its byte string
  const byteString = atob(decodeURIComponent(base64String).replace(/-/g, "+").replace(/_/g, "/"))
  // Convert byte string to a protobuf message
  const buffer = new Uint8Array(Array.from(byteString).map((byte) => byte.charCodeAt(0)))
  const message = Uule.decode(buffer)
  const { role, producer, canonicalName } = message
  return { type: "canonical", role, producer, canonicalName }
}
