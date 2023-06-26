// Function to download the current web page as a PDF
async function downloadAsPdf() {
  const options = {
    filename: 'downloaded_page.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'pt', format: 'letter', orientation: 'portrait' }
  };

  // Get the page content
  const content = document.documentElement;

  // Generate the PDF
  html2pdf().set(options).from(content).outputPdf('datauristring')
    .then(function (pdfDataUri) {
      // Create a temporary <a> element and initiate the download
      const a = document.createElement('a');
      a.href = pdfDataUri;
      a.download = options.filename;
      a.click();
      return
    })
    .catch(function (error) {
      console.error('Error generating PDF:', error);
      return
    });
}
// Add a download button or trigger the download on page load
// Replace "downloadButton" with the ID or class of your download button element
document.addEventListener('DOMContentLoaded', function () {
  async function download() {
    document.getElementById('topleft').style.display = 'none';
    await downloadAsPdf();
    document.getElementById('topleft').style.display = 'block';
  }
  const downloadButton = document.getElementById('downloadable_resume');
  downloadButton.addEventListener('click', download);
});