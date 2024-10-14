/** @returns ID */
export function createID(): string {
  return (Math.random() + 1).toString(36).substring(8);
}

export class EFKW extends Error {
  constructor(msg: string) {
    super(`[fkw-menu]: ${msg}`);
  }
}