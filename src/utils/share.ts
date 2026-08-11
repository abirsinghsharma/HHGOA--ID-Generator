export const shareOnX = () => {
  const text = encodeURIComponent(
    "Just created my HH Goa 2026 builder frame! 🌴☀️\n\n#FrameInGoa #HHGoa2026"
  );

  const url = `https://twitter.com/intent/tweet?text=${text}`;

  window.open(url, "_blank", "noopener,noreferrer");
};