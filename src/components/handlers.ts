export class EFKW extends Error {
  constructor(msg: string) {
    super(`[fkw-menu]: ${msg}`);
  }
}