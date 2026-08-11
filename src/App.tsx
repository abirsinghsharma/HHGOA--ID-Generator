import { useState } from "react";
import Header from "./components/Header";
import PhotoUploader from "./components/PhotoUploader";
import FormatSelector from "./components/FormatSelector";
import BuilderForm from "./components/BuilderForm";
import { generatePfpFrame } from "./canvas/generatePfpFrame";
import { generateIdCard } from "./canvas/generateIdCard";
import { downloadImage } from "./utils/download";
import { shareOnX } from "./utils/share";
import { builderTitles } from "./data/builderTitles";
import type { Format } from "./types";

function App() {
  const [format, setFormat] = useState<Format>("pfp");

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const [isGenerating, setIsGenerating] = useState(false);

  const handleImageSelected = async (file: File) => {
    setImageFile(file);
    setGeneratedImage(null);

    if (format === "pfp") {
      setIsGenerating(true);

      try {
        const blob = await generatePfpFrame(file);
        const imageUrl = URL.createObjectURL(blob);

        setGeneratedImage(imageUrl);
      } catch (error) {
        console.error("Failed to generate PFP:", error);
      } finally {
        setIsGenerating(false);
      }
    }
  };

  const handleFormatChange = (newFormat: Format) => {
    setFormat(newFormat);
    setGeneratedImage(null);

    if (newFormat === "pfp" && imageFile) {
      setIsGenerating(true);

      generatePfpFrame(imageFile)
        .then((blob) => {
          const imageUrl = URL.createObjectURL(blob);
          setGeneratedImage(imageUrl);
        })
        .catch((error) => {
          console.error("Failed to generate PFP:", error);
        })
        .finally(() => {
          setIsGenerating(false);
        });
    }
  };

  const handleGenerateIdCard = async () => {
    if (!imageFile || !name.trim() || !role.trim()) {
      return;
    }

    setIsGenerating(true);
    setGeneratedImage(null);

    const randomTitle =
      builderTitles[Math.floor(Math.random() * builderTitles.length)];

    try {
      const blob = await generateIdCard({
        name,
        role,
        title: randomTitle,
        file: imageFile,
      });

      const imageUrl = URL.createObjectURL(blob);

      setGeneratedImage(imageUrl);
    } catch (error) {
      console.error("Failed to generate ID card:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;

    const filename =
      format === "pfp" ? "hh-goa-2026-frame.png" : "hh-goa-2026-builder-id.png";

    downloadImage(generatedImage, filename);
  };

  return (
    <main className="app">
      <Header />

      <section className="hero-section">
        <p className="eyebrow">HACKER HOUSE GOA • 2026</p>

        <h1>
          FRAME
          <br />
          <span>& ID CARD</span>
        </h1>

        <p className="hero-description">
          Create your own HH Goa 2026 builder identity.
        </p>
      </section>

      <section className="generator">
        <PhotoUploader onImageSelected={handleImageSelected} />

        {imageFile && (
          <div className="selected-file">
            <span>✓ Photo selected</span>

            <span>{imageFile.name}</span>
          </div>
        )}

        <FormatSelector format={format} onFormatChange={handleFormatChange} />

        {format === "id-card" && (
          <BuilderForm
            name={name}
            role={role}
            onNameChange={setName}
            onRoleChange={setRole}
            onGenerate={handleGenerateIdCard}
          />
        )}

        <div className="preview-placeholder">
          <div className="preview-label">GENERATED PREVIEW</div>

          <div className="preview-content">
            {isGenerating ? (
              <div className="generation-state">
                <div className="loader" />

                <p>Creating your Goa graphic...</p>
              </div>
            ) : generatedImage ? (
              <div className="generated-result">
                <img
                  className="generated-image"
                  src={generatedImage}
                  alt={
                    format === "pfp"
                      ? "Generated HH Goa 2026 frame"
                      : "Generated HH Goa 2026 builder ID"
                  }
                />

                <div className="action-buttons">
                  <button className="download-button" onClick={handleDownload}>
                    ↓ DOWNLOAD IMAGE
                  </button>

                  <button className="share-button" onClick={shareOnX}>
                    𝕏 SHARE ON X
                  </button>
                </div>
              </div>
            ) : imageFile ? (
              <div className="preview-photo">
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="Uploaded preview"
                />
              </div>
            ) : (
              <p>Upload a photo to begin.</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
