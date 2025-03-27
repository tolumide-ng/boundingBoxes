import { Item } from '../models/Document';

export class BoundingBox implements Item {
  boundingBox: {
    polygon: number[];
    pageNumber: number;
  };
  offset: number;
  pageNumber: number;
  documentId: string;
  itemId: string;
  origin: string;

  constructor(item: Item) {
    this.boundingBox = { ...item.boundingBox };
    this.offset = item.offset;
    this.pageNumber = item.pageNumber;
    this.documentId = item.documentId;
    this.itemId = item.itemId;
    this.origin = item.origin;
  }

  equals(other: Item | BoundingBox): boolean {
    return (
      this.documentId === other.documentId &&
      this.itemId === other.itemId &&
      this.offset === other.offset &&
      this.pageNumber === other.pageNumber &&
      this.origin === other.origin &&
      this.boundingBox.pageNumber === other.boundingBox.pageNumber &&
      this.boundingBox.polygon.length === other.boundingBox.polygon.length &&
      this.boundingBox.polygon.every(
        (val, i) => val === other.boundingBox.polygon[i],
      )
    );
  }

  in(source: Array<Item | BoundingBox>) {
    return source.some((item) => this.equals(item));
  }
}
