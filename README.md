# Blob Image to PDF Export Script

## Overview

This script scans a webpage (for example, a Google Drive preview page),
collects all visible blob-based images, and combines them into a single
downloadable PDF using jsPDF.

It is useful when content is rendered as images instead of providing a
direct download option.

------------------------------------------------------------------------

## What This Script Does

-   Detects img elements whose source starts with "blob:"
-   Converts each image into a canvas snapshot
-   Inserts each image as a separate page in a PDF
-   Preserves the original resolution and orientation
-   Automatically downloads the generated PDF

------------------------------------------------------------------------

## Requirements

You need:

-   A modern browser (Chrome, Edge, or Firefox recommended)
-   The webpage must render the content as img elements
-   Internet connection (to load the jsPDF library from CDN)

No installation, extensions, or backend setup required.

------------------------------------------------------------------------

## How to Use

### Method 1: Run from Browser Console (Recommended)

1.  Open the page you want to export.
2.  Wait until all images are fully loaded.
3.  Press F12 to open Developer Tools.
4.  Go to the Console tab.
5.  Paste the script.
6.  Press Enter.

The script will: - Scan the page - Generate the PDF - Automatically
download the file

------------------------------------------------------------------------

## How the Script Works

1.  Dynamically loads the jsPDF library from a CDN.
2.  Scans all img elements in the document.
3.  Filters only blob-based image sources.
4.  Converts each image to a canvas.
5.  Extracts image data using toDataURL().
6.  Creates a PDF with matching page dimensions.
7.  Adds each image as a separate page.
8.  Saves and downloads the generated PDF.

------------------------------------------------------------------------

## Limitations

The script may not work in the following cases:

-   Images are cross-origin without CORS permission (canvas becomes
    tainted)
-   Content is inside a cross-origin iframe
-   The site renders pages using WebGL or canvas only (no img elements)
-   Strict Content Security Policy blocks external scripts

------------------------------------------------------------------------

## Quality Considerations

The PDF quality depends on the resolution of the images already loaded
on the page.

To improve quality: - Use PNG instead of JPEG in the script - Ensure the
page loads full-resolution images - If the source is an actual PDF,
downloading the original file will provide better quality than image
capture

------------------------------------------------------------------------

## Customization Options

You can modify:

-   ONLY_DRIVE_BLOBS: Set to false to allow all blob images
-   MARGIN: Add page margins in pixels
-   MIME type: Change between image/jpeg and image/png
-   Quality setting for JPEG compression

------------------------------------------------------------------------

## Disclaimer

This script works only within the same-origin security policy of the
browser. It does not bypass website security or download protected
content beyond what is already rendered in the page.
