import * as React from 'react';
import { Document, Item } from '../../models/Document';
import { MimeType } from '../../utils/mimeType';

export const DocumentViewer: React.FC<Document> = ({ body, items }) => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const DPI = 96;

  function highlighBoundingBoxes(ctx: CanvasRenderingContext2D, items: Item[]) {
    items.forEach((item) => {
      const {
        boundingBox: { polygon },
      } = item;

      ctx.beginPath();

      for (let i = 0; i < polygon.length; i += 2) {
        const x = polygon[i] * DPI;
        const y = polygon[i + 1] * DPI;
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.closePath();
      ctx.lineWidth = 1;

      ctx.strokeStyle = 'green';
      ctx.stroke();
    });
  }

  React.useEffect(() => {
    console.log('bdy here is ********', body);
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.height = img.height;
      canvas.width = img.width;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      highlighBoundingBoxes(ctx, items);
    };

    const mimeType = MimeType.get(body);
    img.src = `data:${mimeType};base64,${body}`;
  }, [body, items]);

  return (
    <article>
      <div style={{ border: '4px solid green' }}>
        <canvas ref={canvasRef} />
      </div>
    </article>
  );
};
