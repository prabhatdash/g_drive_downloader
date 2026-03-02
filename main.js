(function () {
  console.log("Loading script ...");

  const ONLY_DRIVE_BLOBS = true;
  const MARGIN = 0;

  let script = document.createElement("script");
  script.onload = function () {
    const { jsPDF } = window.jspdf;

    let pdf = null;
    let imgElements = document.getElementsByTagName("img");
    let validImgs = [];

    console.log("Scanning content ...");

    for (let i = 0; i < imgElements.length; i++) {
      const img = imgElements[i];
      const src = img.currentSrc || img.src || "";

      if (!img.complete || img.naturalWidth === 0 || img.naturalHeight === 0) continue;
      if (!src.startsWith("blob:")) continue;

      if (ONLY_DRIVE_BLOBS) {
        const driveBlobPrefix = "blob:https://drive.google.com/";
        if (!src.startsWith(driveBlobPrefix)) continue;
      }

      validImgs.push(img);
    }

    console.log(`${validImgs.length} content found!`);
    if (!validImgs.length) {
      console.log("No matching blob images found.");
      document.body.removeChild(script);
      return;
    }

    console.log("Generating PDF file ...");

    for (let i = 0; i < validImgs.length; i++) {
      const img = validImgs[i];

      const canvasElement = document.createElement("canvas");
      const con = canvasElement.getContext("2d", { willReadFrequently: true });

      canvasElement.width = img.naturalWidth;
      canvasElement.height = img.naturalHeight;

      con.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);

      const mime = "image/jpeg";
      const quality = 0.92;
      const imgData = canvasElement.toDataURL(mime, quality);

      const orientation = img.naturalWidth > img.naturalHeight ? "l" : "p";
      const pageWidth = img.naturalWidth;
      const pageHeight = img.naturalHeight;

      if (i === 0) {
        pdf = new jsPDF({
          orientation,
          unit: "px",
          format: [pageWidth, pageHeight],
        });
      } else {
        pdf.addPage([pageWidth, pageHeight], orientation);
      }

      const drawW = pageWidth - 2 * MARGIN;
      const drawH = pageHeight - 2 * MARGIN;

      pdf.addImage(imgData, "JPEG", MARGIN, MARGIN, drawW, drawH, "", "SLOW");

      const pct = Math.floor(((i + 1) / validImgs.length) * 100);
      console.log(`Processing content ${pct}%`);
    }

    let title =
      document.querySelector('meta[itemprop="name"]')?.content ||
      document.title ||
      "download.pdf";

    if ((title.split(".").pop() || "").toLowerCase() !== "pdf") {
      title = title + ".pdf";
    }

    console.log("Downloading PDF file ...");
    pdf.save(title, { returnPromise: true }).then(() => {
      document.body.removeChild(script);
      console.log("PDF downloaded!");
    });
  };

  const scriptURL = "https://unpkg.com/jspdf@latest/dist/jspdf.umd.min.js";
  let trustedURL;

  if (window.trustedTypes && trustedTypes.createPolicy) {
    const policy = trustedTypes.createPolicy("myPolicy", {
      createScriptURL: (input) => input,
    });
    trustedURL = policy.createScriptURL(scriptURL);
  } else {
    trustedURL = scriptURL;
  }

  script.src = trustedURL;
  document.body.appendChild(script);
})();
