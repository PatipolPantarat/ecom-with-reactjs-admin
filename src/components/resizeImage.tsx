export const resizeImage = (
  selectedFile: Blob,
  maxWidth: number,
  maxHeight: number,
  callback: (arg0: Blob | null) => void
) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = document.createElement("img");
    img.onload = () => {
      // Create a canvas and context
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Calculate the new image dimensions
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      // Set canvas dimensions
      canvas.width = width;
      canvas.height = height;

      // Draw the resized image
      ctx?.drawImage(img, 0, 0, width, height);

      // Convert the canvas to a Blob
      canvas.toBlob((blob) => callback(blob), "image/jpeg", 0.7); // Adjust quality as needed
    };
    img.src = e.target?.result as string;
  };
  reader.readAsDataURL(selectedFile);
};
