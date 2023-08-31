export default function () {
  function createLine({
    svg,
    color,
    startPointX = 0,
    startPointY = 0,
    endPointX = 200,
    endPointY = 200,
    strokeWidth = 10,
    slope = "",
    xMin = -6,
    xMax = 6,
    yMin = -6,
    yMax = 6,
    width = 500,
    height = 500,
  }) {
    const domain = xMax - xMin;
    const range = yMax - yMin;
    const pixelX = width / domain;
    const pixelY = height / range;

    const startPixelX = startPointX * pixelX + width / 2;
    const startPixelY = -startPointY * pixelY + height / 2;
    const endPixelX = endPointX * pixelX + width / 2;
    const endPixelY = -endPointY * pixelY + height / 2;
    const calcSlope = slope
      ? -slope
      : (endPixelY - startPixelY) / (endPixelX - startPixelX);
    const calcSPY = startPixelY - calcSlope * startPixelX;
    const calcEPY = startPixelY + calcSlope * (width - startPixelX);

    svg
      .append("line")
      .style("stroke", `${color}`)
      .style("stroke-width", `${strokeWidth}`)
      .attr("x1", `${0}`)
      .attr("y1", `${calcSPY}`)
      .attr("x2", `${width}`)
      .attr("y2", `${calcEPY}`);
  }
}
