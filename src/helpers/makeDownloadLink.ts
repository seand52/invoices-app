export const makeDownloadLink = source => {
  const downloadLink = document.createElement('a');
  const fileName = 'file.pdf';

  downloadLink.href = source;
  downloadLink.download = fileName;
  downloadLink.click();
};
