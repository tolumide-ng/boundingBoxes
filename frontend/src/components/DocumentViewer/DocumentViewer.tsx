import * as React from 'react';
import styles from './DocumentViewer.module.css';
import { Document } from '../../models/Document';
import { useDocumentViewer } from './useDocumentViewer';

export const DocumentViewer: React.FC<Document> = (props) => {
  const { buttonText, handleButtonClick, canvasRef } = useDocumentViewer(props);
  return (
    <article className={styles.canvasWrapper}>
      <button className="" onClick={handleButtonClick}>
        {buttonText}
      </button>
      <div>
        <canvas ref={canvasRef} />
      </div>
    </article>
  );
};
