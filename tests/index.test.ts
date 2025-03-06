import { decodeUule, encodeUule } from "@/index"

describe("UULE Converter", () => {
  describe("decodeUule", () => {
    it("should decode canonical UULE correctly", () => {
      const uule = "w+CAIQICImV2VzdCBOZXcgWW9yayxOZXcgSmVyc2V5LFVuaXRlZCBTdGF0ZXM="
      const decoded = decodeUule(uule)

      expect(decoded.type).toBe("canonical")
      if (decoded.type === "canonical") {
        expect(decoded.canonicalName).toBe("West New York,New Jersey,United States")
        expect(decoded.role).toBe(2)
        expect(decoded.producer).toBe(32)
      }
    })

    it("should decode coordinate UULE correctly", () => {
      const uule =
        "a+cm9sZToxCnByb2R1Y2VyOjEyCnByb3ZlbmFuY2U6Ngp0aW1lc3RhbXA6MTU5MTUyMTI0OTAzNDAwMApsYXRsbmd7CmxhdGl0dWRlX2U3OjI5OTc3NTY3OApsb25naXR1ZGVfZTc6MzExMjk5OTI0Cn0KcmFkaXVzOjkzMDAw"
      const decoded = decodeUule(uule)

      expect(decoded.type).toBe("coordinate")
      if (decoded.type === "coordinate") {
        expect(decoded.latitude).toBeCloseTo(29.9775678, 7)
        expect(decoded.longitude).toBeCloseTo(31.1299924, 7)
        expect(decoded.role).toBe(1)
        expect(decoded.producer).toBe(12)
        expect(decoded.provenance).toBe(6)
        expect(decoded.timestamp).toBe(1591521249034)
        expect(decoded.radius).toBe(93000)
      }
    })

    it("should decode uri encoded canonical UULE correctly", () => {
      const uule = "w%20CAIQICImV2VzdCBOZXcgWW9yayxOZXcgSmVyc2V5LFVuaXRlZCBTdGF0ZXM%3D"
      const decoded = decodeUule(uule)

      expect(decoded.type).toBe("canonical")
      if (decoded.type === "canonical") {
        expect(decoded.canonicalName).toBe("West New York,New Jersey,United States")
        expect(decoded.role).toBe(2)
        expect(decoded.producer).toBe(32)
      }
    })

    it("should return error for invalid UULE string", () => {
      const decoded = decodeUule("invalid")
      expect(decoded.type).toBe("error")
    })

    it("should return error for unsupported format", () => {
      const decoded = decodeUule("x+abc123")
      expect(decoded.type).toBe("error")
    })
    it("should return error for incorrectly structured canonical UULE", () => {
      const decoded = decodeUule("w+abc123")
      expect(decoded.type).toBe("error")
    })
    it("should return error for incorrectly structured coordinate UULE", () => {
      const decoded = decodeUule("a+abc123")
      expect(decoded.type).toBe("error")
    })
  })

  describe("encodeUule", () => {
    it("should encode canonical UULE correctly", () => {
      const canonicalUuleData = {
        type: "canonical",
        canonicalName: "West New York,New Jersey,United States",
        role: 2,
        producer: 32,
      } as const

      const encoded = encodeUule(canonicalUuleData)
      expect(encoded).toBe("w+CAIQICImV2VzdCBOZXcgWW9yayxOZXcgSmVyc2V5LFVuaXRlZCBTdGF0ZXM=")
    })

    it("should encode coordinate UULE correctly", () => {
      const coordinateUuleData = {
        type: "coordinate",
        latitude: 29.9775678,
        longitude: 31.1299924,
        role: 1,
        producer: 12,
        provenance: 6,
        timestamp: 1591521249034,
        radius: 93000,
      } as const

      const encoded = encodeUule(coordinateUuleData)
      expect(encoded).toBe(
        "a+cm9sZToxCnByb2R1Y2VyOjEyCnByb3ZlbmFuY2U6Ngp0aW1lc3RhbXA6MTU5MTUyMTI0OTAzNDAwMApsYXRsbmd7CmxhdGl0dWRlX2U3OjI5OTc3NTY3OApsb25naXR1ZGVfZTc6MzExMjk5OTI0Cn0KcmFkaXVzOjkzMDAw",
      )
    })
  })

  describe("Round-trip encoding and decoding", () => {
    it("should correctly round-trip a canonical UULE", () => {
      const original = {
        type: "canonical",
        canonicalName: "West New York,New Jersey,United States",
        role: 2,
        producer: 32,
      } as const

      // Encode with specific module then decode with main module
      const encoded = encodeUule(original)
      const decoded = decodeUule(encoded)

      expect(decoded).toEqual(original)
    })

    it("should correctly round-trip a coordinate UULE", () => {
      const original = {
        type: "coordinate",
        latitude: 29.9775678,
        longitude: 31.1299924,
        role: 1,
        producer: 12,
        provenance: 6,
        timestamp: 1591521249034,
        radius: 93000,
      } as const

      // Encode with specific module then decode with main module
      const encoded = encodeUule(original)
      const decoded = decodeUule(encoded)

      expect(decoded).toEqual(original)
    })
  })
})
