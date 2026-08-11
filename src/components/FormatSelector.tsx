import type { Format } from "../types";

interface FormatSelectorProps {
  format: Format;
  onFormatChange: (format: Format) => void;
}

const FormatSelector = ({ format, onFormatChange }: FormatSelectorProps) => {
  return (
    <div className="format-selector">
      <button
        className={format === "pfp" ? "format-button active" : "format-button"}
        onClick={() => onFormatChange("pfp")}
      >
        PFP FRAME
      </button>

      <button
        className={
          format === "id-card" ? "format-button active" : "format-button"
        }
        onClick={() => onFormatChange("id-card")}
      >
        BUILDER ID
      </button>
    </div>
  );
};

export default FormatSelector;
