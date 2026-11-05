export function drawBrandMark(context, x, y, radius, color) {
  context.save();
  context.strokeStyle = color;
  context.lineWidth = radius * 0.09;
  context.lineCap = "butt";
  context.beginPath();
  for (let ray = 0; ray < 4; ray++) {
    const angle = (ray * Math.PI) / 4;
    const dx = Math.cos(angle) * radius;
    const dy = Math.sin(angle) * radius;
    context.moveTo(x - dx, y - dy);
    context.lineTo(x + dx, y + dy);
  }
  context.stroke();
  context.restore();
}
