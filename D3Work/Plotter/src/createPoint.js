export default function () {
  function createPoint({
    svg,
    xCoord,
    yCoord,
    pointSize,
    color,
    marginBottom,
    marginLeft,
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
    const cx = xCoord * pixelX + marginBottom;
    const cy = -yCoord * pixelY + marginLeft;
    svg
      .append("circle")
      .attr("cx", cx)
      .attr("cy", cy)
      .attr("r", pointSize)
      .style("fill", color);
  }
}
