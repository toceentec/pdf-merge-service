const express = require('express');
const multer = require('multer');
const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const sharp = require('sharp');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/merge', upload.array('files'), async (req, res) => {
  try {
    const mergedPdf = await PDFDocument.create();

    for (const file of req.files) {
      const fileType = file.mimetype;

      if (fileType === 'application/pdf') {
        const pdfBytes = fs.readFileSync(file.path);
        const pdf = await PDFDocument.load(pdfBytes);
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        pages.forEach(page => mergedPdf.addPage(page));
      }

      if (fileType.startsWith('image/')) {
        const imageBuffer = fs.readFileSync(file.path);
        const image = await mergedPdf.embedJpg(
          await sharp(imageBuffer).jpeg().toBuffer()
        );
        const page = mergedPdf.addPage([image.width, image.height]);
        page.drawImage(image, {
          x: 0,
          y: 0,
          width: image.width,
          height: image.height,
        });
      }

      fs.unlinkSync(file.path);
    }

    const mergedBytes = await mergedPdf.save();
    res.setHeader('Content-Type', 'application/pdf');
    res.send(Buffer.from(mergedBytes));

  } catch (err) {
    console.error(err);
    res.status(500).send('Error merging files');
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));