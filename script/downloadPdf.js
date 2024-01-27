// Function to download the current web page as a PDF
async function downloadAsPdf() {
  const options = {
    filename: 'CV_Fullstack_Melnicov_Maxim.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'pt', format: 'letter', orientation: 'portrait' }
  };

  // Get the page content
  const content = document.documentElement.cloneNode(true);
  content.querySelectorAll('img').forEach(image => image.crossorigin = "anonymous"/*src = ''*/);//for local file testing
  // content.querySelectorAll('li').forEach(litem => litem.innerHTML = '- ' + litem.innerHTML);//for local file testing
  content.querySelector('#topleft').style = "visibility:hidden";

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
