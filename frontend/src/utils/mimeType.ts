export class MimeType {
  static readonly #signatures = {
    '/9j/': 'image/jpeg',
    iVBORw0KGgo: 'image/png',
    R0lGOD: 'image/gif',
    UklGR: 'image/webp',
  };

  static get(base64: string) {
    console.log('the received arg is', base64);
    const mimeType = Object.keys(this.#signatures).find((magicNumber) =>
      base64.startsWith(magicNumber),
    );

    return mimeType ?? 'image/png';
  }
}
