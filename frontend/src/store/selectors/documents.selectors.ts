import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { BoundingBox } from '../../utils/boundingBox';

const localDocument = (state: RootState) => state.documents.document;
export const selectDocument = createSelector([localDocument], (document) =>
  document
    ? {
        ...document,
        items: document.items.map((item) => new BoundingBox(item)),
      }
    : null,
);
