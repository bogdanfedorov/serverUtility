import crypto from "node:crypto";
import { BasePayload, DefaultHeader, SignatureSecret } from "./jwt.config";

export class JWT {
  public jwtB64Header: string;
  public jwtB64Payload: string;
  public signature: string;

  constructor(payload: object, header: object = DefaultHeader) {
    const b64Header = this.toBase64(header);
    this.jwtB64Header = this.replaceSpecialChars(b64Header);

    const b64Payload = this.toBase64({ ...BasePayload, ...payload });
    this.jwtB64Payload = this.replaceSpecialChars(b64Payload);

    this.signature = this.createSignature(
      this.jwtB64Header,
      this.jwtB64Payload,
    );
  }

  public static create(payload: object) {
    const jwt = new JWT(payload);

    return jwt.toString();
  }

  public toString() {
    return this.jwtB64Header + "." + this.jwtB64Payload + "." + this.signature;
  }

  private toBase64(obj: object): string {
    const str = JSON.stringify(obj);
    return Buffer.from(str).toString("base64");
  }

  private replaceSpecialChars(b64string: string): string {
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

  private createSignature(jwtB64Header: string, jwtB64Payload: string) {
    let signature = crypto.createHmac("sha256", SignatureSecret);
    signature.update(jwtB64Header + "." + jwtB64Payload);
    return this.replaceSpecialChars(signature.digest("base64"));
  }
}
