# PDF & Image Merge Service

A Python backend service to merge multiple PDFs and images into a single, correctly ordered PDF. This service is designed to streamline workflows like invoicing, document processing, and reporting.

## Features
- Accepts multiple PDFs and image files (JPG, PNG, etc.)
- Converts images into PDF pages automatically
- Merges files in any specified order
- Optional watermarking support
- Validation and error handling for reliable processing
- Developer-friendly API ready for integration

## Tech Stack
- Python 3.x
- FastAPI (for backend API)
- pypdf (for PDF manipulation)
- Pillow (for image processing)
- Docker (optional, for deployment)

## Demo
A quick backend demo snippet is available in the `demo` folder showing a PDF merge. This is just a small snippet of the full workflow.

## Usage

1. **Clone the repository**
```bash
git clone https://github.com/toceentec/pdf-merge-service.git
cd pdf-merge-service

Install dependencies

pip install -r requirements.txt

Run the service

uvicorn main:app --reload

API Endpoint

POST /merge

Accepts multiple PDFs and images

Returns a merged PDF in the requested order

Example
curl -X POST "http://127.0.0.1:8000/merge" -F "files=@invoice1.pdf" -F "files=@image1.png"
Repository Structure
pdf-merge-service/
│
├─ main.py           # Core API and merge logic
├─ requirements.txt  # Python dependencies
├─ demo/             # Demo video snippet of backend merge
├─ README.md         # Project description (this file)
└─ ...               # Additional files (optional)
License

MIT License
