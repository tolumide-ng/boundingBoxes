import * as React from 'react';
import { Document } from '../../models/Document';
import { MimeType } from '../../utils/mimeType';
import { BoundingBox } from '../../utils/boundingBox';
import { isPointInPolygon } from '../../utils/poingInPolygon';
import { columnTitle } from '../../utils/columnTitle';

export const DocumentViewer: React.FC<Document> = ({ body, items }) => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const [selectedItems, setSelectedItems] = React.useState<BoundingBox[]>([]);
  const DPI = 96;

  const highlighBoundingBoxes = React.useCallback(
    (ctx: CanvasRenderingContext2D) => {
      selectedItems.forEach((item, index) => {
        const {
          boundingBox: { polygon },
          origin,
        } = item;

        ctx.beginPath();

        let columnLength = 0;

        for (let i = 0; i < polygon.length; i += 2) {
          const x = polygon[i] * DPI;
          const y = polygon[i + 1] * DPI;
          if (i === 0) {
            columnLength = x;
            ctx.moveTo(x, y);
          } else {
            if (i === 2) {
              columnLength = x - columnLength;
            }
            ctx.lineTo(x, y);
          }
        }

        ctx.closePath();
        ctx.lineWidth = 1;

        ctx.strokeStyle = 'green';
        ctx.stroke();

        const labelX = polygon[0] * DPI;
        const labelY = polygon[1] * DPI - (index % 2 == 0 ? 20 : 42);
        ctx.fillStyle = 'black';
        const title = columnTitle[origin] || 'Unknown';

        const titleLength = title.match(/[a-zA-Z\d ]/g)?.length ?? 5;
        ctx.fillRect(labelX, labelY, 10 * (titleLength / 1.6), 20);

        ctx.fillStyle = 'white';
        ctx.font = '10px Arial';
        ctx.fillText(title, labelX + 4, labelY + 13);
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

      setSelectedItems((prev) => {
        if (!clickedBox.in(prev)) return [...prev, clickedBox];

        if (clickedBox.in(prev) && clickedBox.origin === 'countryOfOrigin') {
          return prev.filter((item) => item.itemId !== clickedBox.itemId);
        }

        const unHighlightedSiblings = items.filter(
          (box) =>
            !box.in(prev) &&
            box.itemId === clickedBox.itemId &&
            box.origin !== 'countryOfOrigin',
        );

        // If the row is already highlighted, then remove the highlight
        // or it is the duplicate countryOfOrigin itemId
        if (
          unHighlightedSiblings.length === 0 ||
          clickedBox.origin === 'countryOfOrigin'
        ) {
          return prev.filter((item) => item.itemId !== clickedBox.itemId);
        }

        // Highlight the siblings too
        return [...prev, ...unHighlightedSiblings];
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
