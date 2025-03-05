import * as $protobuf from "protobufjs";
import Long = require("long");
/** Properties of an Uule. */
export interface IUule {

    /** Uule role */
    role?: (number|null);

    /** Uule producer */
    producer?: (number|null);

    /** Uule canonicalName */
    canonicalName?: (string|null);
}

/** Represents an Uule. */
export class Uule implements IUule {

    /**
     * Constructs a new Uule.
     * @param [properties] Properties to set
     */
    constructor(properties?: IUule);

    /** Uule role. */
    public role: number;

    /** Uule producer. */
    public producer: number;

    /** Uule canonicalName. */
    public canonicalName: string;

    /**
     * Creates a new Uule instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Uule instance
     */
    public static create(properties?: IUule): Uule;

    /**
     * Encodes the specified Uule message. Does not implicitly {@link Uule.verify|verify} messages.
     * @param message Uule message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IUule, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Uule message, length delimited. Does not implicitly {@link Uule.verify|verify} messages.
     * @param message Uule message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IUule, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an Uule message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Uule
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Uule;

    /**
     * Decodes an Uule message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Uule
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Uule;

    /**
     * Verifies an Uule message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an Uule message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Uule
     */
    public static fromObject(object: { [k: string]: any }): Uule;

    /**
     * Creates a plain object from an Uule message. Also converts values to other types if specified.
     * @param message Uule
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Uule, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Uule to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for Uule
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}
