// Function to download the current web page as a PDF
async function downloadAsPdf() {
  const options = {
    margin:0,
    filename: `${language}_${BASE.name}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' }
  };

  // Get the page content
  const content = document.querySelector('#main_box').cloneNode(true);
  
  content.querySelectorAll('img').forEach(image => image.crossorigin = "anonymous" );
  content.querySelectorAll('img').forEach(image => image.src = "" );//for local file test ing

  content.querySelector('#topleft').style = "visibility:hidden";
  content.querySelector('#info_box').style.padding = "0 5em 1.5em";
  content.style.width = "100%";   // Ensure it uses the full width of the PDF page.

  // Generate the PDF
  html2pdf().set(options).from(content).outputPdf('datauristring')
    .then(function (pdfDataUri) {
      // Create a temporary <a> element and initiate the download
      const a = document.createElement('a');
      a.href = pdfDataUri;
      a.download = options.filename;
      a.click();
    })
    .catch(function (error) {
      console.error('Error generating PDF:', error);
    });
}

// Add a download button or trigger the download on page load
document.addEventListener('DOMContentLoaded', function () {
  const downloadButton = document.getElementById('downloadable_resume');
  downloadButton.addEventListener('click', downloadAsPdf);
});
