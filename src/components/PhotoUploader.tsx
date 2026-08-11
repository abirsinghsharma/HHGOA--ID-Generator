import { useRef } from "react";
import type { ChangeEvent } from "react";
interface PhotoUploaderProps {
  onImageSelected: (file: File) => void;
}

const PhotoUploader = ({ onImageSelected }: PhotoUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    onImageSelected(file);
  };

  const handleClick = () => {
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

      <button className="upload-box" onClick={handleClick}>
        <div className="upload-icon">↑</div>

        <h2>Upload your photo</h2>

        <p>JPG • PNG • HEIC</p>

        <span>Tap to choose a photo</span>
      </button>
    </div>
  );
};

export default PhotoUploader;
