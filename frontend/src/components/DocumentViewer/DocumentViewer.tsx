import * as React from 'react';
import { Document } from '../../models/Document';
import { MimeType } from '../../utils/mimeType';
import { BoundingBox } from '../../utils/boundingBox';
import { isPointInPolygon } from '../../utils/poingInPolygon';

export const DocumentViewer: React.FC<Document> = ({ body, items }) => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const [selectedItems, setSelectedItems] = React.useState<BoundingBox[]>([]);
  const DPI = 96;

  const highlighBoundingBoxes = React.useCallback(
    (ctx: CanvasRenderingContext2D) => {
      selectedItems.forEach((item) => {
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
    },
    [selectedItems],
  );

  const handleCanvasClick = React.useCallback(
    (event: MouseEvent) => {
      if (!canvasRef.current) return;

      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();

      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      const x = ((event.clientX - rect.left) * scaleX) / DPI;
      const y = ((event.clientY - rect.top) * scaleY) / DPI;

      const clickedBox = items.find((item) =>
        isPointInPolygon(x, y, item.boundingBox.polygon),
      );

      if (!clickedBox) return;

      console.log('this clickedBox', clickedBox);

      setSelectedItems((prev) => {
        if (!clickedBox.in(prev)) return [...prev, clickedBox];
        return prev.filter((item) => !item.equals(clickedBox));
      });
    },
    [items],
  );

  React.useEffect(() => {
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
      highlighBoundingBoxes(ctx);
    };

    const mimeType = MimeType.get(body);
    img.src = `data:${mimeType};base64,${body}`;
  }, [body, highlighBoundingBoxes, items]);

  React.useEffect(() => {
    if (!canvasRef.current) return;

    canvasRef.current.addEventListener('click', handleCanvasClick);

    return () => {
      canvasRef.current?.removeEventListener('click', handleCanvasClick);
    };
  }, [handleCanvasClick]);

  return (
    <article>
      <div style={{ border: '4px solid green' }}>
        <canvas ref={canvasRef} />
      </div>
    </article>
  );
};
