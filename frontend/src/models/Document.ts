
export interface IBoundingBox {
    top: number;
    left: number;
    width: number;
    height: number;
    origin: string;
}

export interface IItem {
    content: string;
    boundingBox: IBoundingBox;
}

export interface IDocument {
  id: string;
  name: string;
  items: IItem[];
  binaryData: string;
}

export default IDocument;



export interface Item {
  boundingBox: {
    polygon: number[];
    pageNumber: number;
  };
  offset: number;
  pageNumber: number;
  documentId: string;
  itemId: string;
  origin: string;
}

export type Document = {
  items: Item[];
  documentId: string;
  body: string;
};
