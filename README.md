# HH Goa 2026 — Frame & Builder ID Generator

A web-based identity generator built for Hacker House Goa 2026.

Users can upload their own photo and instantly create either an HH Goa 2026 profile-picture frame or a personalized Builder ID card.

## Live Demo

https://hhgoa-id-generator-ten.vercel.app/
## Features

- HH Goa 2026 PFP frame generator
- Personalized Builder ID generator
- Automatic photo cropping for portrait, landscape, and square images
- Face-friendly portrait cropping
- JPG, PNG, HEIC and HEIF image support
- Image size validation
- Download generated graphics directly
- Share generated graphics on X
- Responsive mobile-first interface
- HH Goa themed visual design
- No manual image cropping required

## How It Works

1. Upload a photo.
2. Select either:
   - PFP Frame
   - Builder ID
3. For a Builder ID, enter your name and role.
4. Generate the graphic.
5. Download or share it.

The generator automatically handles different photo orientations so users don't have to manually crop their photos before uploading.

## Tech Stack

- React
- TypeScript
- Vite
- HTML Canvas API
- CSS
- Vercel

## Project Structure

```text
src/
├── canvas/
│   ├── generatePfpFrame.ts
│   ├── generateIdCard.ts
│   └── imageUtils.ts
│
├── components/
│   ├── Header.tsx
│   ├── PhotoUploader.tsx
│   ├── FormatSelector.tsx
│   └── BuilderForm.tsx
│
├── data/
│   └── builderTitles.ts
│
├── utils/
│   ├── download.ts
│   └── share.ts
│
├── App.tsx
├── index.css
└── main.tsx