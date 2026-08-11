export const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);
    image.onerror = reject;

    image.src = src;
  });
};

export const drawCoverImage = (
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number
) => {
  const imageRatio = image.width / image.height;
  const boxRatio = width / height;

  let sourceWidth = image.width;
  let sourceHeight = image.height;
  let sourceX = 0;
  let sourceY = 0;

  /*
   * The destination card is landscape.
   *
   * For portrait images, a normal center crop often cuts
   * off the person's head. We therefore bias the crop upward.
   */

  if (imageRatio > boxRatio) {
    // --------------------------------------------------
    // LANDSCAPE IMAGE
    // Crop horizontally.
    // --------------------------------------------------

    sourceWidth = image.height * boxRatio;

    sourceX = (image.width - sourceWidth) / 2;
  } else {
    // --------------------------------------------------
    // PORTRAIT / SQUARE IMAGE
    // Crop vertically.
    // --------------------------------------------------

    sourceHeight = image.width / boxRatio;

    /*
     * Instead of centering the crop vertically, move it
     * toward the top so faces and upper bodies remain visible.
     *
     * 0.15 means the crop is biased toward the top.
     */
    const availableCrop = image.height - sourceHeight;

    sourceY = availableCrop * 0.15;
  }

  ctx.drawImage(
    image,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    x,
    y,
    width,
    height
  );
};

export const roundRect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) => {
  ctx.beginPath();

  ctx.roundRect(
    x,
    y,
    width,
    height,
    radius
  );

  ctx.closePath();
};