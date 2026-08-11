import { loadImage } from "./imageUtils";

interface IdCardData {
  name: string;
  role: string;
  title: string;
  file: File;
}

const COLORS = {
  darkGreen: "#005B3A",
  green: "#167A4B",
  yellow: "#FFD600",
  pink: "#FF2E7A",
  cream: "#F7F4E8",
  dark: "#003D29",
};

const drawSmartCoverImage = (
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

  if (imageRatio > boxRatio) {
    // Landscape image:
    // crop horizontally from the center.
    sourceWidth = image.height * boxRatio;
    sourceX = (image.width - sourceWidth) / 2;
  } else {
    // Portrait / square image:
    // crop vertically, but bias toward the upper part
    // so faces are much less likely to be cut off.
    sourceHeight = image.width / boxRatio;

    const maxSourceY = image.height - sourceHeight;

    // 15% from the top of the available crop range.
    sourceY = maxSourceY * 0.15;
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

const drawPalmTree = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  scale: number,
  flip = false
) => {
  ctx.save();

  ctx.translate(x, y);
  ctx.scale(flip ? -scale : scale, scale);

  // Trunk
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(-5, -70, -25, -170);

  ctx.lineWidth = 13;
  ctx.strokeStyle = COLORS.darkGreen;
  ctx.stroke();

  // Yellow highlight
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(-5, -70, -25, -170);

  ctx.lineWidth = 5;
  ctx.strokeStyle = COLORS.yellow;
  ctx.stroke();

  // Leaves
  const angles = [-65, -42, -20, 15, 40, 65];

  angles.forEach((angle, index) => {
    ctx.save();

    ctx.translate(-25, -170);
    ctx.rotate((angle * Math.PI) / 180);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(45, -30, 95, -5);
    ctx.quadraticCurveTo(45, 5, 0, 0);

    ctx.fillStyle =
      index % 2 === 0 ? COLORS.green : COLORS.darkGreen;

    ctx.fill();

    ctx.strokeStyle = COLORS.darkGreen;
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.restore();
  });

  ctx.restore();
};

const drawSun = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number
) => {
  ctx.save();

  ctx.fillStyle = COLORS.yellow;

  ctx.beginPath();
  ctx.arc(x, y, radius, Math.PI, 0);
  ctx.fill();

  ctx.strokeStyle = COLORS.yellow;
  ctx.lineWidth = 6;
  ctx.lineCap = "round";

  for (let i = 0; i < 7; i++) {
    const angle = Math.PI + (Math.PI * i) / 6;

    const startX =
      x + Math.cos(angle) * (radius + 20);

    const startY =
      y + Math.sin(angle) * (radius + 20);

    const endX =
      x + Math.cos(angle) * (radius + 50);

    const endY =
      y + Math.sin(angle) * (radius + 50);

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
  }

  ctx.restore();
};

const drawWaves = (
  ctx: CanvasRenderingContext2D,
  y: number,
  width: number
) => {
  ctx.save();

  ctx.strokeStyle = COLORS.cream;
  ctx.lineWidth = 5;
  ctx.lineCap = "round";

  for (let row = 0; row < 3; row++) {
    const waveY = y + row * 20;

    ctx.beginPath();

    for (let x = 0; x <= width; x += 30) {
      const wave = Math.sin(x * 0.04) * 7;

      if (x === 0) {
        ctx.moveTo(x, waveY + wave);
      } else {
        ctx.lineTo(x, waveY + wave);
      }
    }

    ctx.stroke();
  }

  ctx.restore();
};

const drawBeachHouse = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  scale: number
) => {
  ctx.save();

  ctx.translate(x, y);
  ctx.scale(scale, scale);

  // Roof
  ctx.fillStyle = COLORS.green;
  ctx.strokeStyle = COLORS.darkGreen;
  ctx.lineWidth = 4;

  ctx.beginPath();
  ctx.moveTo(-70, 0);
  ctx.lineTo(0, -50);
  ctx.lineTo(70, 0);
  ctx.closePath();

  ctx.fill();
  ctx.stroke();

  // Building
  ctx.fillStyle = COLORS.cream;

  ctx.beginPath();
  ctx.rect(-55, 0, 110, 75);

  ctx.fill();
  ctx.stroke();

  // Door
  ctx.fillStyle = COLORS.darkGreen;

  ctx.beginPath();
  ctx.rect(-14, 35, 28, 40);

  ctx.fill();

  // Pink sign
  ctx.fillStyle = COLORS.pink;

  ctx.beginPath();
  ctx.rect(-43, 10, 86, 20);

  ctx.fill();

  ctx.fillStyle = COLORS.cream;
  ctx.font = "bold 10px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.fillText("GOA", 0, 20);

  ctx.restore();
};

