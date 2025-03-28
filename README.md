# Document Viewer Technical Assessment

Thank you for participating in our technical assessment! This exercise will evaluate your ability to create an interactive document viewer.

## Getting Started

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run start
```

The backend application will run at `http://localhost:8080` (please ensure port 8080 is free before running the backend)
The frontend application will run at `http://localhost:5173`(please ensure port 5173 is free before running the frontend)

## Assessment Requirements

### Main Requirements

- Render a documents table in a new page
- Load document from the backend when page opens (endpoint is already set but is currently not being called anywhere in the frontend)
- Store response in Redux store
- Create a bounding box and document viewer
- render the image base64 data in to a docment viewer and add bounding boxes of the items included in the response

### Interaction Requirements

- Clicking an item in the table should highlight or show selected the corresponding bounding box in the document viewer
- Clicking a bounding box should highlight the corresponding row in the table
- Implement a toggle option on the table row to show either all bounding boxes or just one
- The bounding boxes should hold their size when the page is resized
- the bounding boxes should show the title of the attribute they correlate to
- take in to consideration that the bounding boxes unit of measure is in inches you can use the azure ocr documentation for further reference

## Questions?

If you have any questions or run into technical issues, please reach out to us

Good luck with your assessment!
