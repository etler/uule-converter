# UULE Converter

**UULEs** are a Google format convention for encoding geolocation data. There are currently two known formats that this library accurately supports.

## Canonical Place Name
This format begins with a `w+` prefix and contains a protobuf message with the UULE data encoded within it.

## Coordinate Location
This format begins with a `a+` prefix and contains an ASCII message with an object like structure.
