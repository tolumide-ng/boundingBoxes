import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store/store';
import { fetchDocument } from '../store/slices/documents.slice';
import { DocumentViewer } from '../components/DocumentViewer/DocumentViewer';
import { selectDocument } from '../store/selectors/documents.selectors';

export const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const document = useSelector(selectDocument);

  React.useEffect(() => {
    dispatch(fetchDocument());
  }, [dispatch]);

  return (
    <div className="instructions-page">
      {!!document && <DocumentViewer {...document} />}
    </div>
  );
};
