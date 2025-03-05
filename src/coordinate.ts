export interface CoordinateUule {
  type: "coordinate"
  latitude: number
  longitude: number
  role?: number
  producer?: number
  provenance?: number
  timestamp?: number
  radius?: number
}

export function encodeCoordinateUule({
  latitude,
  longitude,
  role = 1,
  producer = 12,
  provenance = 0,
  timestamp = Date.now() * 1e3,
  radius = -1,
}: CoordinateUule): string {
  const uuleCoordinateString = `
role:${role}
producer:${producer}
provenance:${provenance}
timestamp:${timestamp}
latlng{
latitude_e7:${Math.floor(latitude * 1e7)}
longitude_e7:${Math.floor(longitude * 1e7)}
}
radius:${radius}
`.trim()
  console.log(uuleCoordinateString)
  const base64Uule = btoa(uuleCoordinateString).replace(/\+/g, "-").replace(/\//g, "_")
  return `a+${encodeURIComponent(base64Uule)}`
}

export function decodeCoordinateUule(uuleString: string): CoordinateUule {
  const normalizedUuleString = decodeURIComponent(uuleString).replace(/-/g, "+").replace(/_/g, "/")
  const decodedUule = atob(normalizedUuleString)
  const {
    latitude_e7: latitudeE7,
    longitude_e7: longitudeE7,
    producer,
    provenance,
    radius,
    role,
    timestamp,
  } = Object.fromEntries(
    decodedUule.split("\n").flatMap((entry): [string, number][] => {
      const [key, stringValue] = entry.split(":")
      const value = stringValue !== undefined ? parseInt(stringValue, 10) : undefined
      return key !== undefined && typeof value === "number" ? [[key, value]] : []
    }),
  )
  if (latitudeE7 === undefined || longitudeE7 === undefined) {
    throw new Error("Unable to parse coordinate UULE latitude and longitude")
  }
  return {
    type: "coordinate",
    role,
    producer,
    provenance,
    timestamp,
    latitude: latitudeE7 / 1e7,
    longitude: longitudeE7 / 1e7,
    radius,
  }
}
