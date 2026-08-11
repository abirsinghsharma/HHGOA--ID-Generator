import { loadImage } from "./imageUtils";

const WIDTH = 1080;
const HEIGHT = 1080;

const COLORS = {
  green: "#00633E",
  deepGreen: "#00512F",
  yellow: "#FFD600",
  pink: "#FF2E7A",
  cream: "#F7F4E8",
  dark: "#123B2B",
  palm: "#167A4B",
};

/* =====================================================
   COVER IMAGE HELPER
   ===================================================== */

function drawCoverImage(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number
) {
  const imageRatio =
    image.naturalWidth / image.naturalHeight;

  const boxRatio = width / height;

  let sourceWidth = image.naturalWidth;
  let sourceHeight = image.naturalHeight;
  let sourceX = 0;
  let sourceY = 0;

  if (imageRatio > boxRatio) {
    sourceWidth =
      image.naturalHeight * boxRatio;

    sourceX =
      (image.naturalWidth - sourceWidth) / 2;
  } else {
    sourceHeight =
      image.naturalWidth / boxRatio;

    sourceY =
      (image.naturalHeight - sourceHeight) / 2;
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
}

/* =====================================================
   PALM TREE
   ===================================================== */

function drawPalmTree(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  scale: number,
  flip = false
) {
  ctx.save();

  ctx.translate(x, y);
  ctx.scale(
    flip ? -scale : scale,
    scale
  );

  /* trunk */

  ctx.beginPath();

  ctx.moveTo(0, 0);

  ctx.quadraticCurveTo(
    -8,
    -80,
    -28,
    -205
  );

  ctx.strokeStyle = COLORS.dark;
  ctx.lineWidth = 12;
  ctx.lineCap = "round";

  ctx.stroke();

  /* yellow highlight */

  ctx.beginPath();

  ctx.moveTo(-1, 0);

  ctx.quadraticCurveTo(
    -8,
    -80,
    -28,
    -205
  );

  ctx.strokeStyle = COLORS.yellow;
  ctx.lineWidth = 4;

  ctx.stroke();

  /* leaves */

  const leaves = [
    -75,
    -50,
    -25,
    5,
    35,
    60,
    82,
  ];

  leaves.forEach(
    (angle, index) => {
      ctx.save();

      ctx.translate(
        -28,
        -205
      );

      ctx.rotate(
        (angle * Math.PI) / 180
      );

      ctx.beginPath();

      ctx.moveTo(0, 0);

      ctx.quadraticCurveTo(
        45,
        -28,
        105,
        -5
      );

      ctx.quadraticCurveTo(
        50,
        8,
        0,
        0
      );

      ctx.fillStyle =
        index % 2 === 0
          ? COLORS.palm
          : COLORS.green;

      ctx.strokeStyle =
        COLORS.dark;

      ctx.lineWidth = 3;

      ctx.fill();
      ctx.stroke();

      ctx.restore();
    }
  );

  ctx.restore();
}

/* =====================================================
   SUN
   ===================================================== */

function drawSun(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number
) {
  ctx.save();

  /* rays */

  ctx.strokeStyle =
    COLORS.yellow;

  ctx.lineWidth = 5;
  ctx.lineCap = "round";

  const rays = [
    -90,
    -65,
    -40,
    -15,
    15,
    40,
    65,
    90,
  ];

  rays.forEach(
    (angle) => {
      const radians =
        (angle * Math.PI) / 180;

      const inner =
        radius + 20;

      const outer =
        radius + 48;

      ctx.beginPath();

      ctx.moveTo(
        x +
          Math.cos(radians) *
            inner,
        y +
          Math.sin(radians) *
            inner
      );

      ctx.lineTo(
        x +
          Math.cos(radians) *
            outer,
        y +
          Math.sin(radians) *
            outer
      );

      ctx.stroke();
    }
  );

  /* sun */

  ctx.fillStyle =
    COLORS.yellow;

  ctx.beginPath();

  ctx.arc(
    x,
    y,
    radius,
    Math.PI,
    0
  );

  ctx.fill();

  /* reflection */

  ctx.beginPath();

  ctx.ellipse(
    x,
    y + radius + 15,
    90,
    8,
    0,
    0,
    Math.PI * 2
  );

  ctx.fill();

  ctx.beginPath();

  ctx.ellipse(
    x,
    y + radius + 32,
    60,
    6,
    0,
    0,
    Math.PI * 2
  );

  ctx.fill();

  ctx.beginPath();

  ctx.ellipse(
    x,
    y + radius + 47,
    32,
    4,
    0,
    0,
    Math.PI * 2
  );

  ctx.fill();

  ctx.restore();
}

/* =====================================================
   WAVES
   ===================================================== */

function drawWave(
  ctx: CanvasRenderingContext2D,
  y: number,
  amplitude: number,
  frequency: number
) {
  ctx.beginPath();

  for (
    let x = 0;
    x <= WIDTH;
    x += 10
  ) {
    const wave =
      Math.sin(
        x * frequency
      ) * amplitude;

    if (x === 0) {
      ctx.moveTo(
        x,
        y + wave
      );
    } else {
      ctx.lineTo(
        x,
        y + wave
      );
    }
  }

  ctx.strokeStyle =
    COLORS.cream;

  ctx.lineWidth = 4;
  ctx.lineCap = "round";

  ctx.stroke();
}

/* =====================================================
   BEACH HOUSE
   ===================================================== */

function drawBeachHouse(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  scale: number
) {
  ctx.save();

  ctx.translate(x, y);
  ctx.scale(scale, scale);

  /* building */

  ctx.fillStyle =
    COLORS.cream;

  ctx.strokeStyle =
    COLORS.dark;

  ctx.lineWidth = 4;

  ctx.beginPath();

  ctx.rect(
    -55,
    0,
    110,
    82
  );

  ctx.fill();
  ctx.stroke();

  /* roof */

  ctx.fillStyle =
    COLORS.palm;

  ctx.beginPath();

  ctx.moveTo(
    -72,
    0
  );

  ctx.lineTo(
    0,
    -48
  );

  ctx.lineTo(
    72,
    0
  );

  ctx.closePath();

  ctx.fill();
  ctx.stroke();

  /* pink sign */

  ctx.fillStyle =
    COLORS.pink;

  ctx.fillRect(
    -43,
    12,
    86,
    22
  );

  ctx.fillStyle =
    COLORS.cream;

  ctx.font =
    "bold 11px Arial";

  ctx.textAlign =
    "center";

  ctx.textBaseline =
    "middle";

  ctx.fillText(
    "GOA BEACH",
    0,
    23
  );

  /* door */

  ctx.fillStyle =
    COLORS.green;

  ctx.fillRect(
    -14,
    42,
    28,
    40
  );

  /* counter */

  ctx.fillStyle =
    COLORS.pink;

  ctx.fillRect(
    -50,
    36,
    100,
    7
  );

  ctx.restore();
}

/* =====================================================
   MAIN PFP GENERATOR
   ===================================================== */

export const generatePfpFrame = async (
  file: File
): Promise<Blob> => {
  const photoUrl =
    URL.createObjectURL(file);

  try {
    /* Load user photo */

    const photo =
      await loadImage(photoUrl);

    /* Load exact HH Goa header */

    const header =
      await loadImage(
        "/assets/hhgoa-header.png"
      );

    const canvas =
      document.createElement(
        "canvas"
      );

    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    const ctx =
      canvas.getContext("2d");

    if (!ctx) {
      throw new Error(
        "Could not create canvas context."
      );
    }

    /* =================================================
       BACKGROUND
       ================================================= */

    ctx.fillStyle =
      COLORS.green;

    ctx.fillRect(
      0,
      0,
      WIDTH,
      HEIGHT
    );

    /* subtle decorative circle */

    ctx.fillStyle =
      "rgba(22, 122, 75, 0.55)";

    ctx.beginPath();

    ctx.arc(
      40,
      80,
      250,
      0,
      Math.PI * 2
    );

    ctx.fill();

    /* =================================================
       EXACT HH GOA HEADER
       ================================================= */

    /*
      Keep the original aspect ratio of the
      supplied HH Goa header asset.
    */

    const headerMargin = 45;

    const headerWidth =
      WIDTH -
      headerMargin * 2;

    const headerHeight =
      headerWidth *
      (header.naturalHeight /
        header.naturalWidth);

    ctx.drawImage(
      header,
      headerMargin,
      38,
      headerWidth,
      headerHeight
    );

    /* =================================================
       PHOTO AREA
       ================================================= */

    const photoSize = 570;

    const photoX =
      (WIDTH - photoSize) / 2;

    const photoY = 300;

    /* outer yellow circle */

    ctx.fillStyle =
      COLORS.yellow;

    ctx.beginPath();

    ctx.arc(
      WIDTH / 2,
      photoY +
        photoSize / 2,
      photoSize / 2 + 10,
      0,
      Math.PI * 2
    );

    ctx.fill();

    /* photo clipping */

    ctx.save();

    ctx.beginPath();

    ctx.arc(
      WIDTH / 2,
      photoY +
        photoSize / 2,
      photoSize / 2,
      0,
      Math.PI * 2
    );

    ctx.clip();

    drawCoverImage(
      ctx,
      photo,
      photoX,
      photoY,
      photoSize,
      photoSize
    );

    ctx.restore();

    /* =================================================
       SUN
       ================================================= */

    drawSun(
      ctx,
      WIDTH / 2,
      865,
      62
    );

    /* =================================================
       OCEAN BAND
       ================================================= */

    ctx.fillStyle =
      COLORS.deepGreen;

    ctx.fillRect(
      0,
      835,
      WIDTH,
      115
    );

    drawWave(
      ctx,
      850,
      7,
      0.035
    );

    drawWave(
      ctx,
      875,
      6,
      0.04
    );

    drawWave(
      ctx,
      900,
      7,
      0.035
    );

    /* =================================================
       BEACH
       ================================================= */

    ctx.fillStyle =
      COLORS.cream;

    ctx.beginPath();

    ctx.moveTo(
      0,
      925
    );

    ctx.quadraticCurveTo(
      250,
      900,
      520,
      925
    );

    ctx.quadraticCurveTo(
      800,
      950,
      WIDTH,
      920
    );

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

    /* =================================================
       TROPICAL DETAILS
       ================================================= */

    drawPalmTree(
      ctx,
      55,
      1080,
      0.55
    );

    drawPalmTree(
      ctx,
      1025,
      1080,
      0.55,
      true
    );

    drawBeachHouse(
      ctx,
      820,
      920,
      0.65
    );

    /* =================================================
       FOOTER
       ================================================= */

    ctx.textBaseline =
      "alphabetic";

    ctx.textAlign =
      "left";

    ctx.fillStyle =
      COLORS.green;

    ctx.font =
      "800 18px Arial";

    ctx.fillText(
      "HH GOA 2026",
      55,
      1035
    );

    ctx.textAlign =
      "right";

    ctx.fillStyle =
      COLORS.pink;

    ctx.font =
      "800 19px Arial";

    ctx.fillText(
      "#FrameInGoa",
      1025,
      1035
    );

    /* =================================================
       EXPORT
       ================================================= */

    return new Promise(
      (resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(
                new Error(
                  "Could not generate PFP frame."
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
    URL.revokeObjectURL(
      photoUrl
    );
  }
};