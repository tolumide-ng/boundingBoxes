import * as React from 'react'
import { Document } from "../../models/Document"
import { MimeType } from '../../utils/mimeType'


export const DocumentViewer: React.FC<Document> = ({ body, items, documentId }) => {
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null)


    React.useEffect(() => {

        console.log("bdy here is ********", body)
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d')
        if(!ctx) return

        const img = new Image()
        img.onload = () => {
            canvas.height = img.height;
            canvas.width = img.width;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
        }

        const mimeType = MimeType.get(body);
        img.src = `data:${mimeType};base64,${body}`;
    }, [body])


    return (
        <article>
            <div style={{ border: "4px solid green" }}>
                <canvas ref={canvasRef} />
            </div>
        </article>
    )
}