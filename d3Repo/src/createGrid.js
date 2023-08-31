export default function () {
  function createGrid({
    d3,
    grid,
    svg,
    marginBottom,
    marginLeft,
    width = 500,
    height = 500,
    xMin = -6,
    xMax = 6,
    yMin = -6,
    yMax = 6,
  }) {
    const domain = xMax - xMin;
    const range = yMax - yMin;
    const pixelX = width / domain;
    const pixelY = height / range;

    const x = d3.scaleLinear([xMin, xMax], [0, width]);
    const y = d3.scaleLinear([yMin, yMax], [height, 0]);

    if (grid.checked) {
      for (let i = 0, L = range + 1; i <= L; i++) {
        const gridx = svg
          .append("g")
          .attr("class", "grid-lines")
          .attr("transform", `translate(0,${height - i * pixelY})`)
          .call(d3.axisBottom(x).ticks(""));
      }
      for (let i = 0, L = domain + 1; i <= L; i++) {
        const gridy = svg
          .append("g")
          .attr("class", "grid-lines")
          .attr("transform", `translate(${i * pixelX},0)`)
          .call(d3.axisLeft(y).ticks(""));
      }
    }
    const gx = svg
      .append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .attr("class", "axis")
      .style("font", "1em sans-serif")
      .call(d3.axisBottom(x));

    const gy = svg
      .append("g")
      .attr("transform", `translate(${width - marginLeft},0)`)
      .attr("class", "axis")
      .style("font", "1em sans-serif")
      .call(d3.axisLeft(y));
  }
}
