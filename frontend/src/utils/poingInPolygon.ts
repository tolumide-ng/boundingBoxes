// https://wrfranklin.org/Research/Short_Notes/pnpoly.html
// https://stackoverflow.com/a/29915728/9347459
/**
 *
 * @param x the correspoding x axis of the click point
 * @param y the correspoding y axis of the click point
 * @param polygon the dimensions
 * @returns whether the click point is within the provided polygon
 */
export function isPointInPolygon(
  x: number,
  y: number,
  polygon: number[],
): boolean {
  let inside = false;
  for (let i = 0, j = polygon.length - 2; i < polygon.length; j = i, i += 2) {
    const xi = polygon[i];
    const yi = polygon[i + 1];
    const xj = polygon[j];
    const yj = polygon[j + 1];

    const intersect =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;

    if (intersect) inside = !inside;
  }
  return inside;
}
