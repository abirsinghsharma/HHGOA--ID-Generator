import { useRef, useState } from "react";
import type { ChangeEvent } from "react";

interface PhotoUploaderProps {
  onImageSelected: (file: File) => void;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

const PhotoUploader = ({ onImageSelected }: PhotoUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");

    // Validate file type
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/heic",
      "image/heif",
    ];

    const isValidType =
      allowedTypes.includes(file.type) ||
      /\.(jpg|jpeg|png|heic|heif)$/i.test(file.name);

    if (!isValidType) {
      setError("Please choose a JPG, PNG, HEIC, or HEIF image.");

      // Allow selecting the same file again
      event.target.value = "";
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setError("This image is too large. Please choose a photo under 10 MB.");

      event.target.value = "";
      return;
    }

    onImageSelected(file);

    // Reset the input so the same file can be selected again later
    event.target.value = "";
  };

  const handleClick = () => {
    setError("");
    inputRef.current?.click();
  };

  return (
    <div className="upload-section">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/heic,image/heif"
        onChange={handleFileChange}
        hidden
      />

      <button type="button" className="upload-box" onClick={handleClick}>
        <div className="upload-icon">↑</div>

        <h2>Upload your photo</h2>

        <p>JPG • PNG • HEIC</p>

        <span>Tap to choose a photo</span>
      </button>

      {error && (
        <div className="upload-error" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

export default PhotoUploader;
