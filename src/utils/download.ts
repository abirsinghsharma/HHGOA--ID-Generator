export const downloadImage = (
  imageUrl: string,
  filename: string = "hh-goa-2026.png"
) => {
  const link = document.createElement("a");

  link.href = imageUrl;
  link.download = filename;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};