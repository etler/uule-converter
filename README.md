# UULE Converter

**uule-converter** is a Typescript/JavaScript library for encoding and decoding Google's **UULE** (Universal URL Location Encoding) format used for setting geolocation data in search results. UULE strings are URI safe base64 encoded and URI component encoded with a format prefix in the format of `/[a-z]\+/`. The payload of the base64 component can vary and is determined by the format prefix.

## Installation

```bash
npm install uule-converter
```

```bash
yarn add uule-converter
```

## Usage

### Supported UULE Formats

This library supports the two known UULE formats:

#### Canonical Place Name Format (w+)

This format contains a protobuf message payload with a canonical place name.

```javascript
// Decoding
const canonicalLocation = decodeUule('w+CAIQICIfTG9uZG9uLCBFbmdsYW5kLCBVbml0ZWQgS2luZ2RvbQ%3D%3D');

// Encoding
const canonicalUule = encodeUule({
  type: 'canonical',
  canonicalName: 'London, England, United Kingdom'
});
```

#### Coordinate Location Format (a+)

This format encodes an ASCII text payload with latitude and longitude coordinates.

```javascript
// Decoding
const coordinateLocation = decodeUule('a+cm9sZToxCnByb2R1Y2VyOjEyCnByb3ZlbmFuY2U6MAp0aW1lc3RhbXA6MTc0MTIyMDQyMjA4MjAwMApsYXRsbmd7CmxhdGl0dWRlX2U3OjQwNzEyODAwMApsb25naXR1ZGVfZTc6LTc0MDA2MDAwMAp9CnJhZGl1czotMQ%253D%253D');

// Encoding
const coordinateUule = encodeUule({
  type: 'coordinate',
  latitude: 40.7128,
  longitude: -74.0060
});
```

### Error Handling

Parsing errors due to incorrectly formatted UULE strings are returned as an object with the type "error":

```javascript
const result = decodeUule('invalid_uule_string');
if (result.type === 'error') {
  console.error(result.message);
}
```

## API Reference

### Functions

#### `decodeUule(uuleString: string): CanonicalUule | CoordinateUule | ErrorResult`

Decodes a UULE string and returns the encoded location type and data or returns an error object for improperly formatted UULE strings.

#### `encodeUule(data: CanonicalUule | CoordinateUule): string`

Encodes a location object into a UULE string.

### Types

#### `CanonicalUule`

Canonical place names correspond to [Geo targets from the Google Ads API](https://developers.google.com/google-ads/api/data/geotargets) and must come from an official Google source.

Optional fields are provided for message data completeness and will default to valid values, however it is not currently known if there are additional valid values.

```typescript
interface CanonicalUule {
  type: "canonical"
  canonicalName: string
  role?: number
  producer?: number
}
```

#### `CoordinateUule`

Coordinate values are standard latitude and longitude numbers.

Optional fields are provided for message data completeness and will default to valid values. They do not appear to have any impact on the results returned by Google. `timestamp` defaults to the current timestamp provided by `Date.now()` and will generate a new result on every call. If you need the output to be stable you must provide your own timestamp.

```typescript
interface CoordinateUule {
  type: "coordinate"
  latitude: number
  longitude: number
  role?: number
  producer?: number
  provenance?: number
  timestamp?: number
  radius?: number
}
```

#### `ErrorResult`

Error objects are returned during UULE string decoding for incorrectly formatted UULE strings and include a message describing the issue.

```typescript
interface ErrorResult {
  type: 'error';
  message: string;
}
```

## Acknowledgements

This library relies on the excellent research into UULE formats provided by [Valentin Pletzer](https://valentin.app/uule.html).

## License

MIT