export const generateIdCard = async ({
  name,
  role,
  title,
  file,
}: IdCardData): Promise<Blob> => {
  const imageUrl = URL.createObjectURL(file);

  try {
    const image = await loadImage(imageUrl);

    // ==================================================
    // LOAD EXACT HH GOA HEADER
    // ==================================================

    const headerImage = await loadImage("/assets/hhgoa-header.png");

    const canvas = document.createElement("canvas");

    const WIDTH = 1080;
    const HEIGHT = 1350;

    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("Could not create canvas context.");
    }

    // ==================================================
    // MATCH BACKGROUND TO HEADER
    // ==================================================

    // Read the header's background colour so the rest
    // of the card blends with the exact HH Goa asset.
ctx.fillStyle = COLORS.darkGreen;
ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // ==================================================
    // SUBTLE BACKGROUND SHAPE
    // ==================================================

    ctx.fillStyle = COLORS.green;
    ctx.globalAlpha = 0.32;

    ctx.beginPath();

    ctx.arc(
      900,
      300,
      400,
      0,
      Math.PI * 2
    );

    ctx.fill();

    ctx.globalAlpha = 1;

    // ==================================================
    // EXACT HH GOA HEADER
    // ==================================================

    const headerX = 25;
    const headerY = 25;
    const headerWidth = 1030;

    const headerRatio =
      headerImage.height / headerImage.width;

    const headerHeight =
      headerWidth * headerRatio;

    ctx.drawImage(
      headerImage,
      headerX,
      headerY,
      headerWidth,
      headerHeight
    );

    // ==================================================
    // PHOTO AREA
    // ==================================================

    const photoX = 100;
    const photoY = 325;
    const photoWidth = 880;
    const photoHeight = 490;

    ctx.save();

    ctx.beginPath();

    ctx.roundRect(
      photoX,
      photoY,
      photoWidth,
      photoHeight,
      35
    );

    ctx.clip();

    drawSmartCoverImage(
    ctx,
    image,
    photoX,
    photoY,
    photoWidth,
    photoHeight
    );

    ctx.restore();

    // Photo border
    ctx.strokeStyle = COLORS.yellow;
    ctx.lineWidth = 15;

    ctx.beginPath();

    ctx.roundRect(
      photoX,
      photoY,
      photoWidth,
      photoHeight,
      35
    );

    ctx.stroke();

    // ==================================================
    // BUILDER LABEL
    // ==================================================

    ctx.fillStyle = COLORS.pink;

    ctx.beginPath();

    ctx.roundRect(
      100,
      845,
      245,
      62,
      16
    );

    ctx.fill();

    ctx.fillStyle = COLORS.cream;

    ctx.font = "800 27px Arial";
    ctx.textAlign = "center";

    ctx.fillText(
      "BUILDER",
      222,
      886
    );

    // ==================================================
    // NAME
    // ==================================================

    ctx.textAlign = "left";
    ctx.fillStyle = COLORS.cream;

    ctx.font = "800 58px Arial";

    const safeName = name
      .trim()
      .toUpperCase();

    ctx.fillText(
      safeName,
      100,
      965
    );

    // ==================================================
    // ROLE
    // ==================================================

    ctx.fillStyle = COLORS.yellow;

    ctx.font = "700 30px Arial";

    ctx.fillText(
      role
        .trim()
        .toUpperCase(),
      100,
      1015
    );

    // ==================================================
    // BUILDER TITLE
    // ==================================================

    ctx.fillStyle = COLORS.green;

    ctx.beginPath();

    ctx.roundRect(
      100,
      1045,
      880,
      105,
      18
    );

    ctx.fill();

    ctx.fillStyle = COLORS.yellow;

    ctx.font = "800 24px Arial";

    ctx.fillText(
      "YOUR BUILDER TITLE",
      130,
      1085
    );

    ctx.fillStyle = COLORS.cream;

    ctx.font = "800 34px Arial";

    ctx.fillText(
      title,
      130,
      1130
    );

    // ==================================================
    // GOA ILLUSTRATION AREA
    // ==================================================

    // Beach
    ctx.fillStyle = COLORS.cream;

    ctx.beginPath();

    ctx.moveTo(
      0,
      1165
    );

    for (
      let x = 0;
      x <= WIDTH;
      x += 30
    ) {
      const wave =
        Math.sin(x * 0.025) * 16;

      ctx.lineTo(
        x,
        1165 + wave
      );
    }

    ctx.lineTo(
      WIDTH,
      HEIGHT
    );

    ctx.lineTo(
      0,
      HEIGHT
    );

    ctx.closePath();

    ctx.fill();

    // Ocean
    ctx.fillStyle = COLORS.green;

    ctx.beginPath();

    ctx.moveTo(
      0,
      1175
    );

    for (
      let x = 0;
      x <= WIDTH;
      x += 30
    ) {
      const wave =
        Math.sin(x * 0.025) * 13;

      ctx.lineTo(
        x,
        1175 + wave
      );
    }

    ctx.lineTo(
      WIDTH,
      1260
    );

    ctx.lineTo(
      0,
      1260
    );

    ctx.closePath();

    ctx.fill();

    // Waves
    drawWaves(
      ctx,
      1190,
      WIDTH
    );

    // Sun
    drawSun(
      ctx,
      540,
      1240,
      70
    );

    // Palms
    drawPalmTree(
      ctx,
      60,
      1325,
      0.65
    );

    drawPalmTree(
      ctx,
      1020,
      1325,
      0.65,
      true
    );

    // Beach house
    drawBeachHouse(
      ctx,
      850,
      1205,
      0.7
    );

    // ==================================================
    // FOOTER
    // ==================================================

    ctx.fillStyle = COLORS.darkGreen;

    ctx.font = "800 23px Arial";

    ctx.textAlign = "left";

    ctx.fillText(
      "GOA • INDIA",
      90,
      1320
    );

    ctx.textAlign = "right";

    ctx.fillStyle = COLORS.pink;

    ctx.font = "800 25px Arial";

    ctx.fillText(
      "#FrameInGoa",
      990,
      1320
    );

    // ==================================================
    // EXPORT
    // ==================================================

    return new Promise(
      (resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(
                new Error(
                  "Could not generate ID card."
                )
              );
            }
          },
          "image/png",
          1
        );
      }
    );
  } finally {
    URL.revokeObjectURL(imageUrl);
  }
};