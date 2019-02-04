export function injectSizeToAvatarURL(URL: string, sizeInPixels: number) {
  return `${URL}&s=${sizeInPixels}`;
}
