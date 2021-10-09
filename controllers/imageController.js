const { createCanvas, loadImage } = require("canvas");
const { MAX_IMAGE_WIDTH, MAX_IMAGE_HEIGHT } = require("../config.json");

exports.image = (req, res) => {
  let [width, height, format, bgColor, textColor] = Object.values(req.params);
  width = parseInt(width);
  height = parseInt(height);

  if (typeof bgColor === "undefined") {
    bgColor = "#333333";
  }
  if (typeof textColor === "undefined") {
    textColor = "#ffffff";
  }

  if (isHexColor(bgColor)) {
    bgColor = `#${bgColor}`;
  } else {
    bgColor = "#333333";
  }
  if (isHexColor(textColor)) {
    textColor = `#${textColor}`;
  } else {
    textColor = "#ffffff";
  }

  width = width > MAX_IMAGE_WIDTH ? MAX_IMAGE_WIDTH : width;
  height = height > MAX_IMAGE_HEIGHT ? MAX_IMAGE_HEIGHT : height;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // background color
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);

  // text
  let fontSize = width / 8;

  ctx.fillStyle = textColor;
  ctx.font = `bold ${fontSize}px Arial`;

  let text = `${width} x ${height}`;
  let textWidth = ctx.measureText(text).width;

  ctx.fillText(text, width / 2 - textWidth / 2, height / 2 + fontSize / 2);

  res.setHeader("Content-Type", `image/${format}`);
  if (format === "png") {
    canvas.pngStream().pipe(res);
  } else if (format === "jpeg" || format === "jpg") {
    canvas.jpegStream().pipe(res);
  }
};

function isHexColor(hex) {
  return (
    typeof hex === "string" && hex.length === 6 && !isNaN(Number(`0x${hex}`))
  );
}
