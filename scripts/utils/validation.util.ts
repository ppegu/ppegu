export default class Validation {
  static validatePort(input: string) {
    if (Number.isNaN(Number(input))) return "Invalid port.";
    /**port must be atleast 2 length */
    if (input.length < 2) return "Invalid port";
    return true;
  }

  static notNull(input: string) {
    if (!input) return "Invalid input";
    return true;
  }
}
