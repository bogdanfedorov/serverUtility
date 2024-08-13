import crypto from "node:crypto";
import { BasePayload, DefaultHeader, SignatureSecret } from "./jwt.config.js";

export class JWT {
  jwtB64Header;
  jwtB64Payload;
  signature;

  /**
   * @constructor
   * @param {object} payload
   * @param {object} header
   */
  constructor(payload, header = DefaultHeader) {
    const b64Header = this.#toBase64(header);
    this.jwtB64Header = this.#replaceSpecialChars(b64Header);

    const b64Payload = this.#toBase64({ ...BasePayload, ...payload });
    this.jwtB64Payload = this.#replaceSpecialChars(b64Payload);

    this.signature = this.#createSignature(
      this.jwtB64Header,
      this.jwtB64Payload,
    );
  }

  /**
   * @param {object} payload
   * @returns {string} jwt sting
   */
  static create(payload) {
    const jwt = new JWT(payload);

    return jwt.toString();
  }

  static parce(jwtString) {
    const [header, payload] = jwtString.split(".");

    const toObject = (string64) =>
      JSON.parse(Buffer.from(string64, "base64").toString("ascii"));

    return {
      header: toObject(header),
      payload: toObject(payload),
    };
  }

  /**
   * @returns {string}
   * @returns {string} jwt string
   */
  toString() {
    return this.jwtB64Header + "." + this.jwtB64Payload + "." + this.signature;
  }

  /**
   * @param {object} obj
   * @returns {string}
   */
  #toBase64(obj) {
    const str = JSON.stringify(obj);
    return Buffer.from(str).toString("base64");
  }

  /**
   * @param {string} b64string
   * @returns {string}
   */
  #replaceSpecialChars(b64string) {
    return b64string.replace(/[=+/]/g, (charToBeReplaced) => {
      switch (charToBeReplaced) {
        case "=":
          return "";
        case "+":
          return "-";
        case "/":
          return "_";
        default:
          return "";
      }
    });
  }

  /**
   * @param {string} jwtB64Header
   * @param {string} jwtB64Payload
   * @returns {string} signature
   */
  #createSignature(jwtB64Header, jwtB64Payload) {
    let signature = crypto.createHmac("sha256", SignatureSecret);
    signature.update(jwtB64Header + "." + jwtB64Payload);
    return this.#replaceSpecialChars(signature.digest("base64"));
  }
}
