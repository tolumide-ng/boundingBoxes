import * as React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchDocument } from '../store/slices/documents.slice';
import { DocumentViewer } from '../components/DocumentViewer/DocumentViewer';

export const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const document = useSelector((state: RootState) => state.documents.document);

  React.useEffect(() => {
    dispatch(fetchDocument());
  }, [dispatch]);


  
  return (
    <div className="instructions-page">{
      !!document &&
      <DocumentViewer {...document}  />}
    </div>
  )
}