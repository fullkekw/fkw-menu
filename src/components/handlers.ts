/** @returns ID */
export function createID(): string {
  return (Math.random() + 1).toString(36).substring(8);
}